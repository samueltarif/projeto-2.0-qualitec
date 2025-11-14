import mysql from 'mysql2/promise';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

function getArg(name, def) {
  const idx = process.argv.indexOf(name);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return def;
}

async function loadEnvFile() {
  try {
    const envPath = path.resolve('.env');
    if (existsSync(envPath)) {
      const raw = await readFile(envPath, 'utf8');
      raw.split(/\r?\n/).forEach(line => {
        const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
        if (m) {
          const key = m[1];
          let val = m[2].trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
            val = val.slice(1, -1);
          }
          if (key && typeof process.env[key] === 'undefined') {
            process.env[key] = val;
          }
        }
      });
    }
  } catch {}
}

async function main() {
  await loadEnvFile();

  const host = getArg('--host', process.env.DB_HOST || 'localhost');
  const user = getArg('--user', process.env.DB_USER || 'root');
  const password = getArg('--password', process.env.DB_PASSWORD || '');
  const database = getArg('--database', process.env.DB_DATABASE || 'qualitec_catalogos');
  const filePath = getArg('--file', '');

  if (!filePath) {
    throw new Error('Provide --file pointing to a .sql file');
  }

  const absFilePath = path.resolve(filePath);
  const rawSql = await readFile(absFilePath, 'utf8');
  const conn = await mysql.createConnection({ host, user, password, database, multipleStatements: true });
  try {
    await conn.query(rawSql);
    console.log(`✔ Executed SQL from ${filePath} on database '${database}'.`);
  } catch (err) {
    console.error('Run SQL failed:', err instanceof Error ? err.message : err);
    throw err instanceof Error ? err : new Error(String(err));
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});