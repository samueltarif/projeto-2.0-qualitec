import { defineEventHandler, readBody } from 'h3';
import { createConnection } from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

async function resolveUserIdSupabase(supabase: any, email: string, empresaId: number): Promise<number | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email.toUpperCase())
    .eq('empresa_id', empresaId)
    .single();
  
  if (error || !data) return null;
  return Number(data.id);
}

async function resolveProductIdSupabase(supabase: any, rawId: string | number): Promise<number | null> {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  
  if (isNumeric) {
    const { data, error } = await supabase
      .from('produtos')
      .select('id')
      .eq('id', Number(idStr))
      .single();
    return (!error && data) ? Number(data.id) : null;
  }
  
  const { data, error } = await supabase
    .from('produtos')
    .select('id')
    .eq('part_number', idStr)
    .single();
  
  return (!error && data) ? Number(data.id) : null;
}

async function resolveUserIdMySql(conn: any, email: string, empresaId: number): Promise<number | null> {
  const [userRows]: any = await conn.execute(
    'SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?',
    [email.toUpperCase(), empresaId]
  );
  if (!Array.isArray(userRows) || userRows.length === 0) return null;
  return Number(userRows[0].id);
}

async function resolveProductIdMySql(conn: any, rawId: string | number): Promise<number | null> {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const [rows]: any = await conn.execute('SELECT id FROM produtos WHERE id = ?', [Number(idStr)]);
    return Array.isArray(rows) && rows.length ? Number(rows[0].id) : null;
  }
  const [rows]: any = await conn.execute('SELECT id FROM produtos WHERE part_number = ?', [idStr]);
  return Array.isArray(rows) && rows.length ? Number(rows[0].id) : null;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  const email = String(body?.email || '').trim().toUpperCase();
  const empresaId = Number(body?.empresaId || 0);
  const id = body?.id;

  if (!email || !Number.isFinite(empresaId) || empresaId <= 0 || id == null) {
    return { success: false, message: 'Parâmetros inválidos' };
  }

  try {
    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      const usuarioId = await resolveUserIdSupabase(supabase, email, empresaId);
      if (!usuarioId) return { success: false, message: 'Usuário não encontrado' };
      
      const produtoId = await resolveProductIdSupabase(supabase, id);
      if (!produtoId) return { success: false, message: 'Produto não encontrado' };

      // Verifica se já existe
      const { data: existsRows, error: existsError } = await supabase
        .from('favoritos')
        .select('id')
        .eq('usuario_id', usuarioId)
        .eq('produto_id', produtoId)
        .single();

      if (existsError && existsError.code !== 'PGRST116') {
        return { success: false, message: existsError.message };
      }

      const exists = !existsError && existsRows;

      if (exists) {
        const { error: deleteError } = await supabase
          .from('favoritos')
          .delete()
          .eq('id', existsRows.id);
        
        if (deleteError) {
          return { success: false, message: deleteError.message };
        }
        return { success: true, active: false };
      } else {
        const { error: insertError } = await supabase
          .from('favoritos')
          .insert({ usuario_id: usuarioId, produto_id: produtoId });
        
        if (insertError) {
          return { success: false, message: insertError.message };
        }
        return { success: true, active: true };
      }
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
        const usuarioId = await resolveUserIdMySql(conn, email, empresaId);
        if (!usuarioId) return { success: false, message: 'Usuário não encontrado' };
        
        const produtoId = await resolveProductIdMySql(conn, id);
        if (!produtoId) return { success: false, message: 'Produto não encontrado' };

        const [existsRows]: any = await conn.execute(
          'SELECT id FROM favoritos WHERE usuario_id = ? AND produto_id = ?',
          [usuarioId, produtoId]
        );
        const exists = Array.isArray(existsRows) && existsRows.length > 0;

        if (exists) {
          const favId = Number(existsRows[0].id);
          await conn.execute('DELETE FROM favoritos WHERE id = ?', [favId]);
          return { success: true, active: false };
        } else {
          await conn.execute('INSERT INTO favoritos (usuario_id, produto_id) VALUES (?, ?)', [usuarioId, produtoId]);
          return { success: true, active: true };
        }
      } finally {
        await conn.end();
      }
    }

    return { success: false, message: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Erro ao alternar favorito' };
  }
});