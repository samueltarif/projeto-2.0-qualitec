import requests
import time

BASE_URL = "http://localhost:3000"
HEADERS_JSON = {"Accept": "application/json"}
TIMEOUT = 30

def test_product_api_distinct_and_facet_counts():
    session = requests.Session()
    session.headers.update(HEADERS_JSON)

    # Helper function to check response time and status code
    def check_response(resp, expected_status=200):
        assert resp.status_code == expected_status, f"Expected {expected_status}, got {resp.status_code}, body: {resp.text}"
        elapsed = resp.elapsed.total_seconds()
        assert elapsed < 1, f"Response time {elapsed}s exceeds 1 second"

    # 1. GET /api/produtos/distinct - should return distinct values for product attributes
    url_distinct = f"{BASE_URL}/api/produtos/distinct"
    resp = session.get(url_distinct, timeout=TIMEOUT)
    check_response(resp)
    data_distinct = resp.json()
    assert isinstance(data_distinct, dict), "Distinct endpoint should return a JSON object"
    assert len(data_distinct) > 0, "Distinct values should not be empty"
    for key, vals in data_distinct.items():
        assert isinstance(vals, list), f"Distinct values for {key} should be a list"

    # 2. GET /api/produtos/facet-counts - should return facet counts for filtering
    url_facet = f"{BASE_URL}/api/produtos/facet-counts"
    resp = session.get(url_facet, timeout=TIMEOUT)
    check_response(resp)
    facet_data = resp.json()
    assert isinstance(facet_data, dict), "Facet counts endpoint should return a JSON object"
    assert all(isinstance(v, dict) for v in facet_data.values()), "Facet counts values should be dicts"

    # 3. GET /api/produtos/search - test filtering with facet values
    # Use one facet from facet counts for filtering if any
    filter_query = ""
    if facet_data:
        for attr, counts in facet_data.items():
            if counts:
                # Take first facet value which count > 0
                facet_value = next((k for k,v in counts.items() if v > 0), None)
                if facet_value is not None:
                    filter_query = f"?{attr}={facet_value}"
                    break
    url_search = f"{BASE_URL}/api/produtos/search{filter_query}"
    resp = session.get(url_search, timeout=TIMEOUT)
    check_response(resp)
    search_results = resp.json()
    assert isinstance(search_results, list), "Search endpoint should return a list"
    # If filtered, results should match filter or be empty
    if filter_query:
        # Check that returned products have the attribute with the filtered value
        attr_key = filter_query.split('=')[0][1:]
        expected_val = filter_query.split('=')[1]
        for product in search_results:
            assert attr_key in product, f"Product missing filtered attribute {attr_key}"
            # Attribute value can be str or list, handle both
            val = product[attr_key]
            if isinstance(val, list):
                assert expected_val in val
            else:
                assert str(val) == expected_val

    # 4. GET /api/produtos/details - test retrieving details for a specific product
    # If we have products from search results use one product id else create one
    product_id = None
    if search_results:
        product_id = search_results[0].get("id") or search_results[0].get("produto_id")
    if not product_id:
        # Create a product to test details endpoint (assuming POST /api/produtos to create)
        # Since no schema for creation, skip create and fail test if no product found
        raise AssertionError("No product id found to test details endpoint")
    url_details = f"{BASE_URL}/api/produtos/details?id={product_id}"
    resp = session.get(url_details, timeout=TIMEOUT)
    check_response(resp)
    details = resp.json()
    assert isinstance(details, dict), "Details endpoint should return a dict"
    assert details.get("id") == product_id or details.get("produto_id") == product_id

    # 5. GET /api/produtos/get-by-ids - test retrieving multiple products by IDs
    ids = []
    if len(search_results) >= 2:
        ids = [str(search_results[0].get("id") or search_results[0].get("produto_id")),
               str(search_results[1].get("id") or search_results[1].get("produto_id"))]
    elif product_id:
        ids = [str(product_id)]
    else:
        raise AssertionError("No product ids available for get-by-ids test")
    url_get_by_ids = f"{BASE_URL}/api/produtos/get-by-ids"
    resp = session.get(url_get_by_ids, params={"ids": ",".join(ids)}, timeout=TIMEOUT)
    check_response(resp)
    by_ids = resp.json()
    assert isinstance(by_ids, list), "get-by-ids should return a list"
    returned_ids = set(str(p.get("id") or p.get("produto_id")) for p in by_ids)
    assert returned_ids.issubset(set(ids)), "Returned product IDs should be subset of requested"

    # Error cases:

    # 400 Bad Request: Invalid param for search
    resp = session.get(f"{BASE_URL}/api/produtos/search?invalid_param=%%%$$$", timeout=TIMEOUT)
    assert resp.status_code in (400, 200), "Invalid filter param might be 400 or ignored"

    # 404 Not Found: Details with non-existent product id
    resp = session.get(f"{BASE_URL}/api/produtos/details?id=nonexistent_id_99999", timeout=TIMEOUT)
    assert resp.status_code in (404, 200), "Details with invalid id might return 404 or empty"

    # 500 Internal Server Error: cannot be forced easily without breaking server - just test server is alive

    # 503 Service Unavailable: simulate by calling /api/test-connection and expect 200 or 503
    resp = session.get(f"{BASE_URL}/api/test-connection", timeout=TIMEOUT)
    assert resp.status_code in (200, 503), "Test connection returns 200 or 503"

    session.close()

test_product_api_distinct_and_facet_counts()
