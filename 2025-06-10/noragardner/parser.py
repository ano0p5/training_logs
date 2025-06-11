import logging
import requests
from datetime import datetime
from pymongo import MongoClient
from settings import MONGO_URI, MONGO_DB, MONGO_COLLECTION, MONGO_COLLECTION_REVIEWS, headers as HEADERS


class Parser:
    """Klaviyo Review Parser"""

    def __init__(self):
        self.mongo = MongoClient(MONGO_URI)
        self.db = self.mongo[MONGO_DB]
        self.products_collection = self.db[MONGO_COLLECTION]
        self.reviews_collection = self.db[MONGO_COLLECTION_REVIEWS]  # NEW COLLECTION
        self.review_base_url = (
            "https://fast.a.klaviyo.com/reviews/api/client_reviews/{product_id}/"
            "?product_id={product_id}&company_id=HWxMF4&limit=5&offset=0&sort=3"
            "&filter=&type=reviews&media=false&kl_review_uuid=&preferred_country=US&tz=Asia%2FCalcutta"
        )

    def start(self):
        """Start parsing Klaviyo review data"""

        products = self.products_collection.find(
            {"id": {"$ne": None}},
            {"id": 1, "name": 1, "product_price": 1, "pdp_url": 1, "category": 1}
        )

        for product in products:
            product_id = product.get("id")
            if not product_id:
                continue

            product_name = product.get("name", "")
            price = product.get("product_price", "")
            product_url = product.get("pdp_url", "")
            category = product.get("category", "")

            url = self.review_base_url.format(product_id=product_id)
            try:
                response = requests.get(url, headers=HEADERS, timeout=10)
                if response.status_code == 200:
                    self.parse_item(product_url, response.json(), product_id, product_name, price, category)
                else:
                    logging.warning(f"{url} --> Status Code: {response.status_code}")
            except requests.exceptions.RequestException as e:
                logging.error(f"{url} --> Error: {e}")

    def parse_item(self, url, response_json, product_id, product_name, price, category):
        """Parse product review item"""

        product = response_json.get("product", {})
        reviews = response_json.get("reviews", [])

        histogram = product.get("rating_histogram", [])
        histogram += [0] * (5 - len(histogram))
        total_reviews = product.get("review_count", 0)

        first_review = reviews[0] if reviews else {}
        created_at = first_review.get("created_at", "")
        try:
            date_of_purchase = str(datetime.fromisoformat(created_at.replace("Z", "")).date()) if created_at else ""
        except Exception as e:
            logging.warning(f"Error parsing date: {e}")
            date_of_purchase = ""

        item = {
            "website": "Nora Gardner",
            "url": url,
            "product_sku": product_id,
            "product_name": product_name,
            "brand": "Nora Gardner",
            "original_price": price,
            "sale_price": price,
            "category": category,
            "total_number_of_reviews": total_reviews,
            "1_star": histogram[0],
            "2_star": histogram[1],
            "3_star": histogram[2],
            "4_star": histogram[3],
            "5_star": histogram[4],
            "review_title": first_review.get("title", ""),
            "review_text": first_review.get("content", ""),
            "date_of_purchase": date_of_purchase,
            "place_of_purchase": "",
        }

        try:
            self.reviews_collection.insert_one(item)
            logging.info(f"Inserted: {item}")
        except Exception as e:
            logging.error(f"Insertion error: {e}")

    def close(self):
        """Close Mongo connection"""
        self.mongo.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser_obj = Parser()
    parser_obj.start()
    parser_obj.close()
