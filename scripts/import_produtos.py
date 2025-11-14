#!/usr/bin/env python3
"""
Importador de produtos (manômetros) a partir de um CSV para MySQL.

Funcionalidades:
- Lê credenciais do banco de dados do arquivo .env (DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE)
- Valida a ordem e mapeamento dos cabeçalhos do CSV contra as colunas da tabela `produtos`
- Converte valores (booleanos, JSON, números) e trata campos em branco
- Insere/atualiza (ON DUPLICATE KEY UPDATE) baseado em chaves únicas (part_number, codigo_erp)

Uso:
    python scripts/import_produtos.py --file "tabela manometros.csv" --delimiter ";" --encoding "utf-8-sig"

Dependências:
- mysql-connector-python (pip install mysql-connector-python)

Observações:
- Campos em branco do CSV não são enviados no INSERT/UPDATE para preservar defaults e permitir preenchimento futuro.
- O script compara a ordem das colunas e informa discrepâncias; usa lista explícita de colunas no INSERT para não depender da ordem física.
"""

import argparse
import csv
import json
import os
import re
import sys
from typing import Dict, List, Optional, Tuple

try:
    import mysql.connector  # type: ignore
except ImportError:
    print("[ERRO] mysql-connector-python não encontrado. Instale com: pip install mysql-connector-python")
    sys.exit(1)


ENV_PATH = os.path.join(os.path.dirname(__file__), '..', '.env')


def load_env(path: str) -> Dict[str, str]:
    env: Dict[str, str] = {}
    if not os.path.exists(path):
        return env
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' not in line:
                continue
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def normalize_header(h: str) -> str:
    return re.sub(r"\s+", " ", h.strip()).upper()


# Mapeamento CSV -> colunas da tabela produtos
HEADER_TO_DB = {
    "CATEGORIA": "categoria",
    "CÓDIGO ERP": "codigo_erp",
    "CODIGO ERP": "codigo_erp",
    "PART NUMBER": "part_number",
    "FABRICANTE": "fabricante",
    "TIPO DE MEDIÇÃO": "tipo_medicao",
    "TIPO DE MEDICAO": "tipo_medicao",
    "DIÂMETRO DE MONTAGEM": "diametro_montagem",
    "DIAMETRO DE MONTAGEM": "diametro_montagem",
    "POSIÇÃO DE MONTAGEM": "posicao_montagem",
    "POSICAO DE MONTAGEM": "posicao_montagem",
    "CONEXÃO DO INSTRUMENTO": "conexao_instrumento",
    "CONEXAO DO INSTRUMENTO": "conexao_instrumento",
    "MATERIAL DO INVÓLUCRO": "material_involucro",
    "MATERIAL DO INVOLUCRO": "material_involucro",
    "MATERIAL DOS INTERNOS": "material_internos",
    "VISOR": "visor",
    "CLASSE DE EXATIDÃO": "classe_exatidao",
    "CLASSE DE EXATIDAO": "classe_exatidao",
    "UNIDADE DE LEITURA": "unidade_leitura",
    "FAIXA DE TRABALHO": "faixa_trabalho",
    "ENCHIMENTO DE GLICERINA": "glicerina",
    "GLICERINA": "glicerina",
    "CERTIFICADOS": "certificados",
    "TUBO SIFÃO": "tubo_sifao",
    "TUBO SIFAO": "tubo_sifao",
    "SELO DIAFRAGMA": "selo_diafragma",
    "CONTATO ELÉTRICO": "contato_eletrico",
    "CONTATO ELETRICO": "contato_eletrico",
    "VÁLVULA DE ISOLAMENTO": "valvula_isolamento",
    "VALVULA DE ISOLAMENTO": "valvula_isolamento",
    "NCM": "ncm",
    "ESTOQUE": "estoque",
    "PREÇO": "preco",
    "PRECO": "preco",
    "IMAGENS": "imagens",
}


BOOL_COLUMNS = {"glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"}
JSON_COLUMNS = {"certificados", "imagens"}
NUM_COLUMNS_INT = {"estoque"}
NUM_COLUMNS_DEC = {"preco"}


def to_bool(col: Optional[str], val: Optional[str]) -> Optional[int]:
    if val is None:
        return None
    s = val.strip().lower()
    if not s:
        return None

    positive = {"sim", "s", "true", "1", "yes", "y", "com"}
    negative = {"nao", "não", "n", "false", "0", "no", "sem"}

    # Regras específicas para coluna glicerina:
    if col == "glicerina":
        if "glicerina" in s:
            return 1
        if s.startswith("com"):
            return 1
        if s.startswith("sem"):
            return 0

    if s in positive:
        return 1
    if s in negative:
        return 0
    # Fallback numérico
    if s.isdigit():
        if s == "1":
            return 1
        if s == "0":
            return 0
    return None


def to_json_list(val: Optional[str]) -> Optional[str]:
    if val is None:
        return None
    s = val.strip()
    if not s:
        return None
    # separa por vírgula/; e barra
    tokens = [t.strip() for t in re.split(r"[,;/]", s) if t.strip()]
    try:
        return json.dumps(tokens, ensure_ascii=False)
    except Exception:
        return json.dumps([s], ensure_ascii=False)


