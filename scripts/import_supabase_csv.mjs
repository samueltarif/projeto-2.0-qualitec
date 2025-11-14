import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY
if (!url || !key) {
  console.error('Faltam SUPABASE_URL e SUPABASE_SERVICE_KEY/KEY no ambiente')
  process.exit(1)
}
const supabase = createClient(url, key)

const inputPath = process.argv[2] || path.join(process.cwd(), 'tabela manometros.csv')
if (!fs.existsSync(inputPath)) {
  console.error(`Arquivo não encontrado: ${inputPath}`)
  process.exit(1)
}

const text = fs.readFileSync(inputPath, 'utf-8')
const records = parse(text, { columns: true, delimiter: ';', skip_empty_lines: true, bom: true })

const norm = (s) => (s == null ? '' : String(s).trim())
const toBool = (v) => {
  const s = norm(v).toLowerCase()
  if (!s) return null
  if (['sim', 's', 'true', '1', 'yes', 'y', 'com'].includes(s)) return true
  if (['nao', 'não', 'n', 'false', '0', 'no', 'sem'].includes(s)) return false
  return null
}
const toInt = (v) => {
  const s = norm(v)
  if (!s) return null
  const m = s.replace(/[^\d-]/g, '')
  return m ? Number.parseInt(m, 10) : null
}
const toDec = (v) => {
  const s = norm(v)
  if (!s) return null
  const m = s.replace(/[^\d,.-]/g, '').replace(',', '.')
  const n = Number.parseFloat(m)
  return Number.isFinite(n) ? n : null
}
const toJsonArr = (v) => {
  const s = norm(v)
  if (!s) return null
  const parts = s.split(/[,;/]/).map((t) => t.trim()).filter(Boolean)
  return parts.length ? parts : null
}

const mapRow = (r) => ({
  categoria: norm(r['CATEGORIA']),
  codigo_erp: norm(r['CÓDIGO ERP'] || r['CODIGO ERP']),
  part_number: norm(r['PART NUMBER']),
  fabricante: norm(r['FABRICANTE']),
  diametro_montagem: norm(r['DIÂMETRO DE MONTAGEM'] || r['DIAMETRO DE MONTAGEM']),
  posicao_montagem: norm(r['POSIÇÃO DE MONTAGEM'] || r['POSICAO DE MONTAGEM']),
  conexao_instrumento: norm(r['CONEXÃO DO INSTRUMENTO'] || r['CONEXAO DO INSTRUMENTO']),
  material_involucro: norm(r['MATERIAL DO INVÓLUCRO'] || r['MATERIAL DO INVOLUCRO']),
  material_internos: norm(r['MATERIAL DOS INTERNOS']),
  visor: norm(r['VISOR']),
  classe_exatidao: norm(r['CLASSE DE EXATIDÃO'] || r['CLASSE DE EXATIDAO']),
  unidade_leitura: norm(r['UNIDADE DE LEITURA']),
  faixa_trabalho: norm(r['FAIXA DE TRABALHO']),
  glicerina: toBool(r['ENCHIMENTO DE GLICERINA'] || r['GLICERINA']),
  tubo_sifao: toBool(r['TUBO SIFÃO'] || r['TUBO SIFAO']),
  selo_diafragma: toBool(r['SELO DIAFRAGMA']),
  contato_eletrico: toBool(r['CONTATO ELÉTRICO'] || r['CONTATO ELETRICO']),
  valvula_isolamento: toBool(r['VÁLVULA DE ISOLAMENTO'] || r['VALVULA DE ISOLAMENTO']),
  ncm: norm(r['NCM']),
  estoque: toInt(r['ESTOQUE']),
  preco: toDec(r['PREÇO'] || r['PRECO']),
  imagens: toJsonArr(r['IMAGENS']),
  ativo: true,
})

async function getTableColumns() {
  try {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'produtos')
    if (error) return null
    return new Set((data || []).map((d) => d.column_name))
  } catch {
    return null
  }
}

const baseItems = records.map(mapRow).filter((p) => p.part_number)
const allowed = await getTableColumns()
const items = allowed
  ? baseItems.map((obj) => Object.fromEntries(Object.entries(obj).filter(([k]) => allowed.has(k))))
  : baseItems

const chunks = []
const size = 500
for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))

async function upsertChunk(chunk) {
  try {
    const { error } = await supabase
      .from('produtos')
      .upsert(chunk, { onConflict: 'part_number' })
    if (error) throw error
  } catch (e) {
    const msg = String(e?.message || '')
    if (msg.includes('no unique or exclusion constraint')) {
      const { error } = await supabase.from('produtos').insert(chunk)
      if (error) throw error
      return
    }
    if (msg.includes("'certificados'")) {
      const sans = chunk.map(({ certificados, ...rest }) => rest)
      const { error } = await supabase
        .from('produtos')
        .upsert(sans, { onConflict: 'part_number' })
      if (error) throw error
      return
    }
    throw e
  }
}

(async () => {
  try {
    for (const c of chunks) {
      await upsertChunk(c)
      process.stdout.write('.')
    }
    console.log(`\nImportados: ${items.length}`)
  } catch (err) {
    console.error(err?.message || String(err))
    process.exit(1)
  }
})()