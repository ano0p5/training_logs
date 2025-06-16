import logging
import re
from curl_cffi import requests
from pymongo import MongoClient

from settings import MONGO_URI, DB_NAME, COLLECTION_NAME, HEADERS, PARSER_COLLECTION_NAME

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class WalgreensProductParser:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DB_NAME]
        self.collection = self.db[COLLECTION_NAME]
        self.parsed_collection = self.db[PARSER_COLLECTION_NAME]
        self.headers = HEADERS

    def extract_section(self, sections, key):
        for section in sections:
            if key in section:
                return section.get(key, {})
        return {}

    def parse(self, product_id, zipcode=""):
        url = f"https://www.walgreens.com/productapi/v1/products?productId={product_id}"
        try:
            response = requests.get(url, headers=self.headers, impersonate="chrome")
            if response.status_code != 200:
                logging.error(f"Product ID {product_id} failed with status {response.status_code}")
                return  

            data = response.json()

            product_info = data.get("productInfo", {}) or {}
            price_info = data.get("priceInfo", {}) or {}
            prod_details = data.get("prodDetails", {}) or {}
            inventory = data.get("inventory", {}) or {}
            sections = prod_details.get("section", []) or []

            tier1 = product_info.get("tier1Category", "")
            tier2 = product_info.get("tier2Category", "")
            tier3 = product_info.get("tier3Category", "")
            breadcrumb = " > ".join(filter(None, [tier1, tier2, tier3]))

            regular_price_text = price_info.get("regularPrice", "")
            selling_price = ""
            if " or " in regular_price_text:
                parts = regular_price_text.split(" or ")
                selling_price = parts[-1].strip()
            promo_description = regular_price_text

            desc_section = self.extract_section(sections, "description")
            raw_product_description = desc_section.get("productDesc", "")
            product_description = re.sub(r'<[^>]+>', ' ', raw_product_description)
            product_description = re.sub(r'\s+', ' ', product_description).strip()

            warning_section = self.extract_section(sections, "warnings")
            raw_warning = warning_section.get("productWarning", "")
            warning = re.sub(r'<[^>]+>', ' ', raw_warning)
            warning = re.sub(r'&[a-zA-Z0-9#]+;', ' ', warning)
            warning = re.sub(r'\s+', ' ', warning).strip()

            country_of_origin = "China" if "Made in China" in product_description else ""

            reviews = self.extract_section(sections, "reviews")
            review_rating = reviews.get("overallRating", "")
            review_count = reviews.get("reviewCount", "")

            item = {
                "retailer_id": product_info.get("productId", ""),
                "product_name": product_info.get("title", ""),
                "retailer_url": f"https://www.walgreens.com{prod_details.get('canonicalUrl', '')}" if prod_details.get("canonicalUrl") else "",
                "image_url": product_info.get("productImageUrl", ""),
                "breadcrumb": breadcrumb,
                "selling_price": selling_price,
                "original_price": promo_description,
                "promo_description": promo_description,
                "product_description": product_description,
                "product_specifications": product_description,
                "grammage": product_info.get("sizeCount", ""),
                "upc": inventory.get("upc", ""),
                "ingredients": "",
                "warning": warning,
                "country_of_origin": country_of_origin,
                "zipcode": zipcode,
                "other_data": {
                    "fsa_eligible": str(product_info.get("isFsa", "")),
                    "review_rating": review_rating,
                    "review_count": review_count,
                }
            }

            # Insert item into parsed_collection
            self.parsed_collection.insert_one(
                {"retailer_id": item["retailer_id"]},
                {"$set": item},
                upsert=True
            )

            yield item

        except Exception as e:
            logging.error(f"Error fetching Product ID {product_id}: {e}")
            return

    def start(self, zipcode=""):
        prod_ids_doc = self.collection.find_one()
        prod_ids = prod_ids_doc.get("prod_ids", []) if prod_ids_doc else []

        for product_id in prod_ids:
            parsed_generator = self.parse(product_id, zipcode)
            if parsed_generator:
                for parsed_item in parsed_generator:
                    logging.info(f"Parsed Product ID: {product_id}")
                    logging.info(parsed_item)
                    yield parsed_item


if __name__ == "__main__":
    parser = WalgreensProductParser()
    for item in parser.start():
        pass 