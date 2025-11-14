import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

type Filters = Record<string, string | null | undefined>;

function normalize(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function uiCategoriaToDbCandidates(val?: string): string[] {
  if (!val || val === 'Todas as categorias') return [];
  const norm = normalize(val);
  if (norm.startsWith('MANOMETR')) {
    return ['MANÔMETRO', 'MANOMETRO', 'MANÔMETROS', 'MANOMETROS'];
  }
  const set = new Set<string>();
  set.add(val);
  set.add(val.toUpperCase());
  set.add(norm);
  return Array.from(set);
}

function boolUiToDb(v?: string | null) {
  if (v == null) return undefined;
  if (v === '') return undefined;
  return v === 'Sim' ? 1 : v === 'Não' ? 0 : undefined;
}

const ALLOWED_FILTERS = new Set([
  'part_number', 'faixa_trabalho', 'fabricante', 'tipo_medicao', 'diametro_montagem', 'posicao_montagem',
  'conexao_instrumento', 'visor', 'classe_exatidao', 'material_involucro', 'material_internos', 'unidade_leitura',
  'glicerina', 'tubo_sifao', 'selo_diafragma', 'contato_eletrico', 'valvula_isolamento', 'certificados'
]);

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize || 12)));
  const uiCategoria = (query.categoria as string) || undefined;
  const categoriaCandidates = uiCategoriaToDbCandidates(uiCategoria);
  let filters: Filters = {};
  try {
    const raw = (query.filters as string) || '{}';
    filters = JSON.parse(raw);
  } catch {
    filters = {};
  }

  try {
    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      // Constrói a query
      let queryBuilder = supabase
        .from('produtos')
        .select('*', { count: 'exact' })
        .eq('ativo', 1);

      // Filtro de categoria
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in('categoria', categoriaCandidates);
      }

      // Filtros adicionais
      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === '') continue;
        
        if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === 'number') {
            queryBuilder = queryBuilder.eq(key, b);
          }
        } else if (key === 'certificados') {
          // Para JSON array, usamos contains
          queryBuilder = queryBuilder.contains(key, [String(val)]);
        } else {
          queryBuilder = queryBuilder.eq(key, String(val));
        }
      }

      // Ordenação e paginação
      const offset = (page - 1) * pageSize;
      const safeLimit = Math.min(100, Math.max(1, pageSize));
      
      const { data, error, count } = await queryBuilder
        .order('fabricante', { ascending: true })
        .order('part_number', { ascending: true })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        return { error: error.message };
      }

      return {
        page,
        pageSize: safeLimit,
        total: count || 0,
        items: data || [],
      };
    }

    // Fallback para MySQL (se configurado)
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      const whereParts: string[] = ['ativo = 1'];
      const params: any[] = [];
      if (categoriaCandidates.length) {
        whereParts.push(`categoria IN (${categoriaCandidates.map(() => '?').join(',')})`);
        params.push(...categoriaCandidates);
      }

      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === '') continue;
        if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === 'number') {
            whereParts.push(`${key} = ?`);
            params.push(b);
          }
        } else if (key === 'certificados') {
          // certificados é JSON array; procura item
          whereParts.push('JSON_CONTAINS(certificados, JSON_QUOTE(?))');
          params.push(String(val));
        } else {
          whereParts.push(`${key} = ?`);
          params.push(String(val));
        }
      }

      const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

      // total
      const [countRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
      const total = (countRows as any[])[0]?.total ?? 0;

      // paginação
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
        page, pageSize: safeLimit, total,
        items: rows,
      };
    }

    return { error: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { error: error.message };
  }
});