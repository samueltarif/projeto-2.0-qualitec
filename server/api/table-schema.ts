import { createConnection } from 'mysql2/promise';
import { getHeader, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { tableName } = getQuery(event);

  const adminKey = String((config as any)?.adminKey || '');
  const headerKey = String(getHeader(event, 'x-admin-key') || '');
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: 'forbidden' };
  }

  if (!tableName) {
    return { error: 'O nome da tabela é obrigatório' };
  }

  const safeName = String(tableName).trim();
  if (!/^[A-Za-z0-9_]+$/.test(safeName)) {
    setResponseStatus(event, 400);
    return { error: 'invalid_table_name' };
  }

  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
    });

    const [rows] = await connection.execute(`DESCRIBE ${safeName}`);
    await connection.end();

    return { schema: rows };
  } catch (error: any) {
    return { error: error.message };
  }
});