import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';
// import mysql from 'mysql2/promise'; // MySQL comentado para produção

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  try {
    // Usa Supabase para testes (ativa por padrão)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      // 1. Encontrar a empresa pelo CNPJ (normalizado)
      const digits = String(body.cnpj).replace(/\D/g, '');
      const { data: companyRows, error: companyError } = await supabase
        .from('empresas')
        .select('id')
        .or(`cnpj.eq.${digits},cnpj.eq.${body.cnpj}`)
        .single();

      if (companyError || !companyRows) {
        return { success: false, message: 'CNPJ não encontrado' };
      }

      const empresaId = companyRows.id;

      // 2. Verificar se já existe usuário com (email, empresa_id)
      const loginEmail = String(body.email || '').trim().toUpperCase();
      const { data: existingRows, error: existingError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', loginEmail)
        .eq('empresa_id', empresaId)
        .single();

      if (existingRows && !existingError) {
        return { success: true, alreadyExists: true, id: existingRows.id };
      }

      // 3. Inserir o novo usuário se não existir
      const { data: newUser, error: insertError } = await supabase
        .from('usuarios')
        .insert({ email: loginEmail, empresa_id: empresaId })
        .select()
        .single();

      if (insertError) {
        return { success: false, message: insertError.message };
      }

      return { success: true, inserted: true, id: newUser.id };
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
      // 1. Encontrar a empresa pelo CNPJ
      const digits = String(body.cnpj).replace(/\D/g, '');
      const [companyRows] = await connection.execute(
        "SELECT id FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
        [digits]
      );

      if (!Array.isArray(companyRows) || companyRows.length === 0) {
        return { success: false, message: 'CNPJ não encontrado' };
      }

      const empresaId = companyRows[0].id;

      // 2. Verificar se já existe usuário com (email, empresa_id)
      const loginEmail = String(body.email || '').trim().toUpperCase();
      const [existingRows]: any = await connection.execute(
        'SELECT id FROM usuarios WHERE email = ? AND empresa_id = ? LIMIT 1',
        [loginEmail, empresaId]
      );
      if (Array.isArray(existingRows) && existingRows.length > 0) {
        return { success: true, alreadyExists: true, id: existingRows[0].id };
      }

      // 3. Inserir o novo usuário se não existir
      const [result] = await connection.execute(
        'INSERT INTO usuarios (email, empresa_id) VALUES (?, ?)',
        [loginEmail, empresaId]
      );
      return { success: true, inserted: true, id: (result as any)?.insertId };
    } catch (error: any) {
      return { success: false, message: error.message };
    } finally {
      await connection.end();
    }
    */

    return { success: false, message: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});