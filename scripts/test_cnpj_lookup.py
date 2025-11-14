import json
import urllib.request

BASE_URL = "http://localhost:3000/api/get-company-by-cnpj"

def post_json(url, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode("utf-8")
        return json.loads(content)

def only_digits(s: str) -> str:
    return "".join(ch for ch in s if ch.isdigit())

def main():
    sample_cnpj_masked = "60.840.055/0198-27"
    sample_cnpj_digits = only_digits(sample_cnpj_masked)

    print("Testando com CNPJ mascarado:", sample_cnpj_masked)
    try:
        res_masked = post_json(BASE_URL, {"cnpj": sample_cnpj_masked})
        print("Resposta (mascarado):", res_masked)
    except Exception as e:
        print("Erro (mascarado):", e)

    print("\nTestando com CNPJ apenas dígitos:", sample_cnpj_digits)
    try:
        res_digits = post_json(BASE_URL, {"cnpj": sample_cnpj_digits})
        print("Resposta (dígitos):", res_digits)
    except Exception as e:
        print("Erro (dígitos):", e)

if __name__ == "__main__":
    main()