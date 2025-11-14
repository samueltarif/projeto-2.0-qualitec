import { defineEventHandler, readBody } from 'h3';
import mysql from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

// Rate limiting simples em memória (para produção, use Redis/Memcached)
const RATE_WINDOW_MS = 60_000; // 1 minuto
const RATE_MAX_ATTEMPTS = 10; // tentativas por janela
const RATE_BLOCK_MS = 5 * 60_000; // 5 minutos de bloqueio quando excede
const attemptsByIp = new Map<string, { count: number; resetAt: number; blockedUntil?: number }>();

function getClientIp(event: any): string {
  const hdr = String(event.node.req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return hdr || event.node.req.socket?.remoteAddress || 'unknown';
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function normalizeDigits(value: string): string { return String(value || '').replace(/\D/g, ''); }

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const method = event.node.req.method || 'GET';
  const ip = getClientIp(event);

  // 0) Permitir apenas POST e JSON
  if (method !== 'POST') {
    return { success: false, message: 'Método não permitido' };
  }

  // 0.1) Rate limiting por IP
  const now = Date.now();
  const ipState = attemptsByIp.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (ipState.blockedUntil && ipState.blockedUntil > now) {
    return { success: false, message: 'Muitas tentativas. Tente novamente mais tarde.' };
  }
  if (now > ipState.resetAt) {
    ipState.count = 0; ipState.resetAt = now + RATE_WINDOW_MS; ipState.blockedUntil = undefined;
  }
  ipState.count += 1;
  attemptsByIp.set(ip, ipState);
  if (ipState.count > RATE_MAX_ATTEMPTS) {
    ipState.blockedUntil = now + RATE_BLOCK_MS;
    attemptsByIp.set(ip, ipState);
    return { success: false, message: 'Muitas tentativas. Tente novamente mais tarde.' };
  }

  // 1) Validação de entrada
  const rawEmail = String(body?.email || '').trim();
  const loginEmail = rawEmail.toUpperCase();
  const digits = normalizeDigits(body?.cnpj);

  if (!isValidEmail(rawEmail)) {
    await new Promise(r => setTimeout(r, 400)); // pequena demora para mitigar brute force
    return { success: false, message: 'Credenciais inválidas' };
  }
  if (digits.length !== 14) {
    await new Promise(r => setTimeout(r, 400));
    return { success: false, message: 'Credenciais inválidas' };
  }

  // 2) Backends possíveis: Supabase Postgres (preferencial) ou MySQL
  const supaUrl = (config as any)?.supabaseUrl as string | undefined;
  const supaKey = (config as any)?.supabaseSecretKey as string | undefined;
  if (supaUrl && supaKey) {
    const supabase = createClient(supaUrl, supaKey);
    try {
      // Busca empresa por CNPJ (normalizado ou com formatação)
      const { data: companies } = await supabase
        .from('empresas')
        .select('id, cnpj')
        .or(`cnpj.eq.${digits},cnpj.eq.${body.cnpj}`)
        .limit(10000);
      
      // Se não encontrar com OR, tenta buscar todos e filtrar localmente
      let match = (Array.isArray(companies) ? companies : []).find((c: any) => normalizeDigits(String(c.cnpj || '')) === digits);
      
      if (!match && Array.isArray(companies)) {
        // Tenta encontrar com CNPJ formatado
        match = companies.find((c: any) => String(c.cnpj || '').trim() === String(body.cnpj || '').trim());
      }
      
      if (!match) {
        await new Promise(r => setTimeout(r, 400));
        return { success: false, message: 'Empresa não encontrada' };
      }
      const empresaId = Number(match.id);
      const { data: users } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', loginEmail)
        .eq('empresa_id', empresaId)
        .limit(1);
      if (Array.isArray(users) && users.length > 0) {
        return { success: true, user: users[0] };
      }
      await new Promise(r => setTimeout(r, 400));
      return { success: false, message: 'Credenciais inválidas' };
    } catch (_) {
      await new Promise(r => setTimeout(r, 400));
      return { success: false, message: 'Erro ao validar credenciais' };
    }
  }

  if (!config.dbHost || !config.dbUser || !config.dbPassword || !config.dbDatabase) {
    return { success: false, message: 'Backend de dados não configurado' };
  }

  const connection = await mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
  });

  try {
    // 2) Encontrar a empresa pelo CNPJ (comparando por dígitos, prevenindo SQLi com parâmetros)
      const [companyRows] = await connection.execute(
        "SELECT id, email FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
        [digits]
      );

      if (!Array.isArray(companyRows) || companyRows.length === 0) {
        await new Promise(r => setTimeout(r, 400));
        return { success: false, message: 'Credenciais inválidas' };
      }

      const empresaId = companyRows[0].id;

      // 3) Encontrar o usuário pelo email e empresa_id
      const [userRows] = await connection.execute('SELECT * FROM usuarios WHERE email = ? AND empresa_id = ?', [loginEmail, empresaId]);

      if (Array.isArray(userRows) && userRows.length > 0) {
        return { success: true, user: userRows[0] };
      }

      // 3.1 Removido fallback de login por email da empresa para evitar criação
      // de usuários novos sem registro prévio na tabela `usuarios`.
      // Caso não exista um usuário com (email, empresa_id), o login deve falhar.

      await new Promise(r => setTimeout(r, 400));
      return { success: false, message: 'Credenciais inválidas' };
  } finally {
    await connection.end();
  }
});
