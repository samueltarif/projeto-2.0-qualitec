import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';

function getArg(flag, fallback) {
  const idx = process.argv.findIndex(a => a === flag || a.startsWith(flag + '='));
  if (idx === -1) return fallback;
  const val = process.argv[idx].includes('=') ? process.argv[idx].split('=')[1] : process.argv[idx + 1];
  return val ?? fallback;
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

function stripSqlComments(sql) {
  return sql
    .split(/\r?\n/)
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');
}

async function main() {
  await loadEnvFile();

  const host = getArg('--host', process.env.DB_HOST || 'localhost');
  const user = getArg('--user', process.env.DB_USER || 'root');
  const password = getArg('--password', process.env.DB_PASSWORD || '');
  const database = getArg('--database', process.env.DB_DATABASE || 'qualitec_catalogos');
  const filePath = getArg('--file', 'db/qualitec_catalogos/produtos.sql');

  if (!database) {
    throw new Error('Database name is required. Use --database or set DB_DATABASE env.');
  }

  const absFilePath = path.resolve(filePath);
  const rawSql = await readFile(absFilePath, 'utf8');
  const cleanSql = stripSqlComments(rawSql).trim();

  if (!cleanSql.toUpperCase().includes('CREATE TABLE')) {
    throw new Error(`No CREATE TABLE statement found in ${absFilePath}`);
  }

  const conn = await mysql.createConnection({ host, user, password, database });
  try {
    await conn.query(cleanSql);
    console.log(`✔ Applied schema from ${filePath} to database '${database}'.`);
  } catch (err) {
    console.error('Apply failed:', err instanceof Error ? err.message : err);
    throw err instanceof Error ? err : new Error(String(err));
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});