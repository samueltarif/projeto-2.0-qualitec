import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const uiCategoria = (query.categoria as string) || '';
  const limit = Number(query.limit || 500);

  // Normaliza rótulo da UI em possíveis valores no BD (singular/plural, com/sem acento)
  function normalize(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  }

  function categoriaCandidates(ui: string): string[] {
    const norm = normalize(ui);
    if (!ui || ui === 'Todas as categorias') return [];
    // Mapeia "Manômetros" para variações comuns
    if (norm.startsWith('MANOMETR')) {
      return ['MANÔMETRO', 'MANOMETRO', 'MANÔMETROS', 'MANOMETROS'];
    }
    // Fallback: tenta o valor original, upper e sem acento
    const set = new Set<string>();
    set.add(ui);
    set.add(ui.toUpperCase());
    set.add(norm);
    return Array.from(set);
  }

  const categoriaList = categoriaCandidates(uiCategoria);

  try {
    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      let queryBuilder = supabase
        .from('produtos')
        .select('*')
        .eq('ativo', 1);

      // Filtro de categoria
      if (categoriaList.length > 0) {
        queryBuilder = queryBuilder.in('categoria', categoriaList);
      }

      const { data: produtos, error } = await queryBuilder;

      if (error) {
        return { error: error.message };
      }

      const produtosArray = produtos || [];

      // Processa valores distintos localmente
      function distinct(col: string, order: 'ASC' | 'DESC' = 'ASC') {
        const values = new Set<string>();
        for (const produto of produtosArray) {
          const valor = produto[col];
          if (valor != null && valor !== '') {
            values.add(String(valor));
          }
        }
        const sorted = Array.from(values).sort((a, b) => 
          order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a)
        );
        return sorted.slice(0, limit);
      }

      function distinctBool(col: string) {
        function toUiBool(val: any): string | null {
          if (val === null || val === undefined) return null;
          if (typeof val === 'number') return val === 1 ? 'Sim' : 'Não';
          const s = String(val).trim().toLowerCase();
          if (!s) return null;
          if (['1','sim','s','true','yes','y'].includes(s)) return 'Sim';
          if (['0','nao','não','n','false','no'].includes(s)) return 'Não';
          return 'Sim';
        }

        const set = new Set<string>();
        for (const produto of produtosArray) {
          const valor = produto[col];
          const mapped = toUiBool(valor);
          if (mapped) set.add(mapped);
        }
        const out = Array.from(set);
        out.sort((a, b) => (a === b ? 0 : a === 'Sim' ? -1 : 1));
        return out;
      }

      function distinctFromJsonArray(col: string) {
        const set = new Set<string>();
        for (const produto of produtosArray) {
          const val = produto[col];
          if (!val) continue;
          try {
            const arr = Array.isArray(val) ? val : JSON.parse(val);
            if (Array.isArray(arr)) {
              for (const item of arr) {
                const s = String(item).trim();
                if (s) set.add(s);
              }
            }
          } catch {}
        }
        return Array.from(set).sort();
      }

      const values = {
        part_number: distinct('part_number'),
        faixa_trabalho: distinct('faixa_trabalho'),
        fabricante: distinct('fabricante'),
        tipo_medicao: distinct('tipo_medicao'),
        diametro_montagem: distinct('diametro_montagem'),
        posicao_montagem: distinct('posicao_montagem'),
        conexao_instrumento: distinct('conexao_instrumento'),
        visor: distinct('visor'),
        classe_exatidao: distinct('classe_exatidao'),
        material_involucro: distinct('material_involucro'),
        material_internos: distinct('material_internos'),
        unidade_leitura: distinct('unidade_leitura'),
        glicerina: distinctBool('glicerina'),
        certificados: distinctFromJsonArray('certificados'),
        tubo_sifao: distinctBool('tubo_sifao'),
        selo_diafragma: distinctBool('selo_diafragma'),
        contato_eletrico: distinctBool('contato_eletrico'),
        valvula_isolamento: distinctBool('valvula_isolamento'),
      };

      return { values };
    }

    // Fallback para MySQL (se configurado)
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      try {
        const where = categoriaList.length ? `WHERE categoria IN (${categoriaList.map(() => '?').join(',')})` : 'WHERE 1=1';
        const params: any[] = [...categoriaList];

        async function distinct(col: string, order: 'ASC' | 'DESC' = 'ASC') {
          const sql = `SELECT DISTINCT ${col} AS v FROM produtos ${where} AND ${col} IS NOT NULL AND ${col} <> '' ORDER BY ${col} ${order} LIMIT ?`;
          const args = [...params, limit];
          const [rows] = await connection.query(sql, args);
          return (rows as any[]).map(r => String(r.v));
        }

        // Booleanos: mapeia valores diversos (0/1, strings) -> 'Sim'/'Não'
        async function distinctBool(col: string) {
          const sql = `SELECT DISTINCT ${col} AS v FROM produtos ${where} ORDER BY ${col} ASC LIMIT ?`;
          const args = [...params, limit];
          const [rows] = await connection.query(sql, args);

          function toUiBool(val: any): string | null {
            if (val === null || val === undefined) return null;
            if (typeof val === 'number') return val === 1 ? 'Sim' : 'Não';
            const s = String(val).trim().toLowerCase();
            if (!s) return null;
            if (['1','sim','s','true','yes','y'].includes(s)) return 'Sim';
            if (['0','nao','não','n','false','no'].includes(s)) return 'Não';
            // fallback: qualquer valor diferente de representações de "Não" será tratado como "Sim"
            return 'Sim';
          }

          const set = new Set<string>();
          for (const r of rows as any[]) {
            const mapped = toUiBool(r.v);
            if (mapped) set.add(mapped);
          }
          // Ordena para consistência: 'Sim' primeiro, depois 'Não'
          const out = Array.from(set);
          out.sort((a, b) => (a === b ? 0 : a === 'Sim' ? -1 : 1));
          return out;
        }

        // Certificados (JSON array): agrega valores únicos
        async function distinctFromJsonArray(col: string) {
          const sql = `SELECT ${col} FROM produtos ${where}`;
          const [rows] = await connection.query(sql, params);
          const set = new Set<string>();
          for (const r of rows as any[]) {
            const val = r[col];
            if (!val) continue;
            try {
              const arr = Array.isArray(val) ? val : JSON.parse(val);
              if (Array.isArray(arr)) {
                for (const item of arr) {
                  const s = String(item).trim();
                  if (s) set.add(s);
                }
              }
            } catch {}
          }
          return Array.from(set).sort();
        }

        const values = {
          part_number: await distinct('part_number'),
          faixa_trabalho: await distinct('faixa_trabalho'),
          fabricante: await distinct('fabricante'),
          tipo_medicao: await distinct('tipo_medicao'),
          diametro_montagem: await distinct('diametro_montagem'),
          posicao_montagem: await distinct('posicao_montagem'),
          conexao_instrumento: await distinct('conexao_instrumento'),
          visor: await distinct('visor'),
          classe_exatidao: await distinct('classe_exatidao'),
          material_involucro: await distinct('material_involucro'),
          material_internos: await distinct('material_internos'),
          unidade_leitura: await distinct('unidade_leitura'),
          glicerina: await distinctBool('glicerina'),
          certificados: await distinctFromJsonArray('certificados'),
          tubo_sifao: await distinctBool('tubo_sifao'),
          selo_diafragma: await distinctBool('selo_diafragma'),
          contato_eletrico: await distinctBool('contato_eletrico'),
          valvula_isolamento: await distinctBool('valvula_isolamento'),
        };

        return { values };
      } finally {
        await connection.end();
      }
    }

    return { error: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { error: error.message };
  }
});