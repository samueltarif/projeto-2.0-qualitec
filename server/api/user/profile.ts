import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';
// import mysql from 'mysql2/promise'; // MySQL comentado para produção

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  const rawEmail: string = String(body?.email || '').trim();
  const email = rawEmail.toUpperCase();
  const empresaId = Number(body?.empresaId);
  const fullName: string = String(body?.fullName || '').trim();
  const sector: string = String(body?.sector || '').trim();
  const whatsapp: string = String(body?.whatsapp || '').trim();

  if (!email || !empresaId || !Number.isFinite(empresaId)) {
    return { success: false, message: 'Dados insuficientes: email e empresaId são obrigatórios.' };
  }

  try {
    // Usa Supabase para testes
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      const { data, error } = await supabase
        .from('usuarios')
        .update({ full_name: fullName, sector: sector, whatsapp: whatsapp })
        .eq('email', email)
        .eq('empresa_id', empresaId)
        .select()
        .single();

      if (!error && data) {
        return { success: true, updated: true };
      }

      return { success: false, message: 'Usuário não encontrado para esta empresa.' };
    }

    /*
    // CÓDIGO MYSQL PARA PRODUÇÃO (comentado)
    const connection = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
    });

    try {
      const [updateRes]: any = await connection.execute(
        'UPDATE usuarios SET full_name = ?, sector = ?, whatsapp = ? WHERE email = ? AND empresa_id = ?',
        [fullName, sector, whatsapp, email, empresaId]
      );

      if (updateRes?.affectedRows && updateRes.affectedRows > 0) {
        return { success: true, updated: true };
      }

      return { success: false, message: 'Usuário não encontrado para esta empresa.' };
    } catch (error: any) {
      return { success: false, message: error?.message || 'Erro ao salvar perfil.' };
    } finally {
      await connection.end();
    }
    */

    return { success: false, message: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Erro ao salvar perfil.' };
  }
});