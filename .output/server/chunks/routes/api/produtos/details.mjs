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

const details = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const idRaw = query.id;
  const partNumberRaw = query.part_number;
  if (!idRaw && !partNumberRaw) {
    return { error: "missing_id_or_part_number" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*").eq("ativo", 1).limit(1);
      if (idRaw) {
        queryBuilder = queryBuilder.eq("id", Number(idRaw));
      } else if (partNumberRaw) {
        queryBuilder = queryBuilder.eq("part_number", String(partNumberRaw));
      }
      const { data, error } = await queryBuilder;
      if (error) {
        return { error: error.message };
      }
      const product = data == null ? void 0 : data[0];
      if (!product) return { error: "not_found" };
      return { item: product };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const whereParts = ["ativo = 1"];
        const params = [];
        if (idRaw) {
          whereParts.push("id = ?");
          params.push(Number(idRaw));
        } else if (partNumberRaw) {
          whereParts.push("part_number = ?");
          params.push(String(partNumberRaw));
        }
        const whereSql = `WHERE ${whereParts.join(" AND ")}`;
        const sql = `
          SELECT id, categoria, codigo_erp, part_number, fabricante, tipo_medicao,
                 diametro_montagem, posicao_montagem, conexao_instrumento,
                 material_involucro, material_internos, visor, classe_exatidao,
                 unidade_leitura, faixa_trabalho, glicerina, certificados,
                 tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento,
                 ncm, estoque, preco, imagens, ativo
          FROM produtos
          ${whereSql}
          LIMIT 1
        `;
        const [rows] = await conn.execute(sql, params);
        const product = rows[0];
        if (!product) return { error: "not_found" };
        return { item: product };
      } finally {
        await conn.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

export { details as default };
//# sourceMappingURL=details.mjs.map
