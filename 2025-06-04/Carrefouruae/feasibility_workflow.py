from curl_cffi import requests
from parsel import Selector
import json

def extract_category_urls():
    url = "https://www.carrefouruae.com/mafuae/en/"
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers, impersonate="chrome")
    if resp.status_code != 200:
        return []

    data = json.loads(Selector(text=resp.text).xpath('//script[@id="__NEXT_DATA__"]/text()').get() or "{}")
    initial_data = data.get("props", {}).get("initialProps", {}).get("pageProps", {})

    urls = []

    def find_urls(obj):
        if isinstance(obj, dict):
            for key, val in obj.items():
                if isinstance(val, (dict, list)):
                    find_urls(val)
                elif isinstance(val, str):
                    if ("url" in key.lower() or "cat_url_web" in key.lower()) and val.startswith("/"):
                        urls.append(val)
        elif isinstance(obj, list):
            for item in obj:
                find_urls(item)

    find_urls(initial_data)
    return urls


if __name__ == "__main__":
    urls = extract_category_urls()
    if urls:
        base = "https://www.carrefouruae.com/mafuae/en"
        unique_urls = []
        for u in urls:
            if u not in unique_urls:
                unique_urls.append(u)
        for u in unique_urls:
            print(base + u)
    else:
        print("No category URLs found.")
