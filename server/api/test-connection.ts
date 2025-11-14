import { createClient } from '@supabase/supabase-js';
import mysql from 'mysql2/promise';
import { getHeader, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const adminKey = String((config as any)?.adminKey || '');
  const headerKey = String(getHeader(event, 'x-admin-key') || '');
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { message: 'forbidden' };
  }

  // Testa Supabase primeiro (para testes)
  if (config.supabaseUrl && config.supabaseKey) {
    try {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase
        .from('empresas')
        .select('id')
        .limit(1);
      
      if (!error) {
        return { message: 'Conexão com o Supabase bem-sucedida!' };
      }
      return { message: 'Falha na conexão com o Supabase.', error };
    } catch (error) {
      console.error('Erro ao conectar com o Supabase:', error);
      return { message: 'Falha na conexão com o Supabase.', error };
    }
  }

  /*
  // CÓDIGO MYSQL PARA PRODUÇÃO (comentado)
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    await connection.connect();
    await connection.end();

    return { message: 'Conexão com o MySQL bem-sucedida!' };
  } catch (error) {
    console.error('Erro ao conectar com o MySQL:', error);
    return { message: 'Falha na conexão com o MySQL.', error };
  }
  */

  return { message: 'Nenhum backend de dados configurado.' };
});