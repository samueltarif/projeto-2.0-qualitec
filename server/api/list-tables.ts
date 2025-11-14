import { createConnection } from 'mysql2/promise';
import { getHeader, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const adminKey = String((config as any)?.adminKey || '');
  const headerKey = String(getHeader(event, 'x-admin-key') || '');
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: 'forbidden' };
  }

  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
    });

    const [rows] = await connection.execute('SHOW TABLES');
    await connection.end();

    return { tables: rows };
  } catch (error: any) {
    return { error: error.message };
  }
});