def convert_value(col: str, val: Optional[str]):
    if val is None:
        return None
    v = val.strip()
    if v == "":
        return None
    if col in BOOL_COLUMNS:
        return to_bool(col, v)
    if col in JSON_COLUMNS:
        return to_json_list(v)
    if col in NUM_COLUMNS_INT:
        try:
            return int(re.sub(r"[^\d-]", "", v))
        except Exception:
            return None
    if col in NUM_COLUMNS_DEC:
        try:
            # mantém dígitos e ponto/virgula, converte vírgula para ponto
            v2 = re.sub(r"[^\d,.-]", "", v).replace(",", ".")
            return float(v2)
        except Exception:
            return None
    return v


def get_db_columns(conn) -> List[str]:
    cur = conn.cursor()
    cur.execute("DESCRIBE produtos")
    cols = [row[0] for row in cur.fetchall()]
    cur.close()
    return cols


def build_mapping(csv_headers: List[str]) -> List[Tuple[str, str]]:
    mapping: List[Tuple[str, str]] = []
    for h in csv_headers:
        nh = normalize_header(h)
        db_col = HEADER_TO_DB.get(nh)
        if db_col:
            mapping.append((h, db_col))
        else:
            # ignora colunas desconhecidas do CSV
            print(f"[AVISO] Cabeçalho CSV não mapeado: '{h}' (normalizado: '{nh}') — será ignorado.")
    return mapping


def compare_order(mapped_db_cols: List[str], db_cols_order: List[str]) -> None:
    # Colunas relevantes do banco (exclui gerenciadas automaticamente)
    relevant_db_cols = [c for c in db_cols_order if c not in {"id", "ativo", "created_at", "updated_at"}]
    if mapped_db_cols != relevant_db_cols[: len(mapped_db_cols)]:
        print("[INFO] A ordem das colunas do CSV não coincide com a ordem física da tabela.")
        print("       Isso não impede a importação — usaremos lista explícita de colunas no INSERT.")
        print("       CSV->DB:")
        for i, c in enumerate(mapped_db_cols, start=1):
            print(f"       {i:02d}. {c}")
        print("       Ordem atual da tabela (parcial):")
        for i, c in enumerate(relevant_db_cols[: len(mapped_db_cols)], start=1):
            print(f"       {i:02d}. {c}")
    else:
        print("[OK] Ordem das colunas CSV coincide com a ordem da tabela (para colunas mapeadas).")


def upsert_rows(conn, file_path: str, delimiter: str, encoding: str) -> Tuple[int, int, int]:
    inserted = 0
    updated = 0
    skipped = 0

    with open(file_path, 'r', encoding=encoding, newline='') as f:
        reader = csv.reader(f, delimiter=delimiter)
        headers = next(reader)
        mapping = build_mapping(headers)
        mapped_db_cols = [db for _, db in mapping]

        # Valida ordem em relação à tabela
        cur = conn.cursor()
        cur.execute("DESCRIBE produtos")
        db_cols_order = [row[0] for row in cur.fetchall()]
        cur.close()
        compare_order(mapped_db_cols, db_cols_order)

        for row in reader:
            # Constrói pares coluna->valor convertidos, pulando vazios para preservar defaults
            row_values: Dict[str, object] = {}
            for (csv_h, db_c), raw_val in zip(mapping, row):
                cv = convert_value(db_c, raw_val)
                if cv is not None:
                    row_values[db_c] = cv

            if not row_values:
                skipped += 1
                continue

            # Chaves únicas (se presentes) para evitar inserir linhas sem identificação
            has_identity = any(k in row_values for k in ("part_number", "codigo_erp"))
            if not has_identity:
                skipped += 1
                continue

            cols = list(row_values.keys())
            placeholders = ", ".join(["%s"] * len(cols))
            insert_cols = ", ".join(cols)
            update_clause = ", ".join([f"{c}=VALUES({c})" for c in cols])

            sql = f"INSERT INTO produtos ({insert_cols}) VALUES ({placeholders}) ON DUPLICATE KEY UPDATE {update_clause}"
            values = [row_values[c] for c in cols]

            cur = conn.cursor()
            cur.execute(sql, values)
            # rowcount: 1 = insert, 2 = update
            rc = cur.rowcount
            conn.commit()
            cur.close()
            if rc == 1:
                inserted += 1
            elif rc == 2:
                updated += 1
            else:
                # pode ser 0 em alguns casos; contabiliza como atualizado por segurança
                updated += 1

    return inserted, updated, skipped


def main():
    parser = argparse.ArgumentParser(description="Importa produtos de CSV para MySQL")
    parser.add_argument("--file", required=True, help="Caminho do CSV")
    parser.add_argument("--delimiter", default=";", help="Delimitador do CSV (padrão ;) ")
    parser.add_argument("--encoding", default="utf-8-sig", help="Encoding do arquivo (padrão utf-8-sig)")
    args = parser.parse_args()

    env = load_env(ENV_PATH)
    host = env.get("DB_HOST") or os.environ.get("DB_HOST")
    user = env.get("DB_USER") or os.environ.get("DB_USER")
    password = env.get("DB_PASSWORD") or os.environ.get("DB_PASSWORD")
    database = env.get("DB_DATABASE") or os.environ.get("DB_DATABASE")

    if not all([host, user, password, database]):
        print("[ERRO] Variáveis de ambiente DB_* não encontradas. Configure no .env: DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE")
        sys.exit(1)

    try:
        conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            autocommit=False,
        )
    except Exception as e:
        print(f"[ERRO] Falha ao conectar ao MySQL: {e}")
        sys.exit(1)

    try:
        inserted, updated, skipped = upsert_rows(conn, args.file, args.delimiter, args.encoding)
        print(f"[RESUMO] Inseridos: {inserted} | Atualizados: {updated} | Ignorados: {skipped}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()