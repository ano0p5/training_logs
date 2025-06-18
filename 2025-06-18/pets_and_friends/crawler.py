import json
import requests
from pymongo import MongoClient
from settings import headers, MONGO_URI, MONGO_DB, MONGO_COLLECTION
import logging

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


class Crawler:
    def __init__(self):
        self.mongo = MongoClient(MONGO_URI)
        self.db = self.mongo[MONGO_DB]
        self.collection = self.db[MONGO_COLLECTION]
        self.url = "https://eucs29v2.ksearchnet.com/cs/v2/search"

    def start(self):
        category = "Dry Dog Food"
        offset = 0
        limit = 24

        while True:
            headers["referer"] = "https://www.petsandfriends.co.uk"
            payload = {
                "context": {"apiKeys": ["klevu-165219310358815158"]},
                "recordQueries": [{
                    "id": "productList",
                    "typeOfRequest": "CATNAV",
                    "settings": {
                        "query": {"term": "*", "categoryPath": category},
                        "typeOfRecords": ["KLEVU_PRODUCT"],
                        "limit": str(limit),
                        "offset": str(offset)
                    },
                    "filters": {
                        "filtersToReturn": {
                            "enabled": True,
                            "options": {"limit": 200},
                            "rangeFilterSettings": [{"key": "klevu_price", "minMax": "true"}]
                        }
                    }
                }]
            }

            response = requests.post(self.url, headers=headers, json=payload)
            records = response.json().get("queryResults", [])[0].get("records", [])
            if not records:
                break

            for i in records:
                item = {
                    "product_name": i.get("name", ""),
                    "brand": i.get("brand", ""),
                    "price": i.get("price", ""),
                    "sale_price": i.get("salePrice", ""),
                    "product_url": i.get("url", ""),
                    "image_url": i.get("image", ""),
                    "instock": i.get("inStock", ""),
                    "sku": i.get("sku", ""),
                    "category": category
                }
                logger.info(item)
                try:
                    self.collection.insert_one(item)
                except:
                    pass

            offset += limit

    def close(self):
        self.mongo.close()

if __name__ == "__main__":
    crawler = Crawler()
    crawler.start()
    crawler.close()
