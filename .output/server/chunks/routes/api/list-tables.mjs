import { c as defineEventHandler, u as useRuntimeConfig, h as getHeader, i as setResponseStatus } from '../../_/nitro.mjs';
import { createConnection } from 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const listTables = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: "forbidden" };
  }
  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    });
    const [rows] = await connection.execute("SHOW TABLES");
    await connection.end();
    return { tables: rows };
  } catch (error) {
    return { error: error.message };
  }
});

export { listTables as default };
//# sourceMappingURL=list-tables.mjs.map
