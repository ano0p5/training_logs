import json
import re
import requests
from parsel import Selector
from settings import db
import logging

BASE_URL = "https://mmlafleur.com"

logging.basicConfig(level=logging.INFO)

class Crawler:
    def start(self):
        urls = [
            "https://mmlafleur.com/collections/dresses",
            "https://mmlafleur.com/collections/tops",
            "https://mmlafleur.com/collections/t-shirts",
            "https://mmlafleur.com/collections/pants",
            "https://mmlafleur.com/collections/jackets",
            "https://mmlafleur.com/collections/knitwear",
            "https://mmlafleur.com/collections/skirts",
            "https://mmlafleur.com/collections/suiting",
            "https://mmlafleur.com/collections/accessories",
        ]
        for url in urls:
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    self.parse(response.text)
            except Exception:
                pass

    def parse(self, html):
        sel = Selector(text=html)
        script = sel.xpath('//script[@id="web-pixels-manager-setup"]/text()').get()
        match = re.search(r'webPixelsManagerAPI\.publish\("collection_viewed", ({.*?})\);', script or '', re.DOTALL)
        if not match:
            return

        try:
            data = json.loads(match.group(1))
            category = data.get('collection', {}).get('title', '')
            products = data.get('collection', {}).get('productVariants', [])
        except Exception:
            return

        for p in products:
            try:
                item = {
                    'product_name': p['product'].get('title', '').strip(),
                    'sale_price': str(int(float(p.get('price', {}).get('amount', 0)))),
                    'orginal_price': str(int(float(p.get('price', {}).get('amount', 0)))),                    
                    'currency': "USD",
                    'product_url': BASE_URL + p['product'].get('url', ''),
                    'sku': "",
                    'brand': "",
                    'category': category
                }
                db["products_pp"].insert_one(item)
                logging.info(item)
            except Exception:
                pass


if __name__ == "__main__":
    Crawler().start()
