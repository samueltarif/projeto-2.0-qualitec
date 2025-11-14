import { c as defineEventHandler, u as useRuntimeConfig, r as readBody, $ as $fetch } from '../../_/nitro.mjs';
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

const getCompanyByCnpj = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const { cnpj } = body;
  if (!cnpj) {
    return { success: false, message: "CNPJ n\xE3o fornecido." };
  }
  const cleanCnpj = cnpj.replace(/\D/g, "");
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("empresas").select("razao_social").or(`cnpj.eq.${cleanCnpj},cnpj.eq.${cnpj}`).single();
      if (!error && data) {
        return { success: true, razao_social: data.razao_social };
      }
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const [rows] = await connection.execute(
          "SELECT razao_social FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
          [cleanCnpj]
        );
        if (Array.isArray(rows) && rows.length > 0) {
          const company = rows[0];
          return { success: true, razao_social: company.razao_social };
        }
      } finally {
        await connection.end();
      }
    }
    try {
      const external = await $fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
        { headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (TraeAI)" } }
      );
      if (external == null ? void 0 : external.razao_social) {
        return { success: true, razao_social: external.razao_social };
      }
      if (external == null ? void 0 : external.nome_fantasia) {
        return { success: true, razao_social: external.nome_fantasia };
      }
    } catch (e) {
    }
    try {
      const r = await $fetch(
        `https://www.receitaws.com.br/v1/cnpj/${cleanCnpj}`,
        { headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (TraeAI)" } }
      );
      if (r == null ? void 0 : r.nome) {
        return { success: true, razao_social: r.nome };
      }
      if (r == null ? void 0 : r.fantasia) {
        return { success: true, razao_social: r.fantasia };
      }
    } catch (e) {
    }
    return { success: false, message: "Empresa n\xE3o encontrada." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

export { getCompanyByCnpj as default };
//# sourceMappingURL=get-company-by-cnpj.mjs.map
