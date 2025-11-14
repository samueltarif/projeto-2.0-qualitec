import { defineEventHandler, readBody } from 'h3';
import mysql from 'mysql2/promise';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  try {
    // Valida CNPJ
    const digits = String(body.cnpj).replace(/\D/g, '');
    if (digits.length !== 14) {
      return { success: false, message: 'CNPJ inválido. Informe 14 dígitos.' };
    }
    const maskedCnpj = `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}-${digits.slice(12,14)}`;
    const digitsOnly = digits; // para uso na validação

    // Tenta Supabase primeiro (se configurado)
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      // Verifica se CNPJ já existe (com ou sem formatação)
      const { data: existingCompany } = await supabase
        .from('empresas')
        .select('id, cnpj')
        .or(`cnpj.eq.${maskedCnpj},cnpj.eq.${digitsOnly}`)
        .single();

      if (existingCompany) {
        return { success: false, message: 'CNPJ já cadastrado no sistema.' };
      }
      
      const { data, error } = await supabase
        .from('empresas')
        .insert({
          cnpj: maskedCnpj,
          razao_social: body.razao_social?.toUpperCase(),
          email: body.email,
          filial: body.filial?.toUpperCase()
        })
        .select()
        .single();

      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, result: data };
    }

    // Fallback para MySQL (se configurado)
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });

      try {
        // Verifica se CNPJ já existe no MySQL
        const [existingRows] = await connection.execute(
          'SELECT id FROM empresas WHERE cnpj = ? OR cnpj = ?',
          [maskedCnpj, digitsOnly]
        );
        
        if (Array.isArray(existingRows) && existingRows.length > 0) {
          return { success: false, message: 'CNPJ já cadastrado no sistema.' };
        }

        const [result] = await connection.execute(
          'INSERT INTO empresas (cnpj, razao_social, email, filial) VALUES (?, ?, ?, ?)',
          [maskedCnpj, body.razao_social?.toUpperCase(), body.email, body.filial?.toUpperCase()]
        );
        return { success: true, result };
      } finally {
        await connection.end();
      }
    }

    return { success: false, message: 'Backend de dados não configurado.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});