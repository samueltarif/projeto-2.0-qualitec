import { defineEventHandler, getQuery } from 'h3'
import { createClient } from '@supabase/supabase-js'
// import mysql from 'mysql2/promise' // MySQL comentado para produção

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event) as Record<string, any>

  const rawEmail = String(query?.email || '').trim()
  const email = rawEmail.toUpperCase()
  const empresaId = Number(query?.empresaId)

  if (!email || !empresaId || !Number.isFinite(empresaId)) {
    return { success: false, message: 'Parâmetros inválidos: email e empresaId são obrigatórios.' }
  }

  try {
    // Usa Supabase para testes
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      const { data, error } = await supabase
        .from('usuarios')
        .select('full_name, sector, whatsapp')
        .eq('email', email)
        .eq('empresa_id', empresaId)
        .single();

      if (!error && data) {
        return {
          success: true,
          profile: {
            fullName: data?.full_name || '',
            sector: data?.sector || '',
            whatsapp: data?.whatsapp || '',
          }
        };
      }

      return { success: true, profile: null };
    }

    /*
    // CÓDIGO MYSQL PARA PRODUÇÃO (comentado)
    const connection = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
    })

    try {
      const [rows]: any = await connection.execute(
        'SELECT full_name, sector, whatsapp FROM usuarios WHERE email = ? AND empresa_id = ? LIMIT 1',
        [email, empresaId]
      )

      if (Array.isArray(rows) && rows.length > 0) {
        const r = rows[0]
        return {
          success: true,
          profile: {
            fullName: r?.full_name || '',
            sector: r?.sector || '',
            whatsapp: r?.whatsapp || '',
          }
        }
      }

      return { success: true, profile: null }
    } catch (error: any) {
      return { success: false, message: error?.message || 'Erro ao obter perfil.' }
    } finally {
      await connection.end()
    }
    */

    return { success: false, message: 'Backend de dados não configurado.' }
  } catch (error: any) {
    return { success: false, message: error?.message || 'Erro ao obter perfil.' }
  }
})