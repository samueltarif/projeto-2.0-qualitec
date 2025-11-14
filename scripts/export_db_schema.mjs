import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';

function getArg(flag, fallback) {
  const idx = process.argv.findIndex(a => a === flag || a.startsWith(flag + '='));
  if (idx === -1) return fallback;
  const val = process.argv[idx].includes('=') ? process.argv[idx].split('=')[1] : process.argv[idx + 1];
  return val ?? fallback;
}

async function main() {
  // Try to read .env to populate DB_* if present
  try {
    const envPath = path.resolve('.env');
    if (existsSync(envPath)) {
      const raw = await readFile(envPath, 'utf8');
      raw.split(/\r?\n/).forEach(line => {
        const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
        if (m) {
          const key = m[1];
          let val = m[2].trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (key && typeof process.env[key] === 'undefined') {
            process.env[key] = val;
          }
        }
      });
    }
  } catch (e) {
    // ignore .env parse errors, fallback to process.env only
  }

  const host = getArg('--host', process.env.DB_HOST || 'localhost');
  const user = getArg('--user', process.env.DB_USER || 'root');
  const password = getArg('--password', process.env.DB_PASSWORD || '');
  const database = getArg('--database', process.env.DB_DATABASE || 'qualitec_catalogos');

  if (!database) {
    throw new Error('Database name is required. Use --database or set DB_DATABASE env.');
  }

  const outDir = path.resolve('db', database);
  if (!existsSync(outDir)) {
    await mkdir(outDir, { recursive: true });
  }

  const conn = await mysql.createConnection({ host, user, password, database });
  try {
    const [rows] = await conn.query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
    const tableKey = `Tables_in_${database}`;
    const tables = rows.map(r => r[tableKey]);

    for (const table of tables) {
      const [createRows] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
      const createSql = createRows[0]['Create Table'];
      const fileSql = `-- Schema export for table: ${table}\n-- Database: ${database}\n\nDROP TABLE IF EXISTS \`${table}\`;\n\n${createSql};\n`;
      const filePath = path.join(outDir, `${table}.sql`);
      await writeFile(filePath, fileSql, 'utf8');
      console.log(`✔ Wrote ${filePath}`);
    }

    console.log(`\nExport completed. Files in: ${outDir}`);
  } catch (err) {
    console.error('Export failed:', err instanceof Error ? err.message : err);
    throw err instanceof Error ? err : new Error(String(err));
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});