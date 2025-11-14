import mysql from 'mysql2/promise';
import { existsSync, readFileSync } from 'fs';

function loadEnv() {
  if (existsSync('.env')) {
    const raw = readFileSync('.env', 'utf8');
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
}

async function main() {
  loadEnv();
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_DATABASE || 'qualitec_catalogos';

  const conn = await mysql.createConnection({ host, user, password, database });
  try {
    const cols = ['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'];
    for (const col of cols) {
      const [rows] = await conn.query(`SELECT ${col} AS val, COUNT(*) AS cnt FROM produtos GROUP BY ${col} ORDER BY ${col} ASC`);
      console.log(`Column: ${col}`);
      for (const r of rows) {
        console.log(`  ${r.val} => ${r.cnt}`);
      }
    }
  } finally {
    await conn.end();
  }
}

main().catch(e => { console.error(e); process.exit(1); });