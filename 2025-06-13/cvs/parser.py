import os
import json
import re
import logging
from parsel import Selector
from pymongo import MongoClient

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)


class Crawler:
    def __init__(self):
        self.paths = [
            "/home/anoop/training_log/2025-06-13/html/sub_cat/Allergy & Sinus Medicine - CVS Pharmacy.html",
            "/home/anoop/training_log/2025-06-13/html/sub_cat/s.html"
        ]
        self.base_url = "https://www.cvs.com"

        # MongoDB setup
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["cvs"]
        self.collection = self.db["products"]

    def start(self):
        for path in self.paths:
            with open(path, encoding="utf-8") as f:
                sel = Selector(text=f.read())

            script_text = sel.xpath('//script[contains(text(), "var productIndexData =")]/text()').get()
            if not script_text:
                continue

            match = re.search(r'var productIndexData\s*=\s*(\{.*?\});', script_text, re.DOTALL)
            if not match:
                continue

            json_text = match.group(1)
            json_text = re.sub(r',\s*}', '}', json_text)
            json_text = re.sub(r',\s*]', ']', json_text)

            try:
                data = json.loads(json_text)
            except json.JSONDecodeError:
                continue

            self.parse_item(data)

    def parse_item(self, data):
        products = data.get("products", [])

        for product in products:
            item = {}

            retailer_id = product.get("id", "")
            product_name = product.get("title", "")
            breadcrumbs = product.get("breadcrumbs", [])
            breadcrumb = " > ".join(bc.get("title", "") for bc in breadcrumbs)

            variants = product.get("variants", [])
            url_path = ""
            if variants and variants[0].get("url"):
                url_path = variants[0].get("url", "")
            elif product.get("handle"):
                url_path = "/shop/" + product.get("handle")
            retailer_url = self.base_url + url_path if url_path else ""

            images = product.get("images", []) or (variants[0].get("images", []) if variants else [])
            image_url = images[0].get("uri", "") if images else ""

            selling_price = product.get("price", {}).get("value", "")
            original_price = product.get("originalPrice", {}).get("value", "")
            promo_description = product.get("promoDescription", "")
            product_description = product.get("description", "")
            product_specifications = product.get("specifications", "")
            grammage = variants[0].get("sizeData", {}).get("oz", "") if variants and variants[0].get("sizeData") else ""
            upc = retailer_id
            ingredients = product.get("ingredients", "")
            warning = product.get("warning", "")
            zipcode = ""

            item["retailer_id"] = retailer_id
            item["product_name"] = product_name
            item["breadcrumb"] = breadcrumb
            item["retailer_url"] = retailer_url
            item["image_url"] = image_url
            item["selling_price"] = selling_price
            item["original_price"] = original_price
            item["currency"] = "USD"
            item["promo_description"] = promo_description
            item["product_description"] = product_description
            item["product_specifications"] = product_specifications
            item["grammage"] = grammage
            item["upc"] = upc
            item["ingredients"] = ingredients
            item["warning"] = warning
            item["country_of_origin"] = "USA"
            item["zipcode"] = zipcode
            item["other_data"] = ""

            try:
                self.collection.insert_one(item)
                logger.info(f"Inserted: {product_name}")
            except Exception as e:
                logger.warning(f" Failed to insert: {product_name} — {e}")

    def close(self):
        self.client.close()


if __name__ == "__main__":
    crawler = Crawler()
    crawler.start()
    crawler.close()
