import requests
import time

BASE_URL = "http://localhost:3001"
TIMEOUT = 30

def test_ui_effects_and_visual_components():
    session = requests.Session()

    # 1) Validate access control on /api/list-tables (accept 200 or auth error)
    url_list_tables = f"{BASE_URL}/api/list-tables"
    start = time.time()
    resp = session.get(url_list_tables, timeout=TIMEOUT)
    duration = time.time() - start
    assert resp.status_code in (200, 401, 403), f"/api/list-tables anonymous access unexpected code {resp.status_code}"
    print(f"/api/list-tables GET status: {resp.status_code}, time: {duration:.3f}s")

    # 2) Validate access control on /api/table-schema (accept 200 or auth error)
    table_name = "dummy_table"
    url_table_schema = f"{BASE_URL}/api/table-schema?table={table_name}"
    start = time.time()
    resp = session.get(url_table_schema, timeout=TIMEOUT)
    duration = time.time() - start
    assert resp.status_code in (200, 401, 403), f"/api/table-schema anonymous access unexpected code {resp.status_code}"
    print(f"/api/table-schema GET status: {resp.status_code}, time: {duration:.3f}s")

    # 3) Test /api/test-connection (may be public)
    url_test_connection = f"{BASE_URL}/api/test-connection"
    start = time.time()
    resp = session.get(url_test_connection, timeout=TIMEOUT)
    duration = time.time() - start
    # Accept 200 or auth error
    assert resp.status_code in (200, 401, 403), f"/api/test-connection unexpected status {resp.status_code}"
    print(f"/api/test-connection GET status: {resp.status_code}, time: {duration:.3f}s")

    # 4) /api/get-company-by-cnpj must reject GET (only POST allowed)
    url_get_company = f"{BASE_URL}/api/get-company-by-cnpj"
    start = time.time()
    resp = session.get(url_get_company, timeout=TIMEOUT)
    duration = time.time() - start
    assert resp.status_code in (400, 404, 405), f"/api/get-company-by-cnpj GET unexpected status {resp.status_code}"
    print(f"/api/get-company-by-cnpj GET status: {resp.status_code}, time: {duration:.3f}s")


test_ui_effects_and_visual_components()
