import logging
import settings
import requests as request
from datetime import datetime
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class Crawler:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['aldi']
        self.collection_name = 'aldi_crawler'

    def start(self):
        for url in settings.URLS:
            category_filter = self.extract_category_for_algolia(url)
            if category_filter:
                payload = {
                    "requests": [
                        {
                            "indexName": settings.ALGOLIA_INDEX_NAME,
                            "params": f"filters=categories%3A{category_filter}&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=1000&page=0"
                        }
                    ]
                }

                response = request.post(settings.ALGOLIA_QUERY_URL, headers=settings.HEADERS, json=payload)
                if response.status_code == 200:
                    algolia_data = response.json()
                    extracted_products = self.parse_algolia_response(algolia_data)
                    if extracted_products:
                        self.save_to_db(extracted_products)
                        category_name = url.split('/')[-1].replace(".html", "").replace("-", " ").title()
                        logging.info(f"Saved {len(extracted_products)} products for category: {category_name} to MongoDB.")
                    else:
                        logging.info(f"No products found for URL: {url}.")
                else:
                    logging.error(f"Failed to fetch data for {url}, status code: {response.status_code}")
            else:
                logging.warning(f"Could not extract Algolia-compatible category for URL: {url}")

        self.close()

    def extract_category_for_algolia(self, url):
        parts = url.split('/')
        if len(parts) > 1:
            category_part = parts[-1].replace(".html", "").replace("-", " ")
            return settings.CATEGORY_MAPPING.get(category_part, category_part.replace(" ", "-"))
        return ""

    def parse_algolia_response(self, algolia_data):
        extracted_products = []
        results = algolia_data.get("results", [])
        if results:
            hits = results[0].get("hits", [])
            for hit in hits:
                product = self.extract_product(hit)
                extracted_products.append(product)
        return extracted_products

    def extract_product(self, hit):
        return {
            "product_name": hit.get("variantName", ""),
            "brand": hit.get("brandName", ""),
            "pdp_url": f"{settings.ALDI_PRODUCT_URL_BASE}{hit.get('productSlug', '')}-{hit.get('objectID', '')}{settings.ALDI_PRODUCT_URL_SUFFIX}",
            "image_url": hit.get("images", [{}])[0].get("url", "") if hit.get("images") else ""
        }

    def save_to_db(self, products):
        if products:
            collection = self.db[self.collection_name]
            collection.insert_many(products)

    def close(self):
        if self.client:
            self.client.close()


if __name__ == "__main__":
    crawler = Crawler()
    crawler.start()
