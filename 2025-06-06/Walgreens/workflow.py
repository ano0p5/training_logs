import requests

url = "https://www.walgreens.com/productsearch/v1/products/(RVI)"

headers = {  
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "content-type": "application/json"
}

payload = {
    "rvi": ["prod6235483"]
}

response = requests.post(url, headers=headers, json=payload)
print("Status Code:", response.json())
