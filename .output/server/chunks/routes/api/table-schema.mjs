import { c as defineEventHandler, u as useRuntimeConfig, g as getQuery, h as getHeader, i as setResponseStatus } from '../../_/nitro.mjs';
import { createConnection } from 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const tableSchema = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { tableName } = getQuery(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: "forbidden" };
  }
  if (!tableName) {
    return { error: "O nome da tabela \xE9 obrigat\xF3rio" };
  }
  const safeName = String(tableName).trim();
  if (!/^[A-Za-z0-9_]+$/.test(safeName)) {
    setResponseStatus(event, 400);
    return { error: "invalid_table_name" };
  }
  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    });
    const [rows] = await connection.execute(`DESCRIBE ${safeName}`);
    await connection.end();
    return { schema: rows };
  } catch (error) {
    return { error: error.message };
  }
});

export { tableSchema as default };
//# sourceMappingURL=table-schema.mjs.map
