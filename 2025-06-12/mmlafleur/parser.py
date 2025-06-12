import logging
import re
import requests
from parsel import Selector
from settings import HEADERS, db

class Parser:
    def __init__(self):
        self.mongo = db["products_pdp"]
        self.meta_collection = db["products_plp"]

    def start(self):
        urls = self.meta_collection.find({}, {'product_url': 1, '_id': 0})
        for record in urls:
            url = record.get('product_url')
            if not url:
                continue
            try:
                res = requests.get(url, headers=HEADERS)
                if res.status_code == 200:
                    self.parse_item(url, res)
            except Exception as e:
                logging.warning(f"Error fetching {url}: {e}")

    def close(self):
        pass  

    def parse_item(self, url, response):
        sel = Selector(text=response.text)

        # Extract RID from <script id="__st">
        script = sel.xpath('//script[@id="__st"]/text()').get()
        rid = re.search(r'"rid":\s*(\d+)', script).group(1) if script and re.search(r'"rid":\s*(\d+)', script) else ""
        if not rid:
            logging.warning(f"RID not found for {url}")
            return

        # Fetch product fields from PLP collection
        product = self.meta_collection.find_one({'product_url': url}, {
            'product_name': 1,
            'brand': 1,
            'orginal_price': 1,
            'sale_price': 1,
            'category': 1,
        }) or {}

        # Review API
        review_url = (
            f"https://api-cdn.yotpo.com/v3/storefront/store/"
            f"hnkji0K4D1gfLABJN4GggiPDnm5GQdw5TAk6pRSp/product/{rid}/reviews"
            f"?page=1&perPage=5&sort=date,rating,badge,images"
        )

        try:
            res = requests.get(review_url, headers=HEADERS)
            if res.status_code != 200:
                logging.warning(f"Review API failed for {rid}")
                return

            data = res.json()
            dist = data.get("bottomline", {}).get("starDistribution", {})
            total_reviews = data.get("bottomline", {}).get("totalReview", 0)

            for r in data.get("reviews", []):
                item = {
                    "website": "MMLaFleur",
                    "product_url": url,
                    "product_name": product.get("product_name", ""),
                    "brand": product.get("brand", ""),
                    "original_price": product.get("orginal_price", ""),
                    "sale_price": product.get("sale_price", ""),
                    "category": product.get("category", ""),
                    "product_sku": rid,
                    "total_number_of_reviews": total_reviews,
                    "1_star": dist.get("1", 0),
                    "2_star": dist.get("2", 0),
                    "3_star": dist.get("3", 0),
                    "4_star": dist.get("4", 0),
                    "5_star": dist.get("5", 0),
                    "date_of_purchase": r.get("createdAt", "").split("T")[0],
                    "place_of_purchase": "",
                    "review_title": r.get("title", "").strip(),
                    "review_text": r.get("content", "").strip(),
                }

                logging.info(item)
                try:
                    self.mongo.insert_one(item)
                except Exception as e:
                    logging.warning(f"Mongo insert error for {url}: {e}")

        except Exception as e:
            logging.warning(f"Review fetch error for {url}: {e}")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = Parser()
    parser.start()
    parser.close()
