import requests
from parsel import Selector
from pymongo import MongoClient
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

class CategoryPathExtractor:
    def __init__(self):
        self.base_url = "https://www.petsandfriends.co.uk"
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.mongo = MongoClient("mongodb://localhost:27017/")
        self.db = self.mongo["pets_and_friends"]
        self.collection = self.db["category_paths"]

    def start(self):
        response = requests.get(self.base_url, headers=self.headers)
        if response.status_code != 200:
            logger.error(f" Failed to fetch homepage. Status code: {response.status_code}")
            return

        selector = Selector(text=response.text)
        sections = selector.xpath('//div[contains(@class, "c-site-header__linklists")]/ul')

        count = 0

        for section in sections:
            parent_category = section.xpath('./li[@class="c-site-header__sub-heading"]/text()').get(default="").strip()
            links = section.xpath('.//li[@class="c-site-header__sub-item"]/a')

            for link in links:
                category_name = link.xpath('normalize-space(text())').get()
                path = link.xpath('@href').get(default="").strip()

                if not category_name or not path:
                    continue

                # Build full URL
                category_url = path if path.startswith("http") else f"{self.base_url}{path}"

                item = {
                    "parent_category": parent_category,
                    "category_name": category_name,
                    "category_url": category_url
                }

                logger.info(item)
                self.collection.insert_one(item)
                count += 1

                if category_name.strip() == "Brambles":
                    logger.info(" Stopped at last relevant category (Brambles)")
                    break

        logger.info(f"Total inserted: {count} category paths into `category_paths` collection.")

    def close(self):
        self.mongo.close()

if __name__ == "__main__":
    extractor = CategoryPathExtractor()
    extractor.start()
    extractor.close()
