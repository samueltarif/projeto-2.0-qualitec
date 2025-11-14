import { c as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../../_/nitro.mjs';
import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

async function resolveUserIdSupabase(supabase, email, empresaId) {
  const { data, error } = await supabase.from("usuarios").select("id").eq("email", email.toUpperCase()).eq("empresa_id", empresaId).single();
  if (error || !data) return null;
  return Number(data.id);
}
async function resolveProductIdSupabase(supabase, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const { data: data2, error: error2 } = await supabase.from("produtos").select("id").eq("id", Number(idStr)).single();
    return !error2 && data2 ? Number(data2.id) : null;
  }
  const { data, error } = await supabase.from("produtos").select("id").eq("part_number", idStr).single();
  return !error && data ? Number(data.id) : null;
}
async function resolveUserIdMySql(conn, email, empresaId) {
  const [userRows] = await conn.execute(
    "SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?",
    [email.toUpperCase(), empresaId]
  );
  if (!Array.isArray(userRows) || userRows.length === 0) return null;
  return Number(userRows[0].id);
}
async function resolveProductIdMySql(conn, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const [rows2] = await conn.execute("SELECT id FROM produtos WHERE id = ?", [Number(idStr)]);
    return Array.isArray(rows2) && rows2.length ? Number(rows2[0].id) : null;
  }
  const [rows] = await conn.execute("SELECT id FROM produtos WHERE part_number = ?", [idStr]);
  return Array.isArray(rows) && rows.length ? Number(rows[0].id) : null;
}
const toggle = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const email = String((body == null ? void 0 : body.email) || "").trim().toUpperCase();
  const empresaId = Number((body == null ? void 0 : body.empresaId) || 0);
  const id = body == null ? void 0 : body.id;
  if (!email || !Number.isFinite(empresaId) || empresaId <= 0 || id == null) {
    return { success: false, message: "Par\xE2metros inv\xE1lidos" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const usuarioId = await resolveUserIdSupabase(supabase, email, empresaId);
      if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
      const produtoId = await resolveProductIdSupabase(supabase, id);
      if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
      const { data: existsRows, error: existsError } = await supabase.from("favoritos").select("id").eq("usuario_id", usuarioId).eq("produto_id", produtoId).single();
      if (existsError && existsError.code !== "PGRST116") {
        return { success: false, message: existsError.message };
      }
      const exists = !existsError && existsRows;
      if (exists) {
        const { error: deleteError } = await supabase.from("favoritos").delete().eq("id", existsRows.id);
        if (deleteError) {
          return { success: false, message: deleteError.message };
        }
        return { success: true, active: false };
      } else {
        const { error: insertError } = await supabase.from("favoritos").insert({ usuario_id: usuarioId, produto_id: produtoId });
        if (insertError) {
          return { success: false, message: insertError.message };
        }
        return { success: true, active: true };
      }
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const usuarioId = await resolveUserIdMySql(conn, email, empresaId);
        if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
        const produtoId = await resolveProductIdMySql(conn, id);
        if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
        const [existsRows] = await conn.execute(
          "SELECT id FROM favoritos WHERE usuario_id = ? AND produto_id = ?",
          [usuarioId, produtoId]
        );
        const exists = Array.isArray(existsRows) && existsRows.length > 0;
        if (exists) {
          const favId = Number(existsRows[0].id);
          await conn.execute("DELETE FROM favoritos WHERE id = ?", [favId]);
          return { success: true, active: false };
        } else {
          await conn.execute("INSERT INTO favoritos (usuario_id, produto_id) VALUES (?, ?)", [usuarioId, produtoId]);
          return { success: true, active: true };
        }
      } finally {
        await conn.end();
      }
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Erro ao alternar favorito" };
  }
});

export { toggle as default };
//# sourceMappingURL=toggle.mjs.map
