import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_user_authentication_and_profile_management():
    session = requests.Session()
    headers_json = {"Content-Type": "application/json"}
    # To store created user and company IDs for cleanup if needed (assuming APIs return them)
    created_user_email = None
    created_company_cnpj = None

    try:
        # 1. Test user registration - successful case
        user_registration_payload = {
            "email": "testuser@example.com",
            "password": "StrongPassw0rd!",
            "name": "Test User"
        }
        start = time.time()
        res = session.post(f"{BASE_URL}/api/register-user", json=user_registration_payload, headers=headers_json, timeout=TIMEOUT)
        duration = time.time() - start
        assert res.status_code == 201 or res.status_code == 200, f"User registration failed with status {res.status_code}"
        created_user_email = user_registration_payload["email"]
        assert duration < 1, f"User registration took too long: {duration}s"
        data = res.json()
        assert "email" in data and data["email"] == created_user_email, "User registration response missing or incorrect 'email' identifier"

        # 2. Test user registration - error cases
        # a) Missing password
        incomplete_payload = {"email": "baduser@example.com"}
        res = session.post(f"{BASE_URL}/api/register-user", json=incomplete_payload, headers=headers_json, timeout=TIMEOUT)
        assert res.status_code == 400, "Expected 400 Bad Request for missing password"

        # b) Weak password
        weak_password_payload = {
            "email": "weakpass@example.com",
            "password": "123",
            "name": "Weak Pass"
        }
        res = session.post(f"{BASE_URL}/api/register-user", json=weak_password_payload, headers=headers_json, timeout=TIMEOUT)
        assert res.status_code in (400, 422), "Expected 400 or 422 for weak password"

        # 3. Test login - successful case
        login_payload = {
            "email": created_user_email,
            "password": user_registration_payload["password"]
        }
        start = time.time()
        res = session.post(f"{BASE_URL}/api/login", json=login_payload, headers=headers_json, timeout=TIMEOUT)
        duration = time.time() - start
        assert res.status_code == 200, f"Login failed with status {res.status_code}"
        assert duration < 1, f"Login took too long: {duration}s"
        login_data = res.json()
        assert "token" in login_data or "access_token" in login_data, "Login response missing auth token"

        auth_token = login_data.get("token") or login_data.get("access_token")
        auth_headers = {**headers_json, "Authorization": f"Bearer {auth_token}"} if auth_token else headers_json

        # 4. Test login - invalid credentials
        bad_login_payload = {
            "email": created_user_email,
            "password": "WrongPassword123!"
        }
        res = session.post(f"{BASE_URL}/api/login", json=bad_login_payload, headers=headers_json, timeout=TIMEOUT)
        assert res.status_code == 401, "Expected 401 Unauthorized on invalid login"

        # 5. Test company registration - successful case

        company_registration_payload = {
            "companyName": "Test Company Ltda",
            "cnpj": "12345678000195",
            "address": "Rua Teste, 123",
            "email": "contact@testcompany.com",
            "phone": "11999999999"
        }
        start = time.time()
        res = session.post(f"{BASE_URL}/api/register-company", json=company_registration_payload, headers=auth_headers, timeout=TIMEOUT)
        duration = time.time() - start
        assert res.status_code == 201 or res.status_code == 200, f"Company registration failed with status {res.status_code}"
        created_company_cnpj = company_registration_payload["cnpj"]
        assert duration < 1, f"Company registration took too long: {duration}s"
        company_data = res.json()
        assert "id" in company_data or "cnpj" in company_data, "Company registration response missing identifiers"

        # 6. Test company registration - error cases
        # a) Missing CNPJ
        incomplete_company = {
            "companyName": "No CNPJ Company"
        }
        res = session.post(f"{BASE_URL}/api/register-company", json=incomplete_company, headers=auth_headers, timeout=TIMEOUT)
        assert res.status_code == 400, "Expected 400 Bad Request for missing CNPJ"

        # b) Invalid CNPJ format
        invalid_cnpj_payload = {
            "companyName": "Invalid CNPJ Co",
            "cnpj": "invalidcnpj",
            "email": "invalid@example.com"
        }
        res = session.post(f"{BASE_URL}/api/register-company", json=invalid_cnpj_payload, headers=auth_headers, timeout=TIMEOUT)
        assert res.status_code in (400, 422), "Expected 400 or 422 for invalid CNPJ"

        # 7. Test GET company by CNPJ - valid CNPJ
        if created_company_cnpj:
            start = time.time()
            res = session.get(f"{BASE_URL}/api/get-company-by-cnpj", params={"cnpj": created_company_cnpj}, headers=auth_headers, timeout=TIMEOUT)
            duration = time.time() - start
            assert res.status_code == 200, f"GET company by CNPJ failed with status {res.status_code}"
            assert duration < 1, f"GET company by CNPJ took too long: {duration}s"
            company_info = res.json()
            assert company_info.get("cnpj") == created_company_cnpj, "Returned company data mismatch"

        # 8. Test GET company by CNPJ - invalid CNPJ
        invalid_cnpjs = ["00000000000000", "invalidcnpj", "123"]
        for invalid_cnpj in invalid_cnpjs:
            res = session.get(f"{BASE_URL}/api/get-company-by-cnpj", params={"cnpj": invalid_cnpj}, headers=auth_headers, timeout=TIMEOUT)
            # Accept 400, 404 or 422 depending on implementation
            assert res.status_code in (400, 404, 422), f"Unexpected status {res.status_code} for invalid CNPJ {invalid_cnpj}"

    finally:
        # Cleanup: delete created user and company if API supports delete - assuming endpoints /api/delete-user and /api/delete-company for cleanup exist
        # If cleanup endpoints do not exist, skip cleanup to avoid side effects.
        try:
            if created_user_email:
                session.delete(f"{BASE_URL}/api/delete-user", json={"email": created_user_email}, headers=auth_headers, timeout=TIMEOUT)
        except Exception:
            pass
        try:
            if created_company_cnpj:
                session.delete(f"{BASE_URL}/api/delete-company", json={"cnpj": created_company_cnpj}, headers=auth_headers, timeout=TIMEOUT)
        except Exception:
            pass

test_user_authentication_and_profile_management()
