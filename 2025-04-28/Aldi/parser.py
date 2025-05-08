import logging
import json
from datetime import datetime

import requests
from parsel import Selector
from pymongo import MongoClient, errors

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class AldiProductParser:
    def __init__(self):
        self.headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
        }
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['aldi']
        self.source_collection = self.db['aldi_crawler']
        self.target_collection = self.db['aldi_parser']
        self.target_collection.create_index("unique_id", unique=True)

    def fetch_html(self, url: str) -> str:
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed for {url}: {e}")
            return ""

    def parse_product(self, html: str, url: str) -> dict:
        sel = Selector(text=html)
        data = {
            'unique_id': '',
            'competitor_name': 'aldi',
            'extraction_date': datetime.now().strftime('%Y-%m-%d'),
            'product_name': sel.xpath('//h1[@class="product-header__variant"]/text()').get(default='').strip(),
            'brand': sel.xpath('//p[@class="product-header__brand"]/text()').get(default='').strip(),
            'grammage_quantity': '',
            'grammage_unit': '',
            'breadcrumb': '',
            'producthierarchy_level1': '',
            'producthierarchy_level2': '',
            'producthierarchy_level3': '',
            'producthierarchy_level4': '',
            'producthierarchy_level5': '',
            'regular_price': sel.xpath('//div[@class="price-info__container__sale-section__value"]/text()').get(default='').strip(),
            'selling_price': '',
            'price_was': '',
            'promotion_price': '',
            'promotion_valid_from': '',
            'promotion_valid_upto': '',
            'promotion_type': '',
            'percentage_discount': '',
            'promotion_description': '',
            'price_per_unit': '',
            'currency': 'EUR',
            'pdp_url': url,
            'Fat %': '',
            'variants': '',
            'product_description': '',
            'instructions': '',
            'storage_instructions': '',
            'country_of_origin': 'nl',
            'allergens': '',
            'nutritional_score': '',
            'organictype': '',
            'upc': '',
            'ingredients': '',
            'servings_per_pack': '',
            'img_urls': ''
        }

        weight_text = sel.xpath('//div[@class="price-info__additional-det"]/p[1]/text()').get(default='').strip()
        quantity = ''.join(filter(str.isdigit, weight_text))
        unit = ''.join(filter(str.isalpha, weight_text)).strip()
        if quantity:
            data['grammage_quantity'] = int(quantity)
        if unit:
            data['grammage_unit'] = unit

        crumbs = sel.xpath('//div[@data-testid="breadcrumbs-container"]//li[@class="breadcrumbs__item"]/a/span/text()').getall()
        crumbs = [c.strip() for c in crumbs]
        data['breadcrumb'] = ' > '.join(crumbs)
        if crumbs:
            levels = ['producthierarchy_level1', 'producthierarchy_level2', 'producthierarchy_level3']
            for i in range(min(len(crumbs), 3)):
                data[levels[i]] = crumbs[i]

        next_data = sel.xpath('//script[@id="__NEXT_DATA__"]/text()').get()
        if not next_data:
            return data

        try:
            json_data = json.loads(next_data)
            pd = json_data.get('props', {}).get('pageProps', {}).get('productDetailData', {})

            data['unique_id'] = pd.get('variantID', '')
            data['upc'] = pd.get('variantID', '')
            data['product_description'] = pd.get('longDescription', {}).get('nl', '')

            # Images
            images = pd.get('images', {}).get('nl', [])
            image_urls = [img['url'] for img in images if isinstance(img, dict) and 'url' in img]
            data['img_urls'] = ','.join(set(image_urls))

            prices = pd.get('prices', [])
            now_ts = int(datetime.now().timestamp() * 1000)
            valid_price = next((p for p in prices if p.get('validUntil', 0) > now_ts), prices[-1] if prices else {})
            if valid_price:
                data['regular_price'] = str(valid_price.get('priceValue', data['regular_price']))
                data['selling_price'] = data['regular_price']
                if valid_price.get('strikePriceValue') is not "":
                    data['price_was'] = str(valid_price.get('strikePriceValue'))
                if valid_price.get('basePriceValue') is not "":
                    data['price_per_unit'] = str(valid_price.get('basePriceValue'))

            promo = pd.get('promotion')
            if promo and promo.get('validFrom') and promo.get('validUntil'):
                data['promotion_price'] = str(promo.get('priceValue', ''))
                data['promotion_valid_from'] = datetime.fromtimestamp(promo['validFrom'] / 1000).strftime('%Y-%m-%d')
                data['promotion_valid_upto'] = datetime.fromtimestamp(promo['validUntil'] / 1000).strftime('%Y-%m-%d')
                data['promotion_description'] = promo.get('reduction', {}).get('nl', '')
                if data['price_was'] and data['promotion_price']:
                    try:
                        discount = ((float(data['price_was']) - float(data['promotion_price'])) / float(data['price_was'])) * 100
                        data['percentage_discount'] = f"{discount:.2f}%"
                    except Exception:
                        pass
                data['promotion_type'] = "discount"

        except Exception as e:
            logging.error(f"Failed to parse __NEXT_DATA__ JSON: {e}")

        return data

    def run(self):
        for doc in self.source_collection.find({'pdp_url': {'$exists': True}}):
            url = doc['pdp_url']
            html = self.fetch_html(url)
            if not html:
                continue

            product = self.parse_product(html, url)
            if product and product.get('unique_id'):
                try:
                    self.target_collection.insert_one(product)
                    logging.info(f"Saved: {product['product_name']} ({product['unique_id']})")
                except errors.DuplicateKeyError:
                    logging.info(f"Duplicate skipped: {product['unique_id']}")


if __name__ == "__main__":
    AldiProductParser().run()
