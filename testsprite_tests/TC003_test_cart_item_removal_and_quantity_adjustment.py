import requests
import time

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_cart_item_removal_and_quantity_adjustment():
    session = requests.Session()
    headers = {"Content-Type": "application/json"}
    
    # Step 1: Get products to get product IDs (GET /api/produtos)
    try:
        resp = session.get(f"{BASE_URL}/api/produtos", timeout=TIMEOUT)
        assert resp.status_code == 200
        products = resp.json()
        assert isinstance(products, list) and len(products) >= 2, "Need at least 2 products for test"
        product_ids = [prod.get("id") for prod in products if "id" in prod][:2]
    except Exception as e:
        raise AssertionError(f"Failed accessing product listing endpoint: {e}")
    
    # Define cart API endpoints (assumed)
    cart_items_endpoint = f"{BASE_URL}/api/cart/items"

    created_cart_item_ids = []
    
    try:
        # Step 2: Add 2 different items to cart with initial quantity 1
        for pid in product_ids:
            payload = {"product_id": pid, "quantity": 1}
            resp = session.post(cart_items_endpoint, json=payload, headers=headers, timeout=TIMEOUT)
            assert resp.status_code == 201, f"Failed to add product {pid} to cart"
            item = resp.json()
            assert item.get("product_id") == pid
            assert item.get("quantity") == 1
            assert "id" in item
            created_cart_item_ids.append(item["id"])
        
        # Step 3: Verify both items are in the cart (GET /api/cart/items)
        resp = session.get(cart_items_endpoint, timeout=TIMEOUT)
        assert resp.status_code == 200
        cart_items = resp.json()
        item_ids_in_cart = [item.get("id") for item in cart_items]
        for cid in created_cart_item_ids:
            assert cid in item_ids_in_cart, f"Cart item {cid} not present after adding"
        
        # Step 4: Remove one item (DELETE /api/cart/items/{id})
        remove_id = created_cart_item_ids[0]
        resp = session.delete(f"{cart_items_endpoint}/{remove_id}", timeout=TIMEOUT)
        assert resp.status_code == 204, "Failed to remove cart item"
        
        # Step 5: Check removed item no longer in cart, and the other remains
        resp = session.get(cart_items_endpoint, timeout=TIMEOUT)
        assert resp.status_code == 200
        cart_items = resp.json()
        item_ids_after_removal = [item.get("id") for item in cart_items]
        assert remove_id not in item_ids_after_removal
        assert created_cart_item_ids[1] in item_ids_after_removal
        
        # Step 6: Adjust quantity of remaining item (PUT /api/cart/items/{id})
        adjust_id = created_cart_item_ids[1]
        new_quantity = 3
        payload = {"quantity": new_quantity}
        resp = session.put(f"{cart_items_endpoint}/{adjust_id}", json=payload, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 200
        updated_item = resp.json()
        assert updated_item.get("id") == adjust_id
        assert updated_item.get("quantity") == new_quantity
        
        # Step 7: Verify other items not affected (only one remains)
        resp = session.get(cart_items_endpoint, timeout=TIMEOUT)
        assert resp.status_code == 200
        cart_items = resp.json()
        assert len(cart_items) == 1
        assert cart_items[0].get("id") == adjust_id
        assert cart_items[0].get("quantity") == new_quantity

    finally:
        # Cleanup: remove all items created
        for cid in created_cart_item_ids:
            try:
                session.delete(f"{cart_items_endpoint}/{cid}", timeout=TIMEOUT)
            except:
                pass

test_cart_item_removal_and_quantity_adjustment()