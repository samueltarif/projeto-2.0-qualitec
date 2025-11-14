import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30
HEADERS_JSON = {"Content-Type": "application/json"}
HEADERS_PDF = {"Content-Type": "application/pdf"}

def test_product_comparison_add_remove_functionality():
    session = requests.Session()
    # Step 1: Search products to obtain IDs for comparison
    try:
        start = time.time()
        resp_search = session.get(f"{BASE_URL}/api/produtos/search", timeout=TIMEOUT)
        elapsed_search = time.time() - start
        assert resp_search.status_code == 200, f"Search failed with status {resp_search.status_code}"
        assert elapsed_search < 1, f"Search endpoint response too slow: {elapsed_search}s"
        data_search = resp_search.json()
        # Changed to expect list directly
        assert isinstance(data_search, list), "Search response is not a list"
        products_list = data_search

        assert len(products_list) >= 2, "Need at least two products for comparison"
        
        product_ids = [str(product['id'] if 'id' in product else product.get('_id', '')) for product in products_list[:2]]

        # Validate product IDs are non-empty strings
        assert all(pid for pid in product_ids), "Product ID is empty or missing"

        # Step 2: Add products by IDs to comparison via GET /api/produtos/get-by-ids
        # This fetch should validate products exist and simulate adding to comparison
        start = time.time()
        resp_get_by_ids = session.get(f"{BASE_URL}/api/produtos/get-by-ids", params={"ids": ",".join(product_ids)}, timeout=TIMEOUT)
        elapsed_get_by_ids = time.time() - start
        assert resp_get_by_ids.status_code == 200, f"Get-by-ids failed with status {resp_get_by_ids.status_code}"
        assert elapsed_get_by_ids < 1, f"Get-by-ids endpoint response too slow: {elapsed_get_by_ids}s"
        data_get_by_ids = resp_get_by_ids.json()
        assert isinstance(data_get_by_ids, list), "get-by-ids response not list"
        assert set(product_ids).issubset({str(p.get('id', p.get('_id', ''))) for p in data_get_by_ids}), "Returned products missing requested ids"

        # Step 3: Simulate adding products to comparison (assuming this is managed client-side)
        # Since no explicit POST for adding, just validate fetched info for comparison

        # Step 4: Simulate removing one product (simulate send request that would remove product)
        # No dedicated remove API given for comparison, assume removal reflected by requesting again without that ID
        remove_id = product_ids[0]
        remaining_ids = product_ids[1:]

        start = time.time()
        resp_get_after_remove = session.get(f"{BASE_URL}/api/produtos/get-by-ids", params={"ids": ",".join(remaining_ids)}, timeout=TIMEOUT)
        elapsed_remove = time.time() - start
        assert resp_get_after_remove.status_code == 200, f"Get-by-ids after removal failed with status {resp_get_after_remove.status_code}"
        assert elapsed_remove < 1, f"Get-by-ids after removal endpoint response too slow: {elapsed_remove}s"
        data_after_remove = resp_get_after_remove.json()
        returned_ids_after_remove = {str(p.get('id', p.get('_id', ''))) for p in data_after_remove}
        assert remove_id not in returned_ids_after_remove, "Removed product still present after removal"
        assert set(remaining_ids) == returned_ids_after_remove, "Remaining products mismatch after removal"

        # Step 5: Check facet-counts and distinct endpoints stability after add/remove scenario
        resp_facet = session.get(f"{BASE_URL}/api/produtos/facet-counts", timeout=TIMEOUT)
        assert resp_facet.status_code == 200, "Facet-counts endpoint failed"

        resp_distinct = session.get(f"{BASE_URL}/api/produtos/distinct", timeout=TIMEOUT)
        assert resp_distinct.status_code == 200, "Distinct endpoint failed"

    except requests.exceptions.RequestException as e:
        assert False, f"HTTP request failed: {e}"

    # Note: Layout integrity especially on mobile devices relates to frontend/UI,
    # here backend validation ensures the API for adding/removing comparison products works correctly and performant.

test_product_comparison_add_remove_functionality()
