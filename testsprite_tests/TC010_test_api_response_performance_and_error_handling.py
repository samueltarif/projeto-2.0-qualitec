import requests
import time
from io import BytesIO

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
MAX_RESPONSE_TIME = 1  # seconds

def test_api_response_performance_and_error_handling():
    session = requests.Session()
    headers_json = {"Accept": "application/json"}
    headers_pdf = {"Content-Type": "application/pdf", "Accept": "application/json"}

    # Helper function to measure response and assert time and status codes
    def assert_response(response, expected_statuses, max_time=MAX_RESPONSE_TIME):
        elapsed = response.elapsed.total_seconds()
        assert elapsed < max_time or (response.status_code not in expected_statuses), f"Response time {elapsed}s exceeded max {max_time}s"
        assert response.status_code in expected_statuses, f"Unexpected status code: {response.status_code}, body: {response.text}"

    # ========== Test GET /api/produtos/search ==========
    params = {"q": "produto"}  # example search param
    try:
        resp = session.get(f"{BASE_URL}/api/produtos/search", params=params, headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            # Expecting dict response (e.g. {results: [...], metadata: ...}), not just list
            assert isinstance(data, dict)
    except requests.RequestException as e:
        assert False, f"GET /api/produtos/search request failed: {e}"

    # ========== Test GET /api/produtos/distinct ==========
    try:
        resp = session.get(f"{BASE_URL}/api/produtos/distinct", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert isinstance(data, dict)
    except requests.RequestException as e:
        assert False, f"GET /api/produtos/distinct request failed: {e}"

    # ========== Test GET /api/produtos/facet-counts ==========
    try:
        resp = session.get(f"{BASE_URL}/api/produtos/facet-counts", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert isinstance(data, dict)
    except requests.RequestException as e:
        assert False, f"GET /api/produtos/facet-counts request failed: {e}"

    # ========== Test GET /api/produtos/details ==========
    try:
        resp = session.get(f"{BASE_URL}/api/produtos/details", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert isinstance(data, dict) or isinstance(data, list)
    except requests.RequestException as e:
        assert False, f"GET /api/produtos/details request failed: {e}"

    # ========== Test GET /api/produtos/get-by-ids ==========
    # We need to create a product or get existing ids (simulate with empty or error scenario)
    try:
        # Test with empty IDs (should error 400 or 404 or 200 with error message)
        resp = session.get(f"{BASE_URL}/api/produtos/get-by-ids", params={"ids": ""}, headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 404])
        if resp.status_code == 200:
            data = resp.json()
            assert "error" in data, "Expected error message for empty ids"
    except requests.RequestException as e:
        assert False, f"GET /api/produtos/get-by-ids request failed: {e}"

    # ========== Test POST /api/download-order (PDF generation) ==========
    pdf_content = b"%PDF-1.4 Fake PDF content for tests"
    try:
        resp = session.post(f"{BASE_URL}/api/download-order", data=pdf_content, headers=headers_pdf, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 500, 503])
        if resp.status_code == 200:
            assert "application/pdf" in resp.headers.get("Content-Type",""), "Expected PDF response"
    except requests.RequestException as e:
        assert False, f"POST /api/download-order request failed: {e}"

    # ========== Test POST /api/send-email (mocked, no real credentials) ==========
    # Email body with minimal valid data, no real credentials, expect 200 or error handled
    email_payload = {
        "to": "test@example.com",
        "subject": "Test Email",
        "body": "This is a test email.",
        "attachment": None
    }
    try:
        resp = session.post(f"{BASE_URL}/api/send-email", json=email_payload, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 401, 500, 503])
    except requests.RequestException as e:
        assert False, f"POST /api/send-email request failed: {e}"

    # ========== Test POST /api/login ==========
    login_payload = {"email": "invalid@example.com", "password": "wrongpass"}
    try:
        resp = session.post(f"{BASE_URL}/api/login", json=login_payload, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 401, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert "token" in data or "error" in data
    except requests.RequestException as e:
        assert False, f"POST /api/login request failed: {e}"

    # ========== Test POST /api/register-user ==========
    user_reg_payload = {
        "email": "testuser@example.com",
        "password": "ComplexPass!2",
        "name": "Test User"
    }
    try:
        resp = session.post(f"{BASE_URL}/api/register-user", json=user_reg_payload, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 409, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert "id" in data or "error" in data
    except requests.RequestException as e:
        assert False, f"POST /api/register-user request failed: {e}"

    # ========== Test POST /api/register-company ==========
    company_reg_payload = {
        "cnpj": "12345678000100",
        "name": "Test Company",
        "address": "123 Test St"
    }
    try:
        resp = session.post(f"{BASE_URL}/api/register-company", json=company_reg_payload, headers={"Content-Type": "application/json"}, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 409, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert "id" in data or "error" in data
    except requests.RequestException as e:
        assert False, f"POST /api/register-company request failed: {e}"

    # ========== Test GET /api/get-company-by-cnpj (valid CNPJ) ==========
    valid_cnpj = "12345678000100"
    try:
        resp = session.get(f"{BASE_URL}/api/get-company-by-cnpj", params={"cnpj": valid_cnpj}, headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 404, 400, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert "cnpj" in data and data["cnpj"] == valid_cnpj
    except requests.RequestException as e:
        assert False, f"GET /api/get-company-by-cnpj valid request failed: {e}"

    # ========== Test GET /api/get-company-by-cnpj (invalid CNPJ) ==========
    invalid_cnpj = "00000000000000"
    try:
        resp = session.get(f"{BASE_URL}/api/get-company-by-cnpj", params={"cnpj": invalid_cnpj}, headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [404, 400, 500, 503])
    except requests.RequestException as e:
        assert False, f"GET /api/get-company-by-cnpj invalid request failed: {e}"

    # ========== Test GET /api/list-tables ==========
    try:
        resp = session.get(f"{BASE_URL}/api/list-tables", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert isinstance(data, list)
    except requests.RequestException as e:
        assert False, f"GET /api/list-tables request failed: {e}"

    # ========== Test GET /api/table-schema ==========
    try:
        resp = session.get(f"{BASE_URL}/api/table-schema", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 400, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert isinstance(data, dict)
    except requests.RequestException as e:
        assert False, f"GET /api/table-schema request failed: {e}"

    # ========== Test GET /api/test-connection ==========
    try:
        resp = session.get(f"{BASE_URL}/api/test-connection", headers=headers_json, timeout=TIMEOUT)
        assert_response(resp, [200, 500, 503])
        if resp.status_code == 200:
            data = resp.json()
            assert "status" in data
            assert data["status"].lower() in ("ok", "success", "connected")
    except requests.RequestException as e:
        assert False, f"GET /api/test-connection request failed: {e}"

test_api_response_performance_and_error_handling()
