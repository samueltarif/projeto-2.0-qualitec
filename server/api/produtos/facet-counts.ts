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

const FACET_COLUMNS = [
  'faixa_trabalho', 'fabricante', 'tipo_medicao', 'diametro_montagem', 'posicao_montagem',
  'conexao_instrumento', 'visor', 'classe_exatidao', 'material_involucro', 'material_internos', 'unidade_leitura',
  'glicerina', 'tubo_sifao', 'selo_diafragma', 'contato_eletrico', 'valvula_isolamento', 'certificados'
] as const;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

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
      
      // Busca todos os produtos ativos com filtros básicos
      let queryBuilder = supabase
        .from('produtos')
        .select('*')
        .eq('ativo', 1);

      // Filtro de categoria
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in('categoria', categoriaCandidates);
      }

      // Aplica filtros básicos (exceto os que precisam de agregação)
      for (const [key, val] of Object.entries(filters)) {
        if (key === 'part_number' && val) {
          queryBuilder = queryBuilder.eq('part_number', String(val));
        } else if (!FACET_COLUMNS.includes(key as any)) {
          if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(key)) {
            const b = boolUiToDb(val);
            if (typeof b === 'number') {
              queryBuilder = queryBuilder.eq(key, b);
            }
          } else if (key === 'certificados') {
            queryBuilder = queryBuilder.contains(key, [String(val)]);
          } else if (val != null && val !== '') {
            queryBuilder = queryBuilder.eq(key, String(val));
          }
        }
      }

      const { data: produtos, error } = await queryBuilder;

      if (error) {
        return { error: error.message };
      }

      // Processa as contagens localmente
      const counts: Record<string, Record<string, number>> = {};
      const totals: Record<string, number> = {};
      const produtosArray = produtos || [];

      // Inicializa estruturas
      for (const facet of FACET_COLUMNS) {
        counts[facet] = {};
        totals[facet] = 0;
      }

      // Conta totais e valores por facet
      for (const produto of produtosArray) {
        for (const facet of FACET_COLUMNS) {
          const valor = produto[facet];
          
          if (facet === 'certificados') {
            // Processa array de certificados
            if (Array.isArray(valor)) {
              for (const item of valor) {
                const s = String(item).trim();
                if (s) {
                  counts[facet][s] = (counts[facet][s] || 0) + 1;
                  totals[facet]++;
                }
              }
            }
          } else if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(facet)) {
            // Valores booleanos
            const label = valor === 1 ? 'Sim' : valor === 0 ? 'Não' : String(valor || '');
            if (label && label !== '') {
              counts[facet][label] = (counts[facet][label] || 0) + 1;
              totals[facet]++;
            }
          } else {
            // Valores de texto
            const s = String(valor || '').trim();
            if (s && s !== '') {
              counts[facet][s] = (counts[facet][s] || 0) + 1;
              totals[facet]++;
            }
          }
        }
      }

      return { counts, totals };
    }

    // Fallback para MySQL (se configurado) - mantém código original
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      try {
        // Base WHERE comum
        const baseWhereParts: string[] = ['ativo = 1'];
        const baseParams: any[] = [];
        if (categoriaCandidates.length) {
          baseWhereParts.push(`categoria IN (${categoriaCandidates.map(() => '?').join(',')})`);
          baseParams.push(...categoriaCandidates);
        }

        const counts: Record<string, Record<string, number>> = {};
        const totals: Record<string, number> = {};

        for (const facet of FACET_COLUMNS) {
          // WHERE aplicando todos os filtros, exceto o próprio facet
          const whereParts = [...baseWhereParts];
          const params: any[] = [...baseParams];
          for (const [key, val] of Object.entries(filters)) {
            if (key === facet) continue; // ignora facet atual
            if (val == null || val === '') continue;
            if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(key)) {
              const b = boolUiToDb(val);
              if (typeof b === 'number') {
                whereParts.push(`${key} = ?`);
                params.push(b);
              }
            } else if (key === 'certificados') {
              whereParts.push('JSON_CONTAINS(certificados, JSON_QUOTE(?))');
              params.push(String(val));
            } else if (key === 'part_number') {
              // part_number é entrada de texto na UI; aplica igualdade simples
              whereParts.push(`part_number = ?`);
              params.push(String(val));
            } else {
              whereParts.push(`${key} = ?`);
              params.push(String(val));
            }
          }

          const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

          // Total para "Todos" deste facet (ignorando o facet em si)
          const [totRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
          totals[facet] = (totRows as any[])[0]?.total ?? 0;

          // Contagens por valor
          counts[facet] = {};
          if (facet === 'certificados') {
            // certificados é JSON array; percorre e agrega em JS
            const [rows] = await conn.execute(`SELECT certificados FROM produtos ${whereSql}` , params);
            for (const r of rows as any[]) {
              const raw = r?.certificados;
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
              } catch {}
            }
          } else if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(facet)) {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} GROUP BY ${facet}` , params);
            for (const r of rows as any[]) {
              const label = r.v === 1 ? 'Sim' : r.v === 0 ? 'Não' : String(r.v);
              counts[facet][label] = Number(r.c) || 0;
            }
          } else {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} AND ${facet} IS NOT NULL AND ${facet} <> '' GROUP BY ${facet}` , params);
            for (const r of rows as any[]) {
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

    return { error: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { error: error.message };
  }
});