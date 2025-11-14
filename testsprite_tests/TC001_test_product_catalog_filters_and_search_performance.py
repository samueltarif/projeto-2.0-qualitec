import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
HEADERS = {
    "Accept": "application/json"
}

def test_product_catalog_filters_and_search_performance():
    """
    Verify that the product catalog API endpoint returns filtered and searched results within 1 second
    for a medium dataset, ensuring performance criteria are met.
    Endpoints tested: GET /api/produtos/search, /distinct, /facet-counts, /details, /get-by-ids.
    Also covers error cases and performance.
    """
    endpoints = [
        "/api/produtos/search",
        "/api/produtos/distinct",
        "/api/produtos/facet-counts",
        "/api/produtos/details",
        "/api/produtos/get-by-ids"
    ]

    # Common query params examples for filtering and search (medium dataset assumptions)
    search_params = {
        "query": "tecnologia",  # search term assumed
        "filters": '{"category":["eletrônicos","componentes"]}',  # stringified JSON filter example
        "page": 1,
        "pageSize": 20
    }

    distinct_params = {
        "field": "category"
    }

    facet_counts_params = {
        "fields": "category,brand"
    }

    details_params = {
        "ids": "1,2,3,4,5"
    }

    get_by_ids_params = {
        "ids": "10,11,12"
    }

    # Mapping endpoint to params
    params_map = {
        "/api/produtos/search": search_params,
        "/api/produtos/distinct": distinct_params,
        "/api/produtos/facet-counts": facet_counts_params,
        "/api/produtos/details": details_params,
        "/api/produtos/get-by-ids": get_by_ids_params,
    }

    for endpoint in endpoints:
        url = BASE_URL + endpoint
        params = params_map.get(endpoint, {})

        # Measure response time for performance validation
        try:
            start = time.time()
            response = requests.get(url, headers=HEADERS, params=params, timeout=TIMEOUT)
            elapsed = time.time() - start
        except requests.exceptions.RequestException as e:
            assert False, f"Request to {url} failed: {e}"

        # Assert status code success or appropriate error handling tests below
        assert response.status_code == 200, f"Expected 200 OK for {url} but got {response.status_code}"

        # Assert response time < 1 second as per requirement
        assert elapsed < 1, f"Response time for {url} exceeded 1 second (was {elapsed:.3f}s)"

        # Validate response JSON structure minimally
        try:
            data = response.json()
        except Exception:
            assert False, f"Response from {url} is not valid JSON"

        # Simple checks based on endpoint:
        if endpoint == "/api/produtos/search":
            # Must be dict with 'results' key as list
            assert isinstance(data, dict), f"Search endpoint must return dict"
            assert "results" in data, "'results' key missing in search response"
            assert isinstance(data["results"], list), "'results' should be a list"
        elif endpoint == "/api/produtos/distinct":
            # expected to return list of distinct values for a field
            assert isinstance(data, list), f"Distinct endpoint should return a list"
            assert len(data) > 0, "Distinct endpoint returned empty list"
        elif endpoint == "/api/produtos/facet-counts":
            # expected dict with counts per facet
            assert isinstance(data, dict), f"Facet-counts endpoint should return a dict"
            for facet in ["category", "brand"]:
                assert facet in data, f"Facet '{facet}' missing from facet-counts response"
        elif endpoint == "/api/produtos/details":
            assert isinstance(data, list), f"Details endpoint should return a list"
            assert all(isinstance(item, dict) for item in data), "All items in details must be dict"
        elif endpoint == "/api/produtos/get-by-ids":
            assert isinstance(data, list), f"Get-by-ids endpoint should return a list"
            assert all(isinstance(item, dict) for item in data), "All items in get-by-ids must be dict"

    # Additional error case checks for /api/produtos/search with bad params (simulate 400)
    try:
        bad_params = {"page": -1}  # invalid param
        r = requests.get(BASE_URL + "/api/produtos/search", headers=HEADERS, params=bad_params, timeout=TIMEOUT)
        assert r.status_code == 400 or r.status_code == 422, f"Expected 400/422 for invalid params, got {r.status_code}"
    except requests.exceptions.RequestException:
        pass

    # Check 404 on invalid endpoint
    try:
        r = requests.get(BASE_URL + "/api/produtos/nonexistent-endpoint", headers=HEADERS, timeout=TIMEOUT)
        assert r.status_code == 404, f"Expected 404 for nonexistent endpoint, got {r.status_code}"
    except requests.exceptions.RequestException:
        pass

    # Simulate 500 and 503 would require server trigger or mock - skipped as external dependencies should be avoided

test_product_catalog_filters_and_search_performance()
