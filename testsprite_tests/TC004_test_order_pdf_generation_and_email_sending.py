import requests
import time
import base64

BASE_URL = "http://localhost:3000"
TIMEOUT = 30

def test_order_pdf_generation_and_email_sending():
    session = requests.Session()
    headers_json = {"Content-Type": "application/json"}
    headers_pdf = {"Content-Type": "application/pdf"}

    # Utility: Register user and company to get auth token
    def register_and_login():
        # Register user
        user_payload = {
            "username": "testuser_tc004",
            "email": "testuser_tc004@example.com",
            "password": "TestPassword123!"
        }
        r = session.post(f"{BASE_URL}/api/register-user", json=user_payload, timeout=TIMEOUT)
        assert r.status_code in (200, 201), f"User registration failed: {r.text}"

        # Register company
        company_payload = {
            "companyName": "Test Company TC004",
            "cnpj": "12345678000195",
            "address": "123 Test St.",
            "email": "contact@companytc004.test"
        }
        r = session.post(f"{BASE_URL}/api/register-company", json=company_payload, timeout=TIMEOUT)
        assert r.status_code in (200, 201), f"Company registration failed: {r.text}"

        # Login
        login_payload = {
            "username": user_payload["username"],
            "password": user_payload["password"]
        }
        r = session.post(f"{BASE_URL}/api/login", json=login_payload, timeout=TIMEOUT)
        assert r.status_code == 200, f"Login failed: {r.text}"
        json_resp = r.json()
        token = json_resp.get("token") or json_resp.get("accessToken") or json_resp.get("access_token")
        assert token, "Token not found in login response"
        session.headers.update({"Authorization": f"Bearer {token}"})

    def create_order_pdf():
        # Sample order data with observations block expected
        order_data = {
            "orderId": "testorder_tc004_001",
            "items": [
                {
                    "productId": "prod123",
                    "quantity": 2,
                    "price": 100.0,
                    "observations": "Handle with care"
                }
            ],
            "customer": {
                "name": "Test Customer",
                "email": "customer@example.com"
            }
        }
        r = session.post(f"{BASE_URL}/api/download-order", json=order_data, timeout=TIMEOUT)
        return r

    def send_order_email(pdf_bytes):
        # Mock email sending, payload should include email and attachment
        b64_content = base64.b64encode(pdf_bytes).decode('ascii')
        email_payload = {
            "to": "customer@example.com",
            "subject": "Your order PDF - test TC004",
            "body": "Please find attached the PDF of your order.",
            "attachments": [
                {
                    "filename": "order.pdf",
                    "content": b64_content,
                    "contentType": "application/pdf"
                }
            ]
        }
        r = session.post(f"{BASE_URL}/api/send-email", json=email_payload, timeout=TIMEOUT)
        return r

    def validate_pdf_content(pdf_content_bytes):
        # Since we don't have PDF parsing libraries allowed and no external dependencies,
        # we'll do some rudimentary checks by searching bytes for expected CSS style strings in PDF text
        # Note: PDFs are binary and this is limited but we attempt to confirm presence of green and styles.
        content_lc = pdf_content_bytes.lower()

        # Check for green background indication in the PDF content stream (likely via RGB or HEX colors)
        has_green_bg = b"green" in content_lc or b"0 1 0 rg" in content_lc or b"0 0.39 0 0 k" in content_lc
        # Check for border radius or rounded border keywords in content (appearance keywords)
        has_rounded_borders = b"radius" in content_lc or b"round" in content_lc or b"bord" in content_lc
        # Check for padding (space around observations)
        has_padding = b"padding" in content_lc or b"space" in content_lc or b"inset" in content_lc

        # Assert all styles found
        assert has_green_bg, "Green background style not found in PDF content"
        assert has_rounded_borders, "Rounded border style not found in PDF content"
        assert has_padding, "Padding style not found in PDF content"

    try:
        register_and_login()

        start_time = time.time()
        pdf_response = create_order_pdf()
        end_time = time.time()
        duration = end_time - start_time

        assert pdf_response.status_code == 200, f"PDF generation failed with status {pdf_response.status_code}"
        assert pdf_response.headers.get("Content-Type") == "application/pdf", "Response is not a PDF"
        assert duration < 1.0, f"PDF generation took too long: {duration}s"

        pdf_content = pdf_response.content
        assert len(pdf_content) > 200, "PDF content is too small, might be invalid"

        validate_pdf_content(pdf_content)

        # Send email with PDF attachment (mocked)
        send_response = send_order_email(pdf_content)
        assert send_response.status_code in (200, 202), f"Email sending failed: {send_response.text}"
        send_json = send_response.json()
        assert send_json.get("success") is True or send_json.get("message"), "Email sending did not return success indication"

    finally:
        # Cleanup: No persistent resources created on server side beyond user/company registration that can be deleted via API.
        # No API described for deletion, so skipping actual cleanup.
        pass

test_order_pdf_generation_and_email_sending()
