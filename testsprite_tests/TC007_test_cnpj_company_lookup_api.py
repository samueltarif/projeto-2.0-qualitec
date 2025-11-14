import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
HEADERS_JSON = {"Accept": "application/json", "Content-Type": "application/json"}

def test_cnpj_company_lookup_api():
    valid_cnpj = "00000000000191"  # Example valid CNPJ (mocked or known valid format)
    invalid_cnpj = "12345678901234"  # Invalid format/number
    non_existent_cnpj = "11111111111111"  # Valid format but no company should exist

    url = f"{BASE_URL}/api/get-company-by-cnpj"

    # Test valid CNPJ lookup
    try:
        start = time.time()
        response = requests.post(url, json={"cnpj": valid_cnpj}, headers=HEADERS_JSON, timeout=TIMEOUT)
        duration = time.time() - start

        assert response.status_code == 200, f"Expected 200 OK for valid CNPJ, got {response.status_code}"
        data = response.json()
        assert isinstance(data, dict), "Response JSON is not a dict"
        # Basic sanity checks on company data
        assert "name" in data and data["name"], "Company name missing or empty"
        assert duration < 1, f"Response took too long: {duration}s"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed for valid CNPJ: {str(e)}"
    except ValueError:
        assert False, "Response JSON decoding failed for valid CNPJ"

    # Test invalid CNPJ format
    try:
        start = time.time()
        response = requests.post(url, json={"cnpj": invalid_cnpj}, headers=HEADERS_JSON, timeout=TIMEOUT)
        duration = time.time() - start

        # Expecting error related to bad request for invalid format (400 or 422)
        assert response.status_code in (400, 422), f"Expected 400 or 422 for invalid CNPJ, got {response.status_code}"
        assert duration < 1, f"Response took too long: {duration}s"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed for invalid CNPJ: {str(e)}"

    # Test non-existent but valid format CNPJ
    try:
        start = time.time()
        response = requests.post(url, json={"cnpj": non_existent_cnpj}, headers=HEADERS_JSON, timeout=TIMEOUT)
        duration = time.time() - start

        # Expecting 404 Not Found for non-existent CNPJ
        assert response.status_code == 404, f"Expected 404 for non-existent CNPJ, got {response.status_code}"
        assert duration < 1, f"Response took too long: {duration}s"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed for non-existent CNPJ: {str(e)}"

test_cnpj_company_lookup_api()
