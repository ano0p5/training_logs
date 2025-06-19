import logging
import requests
from parsel import Selector
from mongoengine import connect, disconnect
from mongoengine.connection import get_db
from mongoengine.errors import NotUniqueError
from settings import (
    MONGO_URI,
    MONGO_DB,
    MONGO_COLLECTION_CATEGORY,
    HEADERS
)
from items import ProductItem

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class AlmayaCrawler:
    def __init__(self):
        connect(db=MONGO_DB, host=MONGO_URI)
        self.db = get_db()
        self.category_collection = self.db[MONGO_COLLECTION_CATEGORY]

    def start(self):
        logging.info("Crawler started.")
        for doc in self.category_collection.find({}, {"url": 1, "_id": 0}):
            base_url = doc.get("url", "")
            if base_url:
                logging.info(f"Scraping category: {base_url}")
                self.scrape_products(base_url)

    def scrape_products(self, base_url):
        page = 1
        while True:
            url = f"{base_url}?pagenumber={page}&orderby=0&viewmode=grid&pagesize=16"
            try:
                response = requests.get(url, headers=HEADERS, timeout=10)
            except Exception as e:
                logging.error(f"Request failed: {url}")
                break

            if response.status_code != 200:
                logging.warning(f"Non-200 status: {response.status_code} - {url}")
                break

            selector = Selector(text=response.text)
            products = selector.xpath('//div[contains(@class, "item-box")]')
            valid_count = 0

            for product in products:
                name = product.xpath('.//h2[@class="product-title"]/a/text()').get(default="").strip()
                rel_url = product.xpath('.//h2[@class="product-title"]/a/@href').get(default="").strip()
                price = product.xpath('.//span[contains(@class,"actual-price")]/text()').get(default="").strip()
                image = product.xpath('.//div[@class="picture"]/a/img/@src').get(default="").strip()

                if not name or not price:
                    continue

                item = {}
                item["product_name"] = name
                item["product_url"] = f"https://www.almayaonline.com{rel_url}"
                item["product_price"] = price.replace("AED", "").strip()
                item["currency"] = "AED"
                item["product_image"] = image

                try:
                    product_doc = ProductItem(**item)
                    product_doc.save()
                    logging.info(f"Saved: {name}")
                except NotUniqueError:
                    logging.warning(f"Duplicate: {item['product_url']}")
                except Exception:
                    logging.exception(f"Failed to save product: {item['product_url']}")

                valid_count += 1

            if valid_count == 0:
                logging.info(f"No valid products on page {page}. Ending pagination.")
                break

            page += 1

    def close(self):
        disconnect()
        logging.info("MongoDB connection closed.")


if __name__ == "__main__":
    crawler = AlmayaCrawler()
    crawler.start()
    crawler.close()
