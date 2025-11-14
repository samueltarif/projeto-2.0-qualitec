import { defineEventHandler, readBody } from 'h3';
import mysql from 'mysql2/promise';
import { $fetch } from 'ofetch';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const { cnpj } = body;

  if (!cnpj) {
    return { success: false, message: 'CNPJ não fornecido.' };
  }

  // Limpa o CNPJ
  const cleanCnpj = cnpj.replace(/\D/g, '');

  try {
    // Tenta usar Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      // Busca no Supabase (com ou sem formatação)
      const { data, error } = await supabase
        .from('empresas')
        .select('razao_social')
        .or(`cnpj.eq.${cleanCnpj},cnpj.eq.${cnpj}`)
        .single();

      if (!error && data) {
        return { success: true, razao_social: data.razao_social };
      }
    }

    // Se Supabase não estiver configurado ou não encontrou, tenta MySQL
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      try {
        // Compara o CNPJ ignorando máscara no banco e recebendo dígitos ou mascarado
        const [rows] = await connection.execute(
          "SELECT razao_social FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
          [cleanCnpj]
        );

        if (Array.isArray(rows) && rows.length > 0) {
          const company = rows[0] as { razao_social: string };
          return { success: true, razao_social: company.razao_social };
        }
      } finally {
        await connection.end();
      }
    }

    // Fallback: consulta APIs externas (BrasilAPI e Receitaws) para obter dados pelo CNPJ
    // 1) BrasilAPI com headers amigáveis
    try {
      const external = await $fetch<{ razao_social?: string; nome_fantasia?: string }>(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
        { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0 (TraeAI)' } }
      );
      if (external?.razao_social) {
        return { success: true, razao_social: external.razao_social };
      }
      if (external?.nome_fantasia) {
        return { success: true, razao_social: external.nome_fantasia };
      }
    } catch (e: any) {
      // continua para próximo provedor
    }

    // 2) Receitaws como segundo provedor
    try {
      const r = await $fetch<{ nome?: string; fantasia?: string }>(
        `https://www.receitaws.com.br/v1/cnpj/${cleanCnpj}`,
        { headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0 (TraeAI)' } }
      );
      if (r?.nome) {
        return { success: true, razao_social: r.nome };
      }
      if (r?.fantasia) {
        return { success: true, razao_social: r.fantasia };
      }
    } catch (e: any) {
      // Se também falhar, reporta mensagem genérica
    }

    return { success: false, message: 'Empresa não encontrada.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});