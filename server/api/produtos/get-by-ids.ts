import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const idsParam = (query.ids as string) || '';

  // Parse ids from comma-separated string
  const ids = idsParam
    .split(',')
    .map((s) => Number(String(s).trim()))
    .filter((n) => Number.isFinite(n) && n > 0);

  if (ids.length < 2 || ids.length > 3) {
    return { error: 'Forneça entre 2 e 3 ids de produtos' };
  }

  try {
    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .in('id', ids)
        .order('id', { ascending: true });

      if (error) {
        return { error: error.message };
      }

      // Reordena os resultados para manter a ordem dos IDs solicitados
      const idOrder = new Map(ids.map((id, index) => [id, index]));
      const orderedData = (data || []).sort((a, b) => {
        const orderA = idOrder.get(a.id) ?? 999;
        const orderB = idOrder.get(b.id) ?? 999;
        return orderA - orderB;
      });

      return { items: orderedData };
    }

    // Fallback para MySQL (se configurado)
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      try {
        const placeholders = ids.map(() => '?').join(',');
        const sql = `
          SELECT id, categoria, part_number, fabricante,
                 tipo_medicao, diametro_montagem, posicao_montagem,
                 conexao_instrumento, material_involucro, material_internos,
                 visor, classe_exatidao, unidade_leitura, faixa_trabalho,
                 glicerina, certificados, tubo_sifao, selo_diafragma,
                 contato_eletrico, valvula_isolamento,
                 ncm, estoque, preco
          FROM produtos
          WHERE id IN (${placeholders})
          ORDER BY FIELD(id, ${placeholders})
        `;

        const params = [...ids, ...ids];
        const [rows] = await conn.execute(sql, params);

        return { items: rows };
      } finally {
        await conn.end();
      }
    }

    return { error: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { error: error.message };
  }
});