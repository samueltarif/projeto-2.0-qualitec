import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_api_security_and_access_controls():
    headers_json = {"Accept": "application/json"}
    headers_pdf = {"Content-Type": "application/pdf", "Accept": "*/*"}

    # 1. Test GET /api/produtos endpoints without authentication
    produtos_get_paths = [
        "/api/produtos/search",
        "/api/produtos/distinct",
        "/api/produtos/facet-counts",
        "/api/produtos/details",
        "/api/produtos/get-by-ids"
    ]
    for path in produtos_get_paths:
        start = time.time()
        resp = requests.get(f"{BASE_URL}{path}", headers=headers_json, timeout=TIMEOUT)
        duration = time.time() - start
        # Product GET endpoints are public per PRD, so 200 is allowed
        assert resp.status_code in [200, 401, 403], f"{path} unexpected status {resp.status_code}"
        # Time to respond should be under 5 seconds
        assert duration < 5, f"{path} response time too long: {duration}s"

    # 2. Test POST /api/download-order Content-Type application/pdf without auth (expect 401/403 or 200)
    pdf_dummy_payload = b"%PDF-1.4\n%Dummy PDF content\n%%EOF\n"
    start = time.time()
    resp = requests.post(f"{BASE_URL}/api/download-order", headers=headers_pdf, data=pdf_dummy_payload, timeout=TIMEOUT)
    duration = time.time() - start
    assert resp.status_code in [200, 401, 403], f"/api/download-order allowed unauthorized access with status {resp.status_code}"
    assert duration < 5, f"/api/download-order response time too long: {duration}s"

    # 3. Test POST /api/send-email (mock, no real creds) without auth, expect unauthorized or rejection
    email_payload = {
        "to": "test@example.com",
        "subject": "Test Email",
        "body": "This is a test email"
    }
    start = time.time()
    resp = requests.post(f"{BASE_URL}/api/send-email", headers={"Content-Type": "application/json"}, json=email_payload, timeout=TIMEOUT)
    duration = time.time() - start
    assert resp.status_code in [401, 403], f"/api/send-email allowed unauthorized access with status {resp.status_code}"
    assert duration < 5, f"/api/send-email response time too long: {duration}s"

    # 4. Test POST /api/login with invalid and empty credentials expect 400 or 401
    login_payloads = [
        {},
        {"username": "", "password": ""},
        {"username": "nonexistent", "password": "wrongpass"}
    ]
    for payload in login_payloads:
        resp = requests.post(f"{BASE_URL}/api/login", headers={"Content-Type": "application/json"}, json=payload, timeout=TIMEOUT)
        assert resp.status_code in [400, 401], f"/api/login accepted invalid credentials {payload} with status {resp.status_code}"

    # 5. Test POST /api/register-user with missing/invalid data expect 400
    invalid_user_payloads = [
        {},
        {"email": "invalid", "password": "123"},
        {"email": "user@example.com"},  # missing password
    ]
    for payload in invalid_user_payloads:
        resp = requests.post(f"{BASE_URL}/api/register-user", headers={"Content-Type": "application/json"}, json=payload, timeout=TIMEOUT)
        assert resp.status_code == 400, f"/api/register-user accepted invalid payload {payload} with status {resp.status_code}"

    # 6. Test POST /api/register-company with missing/invalid data expect 400
    invalid_company_payloads = [
        {},
        {"cnpj": "invalidcnpj"},
        {"cnpj": "12345678901234"}  # invalid format or missing fields
    ]
    for payload in invalid_company_payloads:
        resp = requests.post(f"{BASE_URL}/api/register-company", headers={"Content-Type": "application/json"}, json=payload, timeout=TIMEOUT)
        assert resp.status_code == 400, f"/api/register-company accepted invalid payload {payload} with status {resp.status_code}"

    # 7. Test GET /api/get-company-by-cnpj with valid and invalid CNPJs (mock invalid ones)
    valid_cnpj = "12345678000195"  # example valid CNPJ format
    invalid_cnpjs = ["", "invalidcnpj", "00000000000000"]

    # Valid CNPJ - as anonymous should return 401 or 403 or 404 if not authorized
    resp = requests.get(f"{BASE_URL}/api/get-company-by-cnpj?cnpj={valid_cnpj}", headers=headers_json, timeout=TIMEOUT)
    assert resp.status_code in [401, 403, 404], f"/api/get-company-by-cnpj allowed unauthorized access or unexpected {resp.status_code}"

    # Invalid CNPJs should return 400 or 404 but never leak data
    for cnpj in invalid_cnpjs:
        resp = requests.get(f"{BASE_URL}/api/get-company-by-cnpj?cnpj={cnpj}", headers=headers_json, timeout=TIMEOUT)
        assert resp.status_code in [400, 404], f"/api/get-company-by-cnpj returned unexpected status {resp.status_code} for CNPJ {cnpj}"

    # 8. Test GET /api/list-tables without auth expect 401 or 403
    resp = requests.get(f"{BASE_URL}/api/list-tables", headers=headers_json, timeout=TIMEOUT)
    assert resp.status_code in [401, 403], f"/api/list-tables allowed unauthorized access with status {resp.status_code}"

    # 9. Test GET /api/table-schema without auth expect 401 or 403
    resp = requests.get(f"{BASE_URL}/api/table-schema", headers=headers_json, timeout=TIMEOUT)
    assert resp.status_code in [401, 403], f"/api/table-schema allowed unauthorized access with status {resp.status_code}"

    # 10. Test GET /api/test-connection without auth expect 401 or 403 or 200 (if public)
    resp = requests.get(f"{BASE_URL}/api/test-connection", headers=headers_json, timeout=TIMEOUT)
    # This endpoint might be public health check: accept 200 or auth error
    assert resp.status_code in [200, 401, 403], f"/api/test-connection returned unexpected status {resp.status_code}"
    # If data returned, response time should be < 1s
    if resp.status_code == 200:
        assert resp.elapsed.total_seconds() < 1, f"/api/test-connection took too long: {resp.elapsed.total_seconds()}s"

    print("test_api_security_and_access_controls passed.")

test_api_security_and_access_controls()
