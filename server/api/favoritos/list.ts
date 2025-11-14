import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);

  const email = String(query.email || '').trim().toUpperCase();
  const empresaId = Number(query.empresaId || 0);

  if (!email || !Number.isFinite(empresaId) || empresaId <= 0) {
    return { items: [] };
  }

  try {
    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      // Busca o usuário
      const { data: userRows, error: userError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .eq('empresa_id', empresaId)
        .single();

      if (userError || !userRows) {
        return { items: [] };
      }

      // Busca os favoritos
      const { data: favoritos, error: favoritosError } = await supabase
        .from('favoritos')
        .select('produto_id, alias')
        .eq('usuario_id', userRows.id)
        .order('created_at', { ascending: false });

      if (favoritosError) {
        return { error: favoritosError.message };
      }

      // Mapeia os dados para o formato esperado (produto_id -> id)
      const items = Array.isArray(favoritos) ? favoritos.map(fav => ({
        id: fav.produto_id,
        alias: fav.alias
      })) : [];

      return { items };
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
        const [userRows]: any = await conn.execute(
          'SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?',
          [email, empresaId]
        );
        if (!Array.isArray(userRows) || userRows.length === 0) {
          return { items: [] };
        }
        const usuarioId = userRows[0].id;

        const [rows]: any = await conn.execute(
          'SELECT produto_id AS id, alias FROM favoritos WHERE usuario_id = ? ORDER BY created_at DESC',
          [usuarioId]
        );

        return { items: Array.isArray(rows) ? rows : [] };
      } finally {
        await conn.end();
      }
    }

    return { items: [] };
  } catch (error: any) {
    return { error: error?.message || 'Erro ao listar favoritos' };
  }
});