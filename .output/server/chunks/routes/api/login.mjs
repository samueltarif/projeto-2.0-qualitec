import { c as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../_/nitro.mjs';
import mysql from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const RATE_WINDOW_MS = 6e4;
const RATE_MAX_ATTEMPTS = 10;
const RATE_BLOCK_MS = 5 * 6e4;
const attemptsByIp = /* @__PURE__ */ new Map();
function getClientIp(event) {
  var _a;
  const hdr = String(event.node.req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return hdr || ((_a = event.node.req.socket) == null ? void 0 : _a.remoteAddress) || "unknown";
}
function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}
const login = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const method = event.node.req.method || "GET";
  const ip = getClientIp(event);
  if (method !== "POST") {
    return { success: false, message: "M\xE9todo n\xE3o permitido" };
  }
  const now = Date.now();
  const ipState = attemptsByIp.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (ipState.blockedUntil && ipState.blockedUntil > now) {
    return { success: false, message: "Muitas tentativas. Tente novamente mais tarde." };
  }
  if (now > ipState.resetAt) {
    ipState.count = 0;
    ipState.resetAt = now + RATE_WINDOW_MS;
    ipState.blockedUntil = void 0;
  }
  ipState.count += 1;
  attemptsByIp.set(ip, ipState);
  if (ipState.count > RATE_MAX_ATTEMPTS) {
    ipState.blockedUntil = now + RATE_BLOCK_MS;
    attemptsByIp.set(ip, ipState);
    return { success: false, message: "Muitas tentativas. Tente novamente mais tarde." };
  }
  const rawEmail = String((body == null ? void 0 : body.email) || "").trim();
  const loginEmail = rawEmail.toUpperCase();
  const digits = normalizeDigits(body == null ? void 0 : body.cnpj);
  if (!isValidEmail(rawEmail)) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  }
  if (digits.length !== 14) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  }
  const supaUrl = config == null ? void 0 : config.supabaseUrl;
  const supaKey = config == null ? void 0 : config.supabaseSecretKey;
  if (supaUrl && supaKey) {
    const supabase = createClient(supaUrl, supaKey);
    try {
      const { data: companies } = await supabase.from("empresas").select("id, cnpj").or(`cnpj.eq.${digits},cnpj.eq.${body.cnpj}`).limit(1e4);
      let match = (Array.isArray(companies) ? companies : []).find((c) => normalizeDigits(String(c.cnpj || "")) === digits);
      if (!match && Array.isArray(companies)) {
        match = companies.find((c) => String(c.cnpj || "").trim() === String(body.cnpj || "").trim());
      }
      if (!match) {
        await new Promise((r) => setTimeout(r, 400));
        return { success: false, message: "Empresa n\xE3o encontrada" };
      }
      const empresaId = Number(match.id);
      const { data: users } = await supabase.from("usuarios").select("*").eq("email", loginEmail).eq("empresa_id", empresaId).limit(1);
      if (Array.isArray(users) && users.length > 0) {
        return { success: true, user: users[0] };
      }
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Credenciais inv\xE1lidas" };
    } catch (_) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Erro ao validar credenciais" };
    }
  }
  if (!config.dbHost || !config.dbUser || !config.dbPassword || !config.dbDatabase) {
    return { success: false, message: "Backend de dados n\xE3o configurado" };
  }
  const connection = await mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase
  });
  try {
    const [companyRows] = await connection.execute(
      "SELECT id, email FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
      [digits]
    );
    if (!Array.isArray(companyRows) || companyRows.length === 0) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Credenciais inv\xE1lidas" };
    }
    const empresaId = companyRows[0].id;
    const [userRows] = await connection.execute("SELECT * FROM usuarios WHERE email = ? AND empresa_id = ?", [loginEmail, empresaId]);
    if (Array.isArray(userRows) && userRows.length > 0) {
      return { success: true, user: userRows[0] };
    }
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  } finally {
    await connection.end();
  }
});

export { login as default };
//# sourceMappingURL=login.mjs.map
