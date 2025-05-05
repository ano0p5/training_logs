import logging
import json
import settings
import requests as request
from datetime import datetime
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class Crawler:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['aldi']
        self.collection_name = 'crawler'

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
        product = {}
        product["unique_id"] = hit.get("objectID")
        product["competitor_name"] = "Aldi"
        product["extraction_date"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        product["product_name"] = hit.get("variantName")
        product["brand"] = hit.get("brandName")
        product["brand_type"] = ""
        product["grammage_quantity"] = hit.get("salesUnit", "").split(" ")[0] if hit.get("salesUnit") else ""
        product["grammage_unit"] = hit.get("salesUnit", "").split(" ")[1] if hit.get("salesUnit", "").split() else ""

        categories = ["ALDI Supermarkten"] + hit.get("categories", [])
        product["beadcrumb"] = " > ".join(categories)
        product["producthierarchy_level1"] = categories[0] if len(categories) > 0 else ""
        product["producthierarchy_level2"] = categories[1] if len(categories) > 1 else ""
        product["producthierarchy_level3"] = categories[2] if len(categories) > 2 else ""
        product["producthierarchy_level4"] = categories[3] if len(categories) > 3 else ""
        product["producthierarchy_level5"] = categories[4] if len(categories) > 4 else ""

        product["regular_price"] = hit.get("currentPrice", {}).get("strikePriceValue")
        product["selling_price"] = hit.get("currentPrice", {}).get("priceValue")
        product["price_was"] = hit.get("currentPrice", {}).get("strikePriceValue")
        product["promotion_price"] = ""
        product["promotion_valid_from"] = ""
        product["promotion_valid_upto"] = ""
        product["promotion_type"] = ""
        product["percentage_discount"] = ""
        product["promotion_description"] = hit.get("promotion", {}).get("text") if hit.get("promotion") else ""
        product["price_per_unit"] = hit.get("currentPrice", {}).get("basePriceValue")
        product["currency"] = "EUR"
        product["pdp_url"] = f"{settings.ALDI_PRODUCT_URL_BASE}{hit.get('productSlug')}-{hit.get('objectID')}{settings.ALDI_PRODUCT_URL_SUFFIX}" if hit.get("productSlug") and hit.get("objectID") else ""
        product["Fat %"] = ""
        product["variants"] = ""
        product["product_description"] = hit.get("longDescription") or hit.get("shortDescription")
        product["instructions"] = ""
        product["storage_instructions"] = ""
        product["country_of_origin"] = ""
        product["allergens"] = ""
        product["nutritional_score"] = ""
        product["organictype"] = ""
        product["file_name_1"] = hit.get("images", [{}])[0].get("url") if hit.get("images") else ""
        product["upc"] = ""
        product["ingredients"] = ""
        product["servings_per_pack"] = ""

        return product

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