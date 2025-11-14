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

const registerCompany = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  try {
    const digits = String(body.cnpj).replace(/\D/g, "");
    if (digits.length !== 14) {
      return { success: false, message: "CNPJ inv\xE1lido. Informe 14 d\xEDgitos." };
    }
    const maskedCnpj = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    const digitsOnly = digits;
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data: existingCompany } = await supabase.from("empresas").select("id, cnpj").or(`cnpj.eq.${maskedCnpj},cnpj.eq.${digitsOnly}`).single();
      if (existingCompany) {
        return { success: false, message: "CNPJ j\xE1 cadastrado no sistema." };
      }
      const { data, error } = await supabase.from("empresas").insert({
        cnpj: maskedCnpj,
        razao_social: (_a = body.razao_social) == null ? void 0 : _a.toUpperCase(),
        email: body.email,
        filial: (_b = body.filial) == null ? void 0 : _b.toUpperCase()
      }).select().single();
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, result: data };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const [existingRows] = await connection.execute(
          "SELECT id FROM empresas WHERE cnpj = ? OR cnpj = ?",
          [maskedCnpj, digitsOnly]
        );
        if (Array.isArray(existingRows) && existingRows.length > 0) {
          return { success: false, message: "CNPJ j\xE1 cadastrado no sistema." };
        }
        const [result] = await connection.execute(
          "INSERT INTO empresas (cnpj, razao_social, email, filial) VALUES (?, ?, ?, ?)",
          [maskedCnpj, (_c = body.razao_social) == null ? void 0 : _c.toUpperCase(), body.email, (_d = body.filial) == null ? void 0 : _d.toUpperCase()]
        );
        return { success: true, result };
      } finally {
        await connection.end();
      }
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

export { registerCompany as default };
//# sourceMappingURL=register-company.mjs.map
