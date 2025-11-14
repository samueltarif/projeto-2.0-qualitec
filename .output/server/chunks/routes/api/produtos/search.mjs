import { c as defineEventHandler, u as useRuntimeConfig, g as getQuery } from '../../../_/nitro.mjs';
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

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function uiCategoriaToDbCandidates(val) {
  if (!val || val === "Todas as categorias") return [];
  const norm = normalize(val);
  if (norm.startsWith("MANOMETR")) {
    return ["MAN\xD4METRO", "MANOMETRO", "MAN\xD4METROS", "MANOMETROS"];
  }
  const set = /* @__PURE__ */ new Set();
  set.add(val);
  set.add(val.toUpperCase());
  set.add(norm);
  return Array.from(set);
}
function boolUiToDb(v) {
  if (v == null) return void 0;
  if (v === "") return void 0;
  return v === "Sim" ? 1 : v === "N\xE3o" ? 0 : void 0;
}
const ALLOWED_FILTERS = /* @__PURE__ */ new Set([
  "part_number",
  "faixa_trabalho",
  "fabricante",
  "tipo_medicao",
  "diametro_montagem",
  "posicao_montagem",
  "conexao_instrumento",
  "visor",
  "classe_exatidao",
  "material_involucro",
  "material_internos",
  "unidade_leitura",
  "glicerina",
  "tubo_sifao",
  "selo_diafragma",
  "contato_eletrico",
  "valvula_isolamento",
  "certificados"
]);
const search = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize || 12)));
  const uiCategoria = query.categoria || void 0;
  const categoriaCandidates = uiCategoriaToDbCandidates(uiCategoria);
  let filters = {};
  try {
    const raw = query.filters || "{}";
    filters = JSON.parse(raw);
  } catch {
    filters = {};
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*", { count: "exact" }).eq("ativo", 1);
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in("categoria", categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === "") continue;
        if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === "number") {
            queryBuilder = queryBuilder.eq(key, b);
          }
        } else if (key === "certificados") {
          queryBuilder = queryBuilder.contains(key, [String(val)]);
        } else {
          queryBuilder = queryBuilder.eq(key, String(val));
        }
      }
      const offset = (page - 1) * pageSize;
      const safeLimit = Math.min(100, Math.max(1, pageSize));
      const { data, error, count } = await queryBuilder.order("fabricante", { ascending: true }).order("part_number", { ascending: true }).range(offset, offset + safeLimit - 1);
      if (error) {
        return { error: error.message };
      }
      return {
        page,
        pageSize: safeLimit,
        total: count || 0,
        items: data || []
      };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      const whereParts = ["ativo = 1"];
      const params = [];
      if (categoriaCandidates.length) {
        whereParts.push(`categoria IN (${categoriaCandidates.map(() => "?").join(",")})`);
        params.push(...categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === "") continue;
        if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === "number") {
            whereParts.push(`${key} = ?`);
            params.push(b);
          }
        } else if (key === "certificados") {
          whereParts.push("JSON_CONTAINS(certificados, JSON_QUOTE(?))");
          params.push(String(val));
        } else {
          whereParts.push(`${key} = ?`);
          params.push(String(val));
        }
      }
      const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
      const [countRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
      const total = (_b = (_a = countRows[0]) == null ? void 0 : _a.total) != null ? _b : 0;
      const offset = (page - 1) * pageSize;
      const safeLimit = Math.min(100, Math.max(1, pageSize));
      const safeOffset = Math.max(0, offset);
      const listSql = `
        SELECT id, part_number, fabricante, faixa_trabalho, unidade_leitura,
               categoria, diametro_montagem, posicao_montagem, conexao_instrumento,
               material_involucro, material_internos, visor, classe_exatidao,
               glicerina, tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento,
               ncm, estoque, preco
        FROM produtos
        ${whereSql}
        ORDER BY fabricante ASC, part_number ASC
        LIMIT ${safeLimit} OFFSET ${safeOffset}
      `;
      const [rows] = await conn.execute(listSql, params);
      await conn.end();
      return {
        page,
        pageSize: safeLimit,
        total,
        items: rows
      };
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

export { search as default };
//# sourceMappingURL=search.mjs.map
