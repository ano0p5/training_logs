import json
import logging
from datetime import datetime
from pymongo import MongoClient, errors
from parsel import Selector
import requests

from settings import (
    MONGO_DB,
    MONGO_COLLECTION_DATA,
    headers as HEADERS
)

class AldiProductParser:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client[MONGO_DB]
        self.source_collection = self.db['aldi_crawler']
        self.target_collection = self.db[MONGO_COLLECTION_DATA]
        self.target_collection.create_index("unique_id", unique=True)

    def fetch_html(self, url: str) -> str:
        try:
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed for {url}: {e}")
            return ""

    def parse_product(self, html: str, url: str) -> dict:
        sel = Selector(text=html)
        now = datetime.now()
        now_str = now.strftime('%Y-%m-%d')
        now_ts = int(now.timestamp() * 1000)

        product_name = sel.xpath('//h1[@class="product-header__variant"]/text()').get(default='').strip()
        brand = sel.xpath('//p[@class="product-header__brand"]/text()').get(default='').strip()

        weight_text = sel.xpath('//div[@class="price-info__additional-det"]/p[1]/text()').get(default='').strip()
        grammage_quantity = ''.join(filter(str.isdigit, weight_text))
        grammage_unit = ''.join(filter(str.isalpha, weight_text)).strip()

        crumbs = sel.xpath('//div[@data-testid="breadcrumbs-container"]//li[@class="breadcrumbs__item"]/a/span/text()').getall()
        crumbs = [c.strip() for c in crumbs]
        breadcrumb = ' > '.join(crumbs)

        item = {
            'unique_id': '',
            'competitor_name': 'aldi',
            'extraction_date': now_str,
            'product_name': product_name,
            'brand': brand,
            'grammage_quantity': grammage_quantity,
            'grammage_unit': grammage_unit,
            'breadcrumb': breadcrumb,
            'regular_price': '',
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
            'product_description': '',
            'country_of_origin': 'nl',
            'upc': '',
            'img_urls': '',
        }

        product_heirarchy_levels = 5
        for i in range(1, product_heirarchy_levels + 1):
            item[f'producthierarchy_level{i}'] = crumbs[i - 1] if i <= len(crumbs) else ''

        next_data = sel.xpath('//script[@id="__NEXT_DATA__"]/text()').get()
        if not next_data:
            return item

        try:
            data = json.loads(next_data)
            pd = data.get('props', {}).get('pageProps', {}).get('productDetailData', {})

            item['unique_id'] = pd.get('variantID', '')
            item['upc'] = pd.get('variantID', '')
            item['product_description'] = pd.get('longDescription', {}).get('nl', '')

            images = pd.get('images', {}).get('nl', [])
            image_urls = [img.get('url', '') for img in images if isinstance(img, dict)]
            item['img_urls'] = ','.join(filter(None, image_urls))

            # Prices
            prices = pd.get('prices', [])
            valid_price = next((p for p in prices if p.get('validUntil', 0) > now_ts), prices[-1] if prices else {})

            if valid_price:
                item['regular_price'] = str(valid_price.get('priceValue', item['regular_price']))
                item['selling_price'] = item['regular_price']
                if valid_price.get('strikePriceValue'):
                    item['price_was'] = str(valid_price['strikePriceValue'])
                if valid_price.get('basePriceValue'):
                    item['price_per_unit'] = str(valid_price['basePriceValue'])

            # Promotion
            promo = pd.get('promotion')
            if promo and promo.get('validFrom') and promo.get('validUntil'):
                item['promotion_price'] = str(promo.get('priceValue', ''))
                item['promotion_valid_from'] = datetime.fromtimestamp(promo['validFrom'] / 1000).strftime('%Y-%m-%d')
                item['promotion_valid_upto'] = datetime.fromtimestamp(promo['validUntil'] / 1000).strftime('%Y-%m-%d')
                item['promotion_description'] = promo.get('reduction', {}).get('nl', '')
                item['promotion_type'] = 'discount'

                # Calculate discount
                try:
                    if item['price_was'] and item['promotion_price']:
                        pw = float(item['price_was'])
                        pp = float(item['promotion_price'])
                        if pw > pp:
                            discount = ((pw - pp) / pw) * 100
                            item['percentage_discount'] = f"{discount:.2f}%"
                except Exception as e:
                    logging.warning(f"Discount calculation failed: {e}")

        except Exception as e:
            logging.error(f"Error parsing __NEXT_DATA__ for {url}: {e}")

        return item

    def run(self):
        for doc in self.source_collection.find({'pdp_url': {'$exists': True}}):
            url = doc['pdp_url']
            html = self.fetch_html(url)
            if not html:
                continue

            item = self.parse_product(html, url)
            if item and item.get('unique_id'):
                try:
                    self.target_collection.insert_one(item)
                    logging.info(f"Saved: {item['product_name']} ({item['unique_id']})")
                except errors.DuplicateKeyError:
                    logging.info(f"Duplicate skipped: {item['unique_id']}")

if __name__ == "__main__":
    AldiProductParser().run()
