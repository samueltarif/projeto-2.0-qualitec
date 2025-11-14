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
const FACET_COLUMNS = [
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
];
const facetCounts = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const query = getQuery(event);
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
      let queryBuilder = supabase.from("produtos").select("*").eq("ativo", 1);
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in("categoria", categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (key === "part_number" && val) {
          queryBuilder = queryBuilder.eq("part_number", String(val));
        } else if (!FACET_COLUMNS.includes(key)) {
          if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
            const b = boolUiToDb(val);
            if (typeof b === "number") {
              queryBuilder = queryBuilder.eq(key, b);
            }
          } else if (key === "certificados") {
            queryBuilder = queryBuilder.contains(key, [String(val)]);
          } else if (val != null && val !== "") {
            queryBuilder = queryBuilder.eq(key, String(val));
          }
        }
      }
      const { data: produtos, error } = await queryBuilder;
      if (error) {
        return { error: error.message };
      }
      const counts = {};
      const totals = {};
      const produtosArray = produtos || [];
      for (const facet of FACET_COLUMNS) {
        counts[facet] = {};
        totals[facet] = 0;
      }
      for (const produto of produtosArray) {
        for (const facet of FACET_COLUMNS) {
          const valor = produto[facet];
          if (facet === "certificados") {
            if (Array.isArray(valor)) {
              for (const item of valor) {
                const s = String(item).trim();
                if (s) {
                  counts[facet][s] = (counts[facet][s] || 0) + 1;
                  totals[facet]++;
                }
              }
            }
          } else if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(facet)) {
            const label = valor === 1 ? "Sim" : valor === 0 ? "N\xE3o" : String(valor || "");
            if (label && label !== "") {
              counts[facet][label] = (counts[facet][label] || 0) + 1;
              totals[facet]++;
            }
          } else {
            const s = String(valor || "").trim();
            if (s && s !== "") {
              counts[facet][s] = (counts[facet][s] || 0) + 1;
              totals[facet]++;
            }
          }
        }
      }
      return { counts, totals };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const baseWhereParts = ["ativo = 1"];
        const baseParams = [];
        if (categoriaCandidates.length) {
          baseWhereParts.push(`categoria IN (${categoriaCandidates.map(() => "?").join(",")})`);
          baseParams.push(...categoriaCandidates);
        }
        const counts = {};
        const totals = {};
        for (const facet of FACET_COLUMNS) {
          const whereParts = [...baseWhereParts];
          const params = [...baseParams];
          for (const [key, val] of Object.entries(filters)) {
            if (key === facet) continue;
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
            } else if (key === "part_number") {
              whereParts.push(`part_number = ?`);
              params.push(String(val));
            } else {
              whereParts.push(`${key} = ?`);
              params.push(String(val));
            }
          }
          const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
          const [totRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
          totals[facet] = (_b = (_a = totRows[0]) == null ? void 0 : _a.total) != null ? _b : 0;
          counts[facet] = {};
          if (facet === "certificados") {
            const [rows] = await conn.execute(`SELECT certificados FROM produtos ${whereSql}`, params);
            for (const r of rows) {
              const raw = r == null ? void 0 : r.certificados;
              if (!raw) continue;
              try {
                const arr = Array.isArray(raw) ? raw : JSON.parse(raw);
                if (Array.isArray(arr)) {
                  for (const item of arr) {
                    const s = String(item).trim();
                    if (!s) continue;
                    counts[facet][s] = (counts[facet][s] || 0) + 1;
                  }
                }
              } catch {
              }
            }
          } else if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(facet)) {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} GROUP BY ${facet}`, params);
            for (const r of rows) {
              const label = r.v === 1 ? "Sim" : r.v === 0 ? "N\xE3o" : String(r.v);
              counts[facet][label] = Number(r.c) || 0;
            }
          } else {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} AND ${facet} IS NOT NULL AND ${facet} <> '' GROUP BY ${facet}`, params);
            for (const r of rows) {
              const s = String(r.v);
              counts[facet][s] = Number(r.c) || 0;
            }
          }
        }
        return { counts, totals };
      } finally {
        await conn.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

export { facetCounts as default };
//# sourceMappingURL=facet-counts.mjs.map
