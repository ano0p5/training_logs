import logging
import requests
from parsel import Selector
from pymongo import MongoClient
from settings import MONGO_URI, MONGO_DB, MONGO_COLLECTION, MONGO_CATEGORY_COLLECTION, headers

# MongoDB setup
mongo = MongoClient(MONGO_URI)
db = mongo[MONGO_DB]
collection = db[MONGO_COLLECTION]
category_collection = db[MONGO_CATEGORY_COLLECTION]


class Crawler:
    """Crawler for paginated product listings"""

    def start(self):
        """Fetch category URLs from MongoDB and paginate through products"""
        urls = [doc["url"] for doc in category_collection.find()]
        for url in urls:
            next_page = url
            while next_page:
                try:
                    headers["referer"] = next_page
                    response = requests.get(next_page, headers=headers, timeout=10)
                    if response.status_code == 200:
                        next_page = self.parse_item(response, next_page)
                    else:
                        logging.warning(f"Failed to fetch {next_page} - Status Code: {response.status_code}")
                        break
                except requests.exceptions.RequestException as e:
                    logging.error(f"Error fetching {next_page}: {e}")
                    break

    def parse_item(self, response, current_url):
        """Parse product listings and return next page URL if available"""
        sel = Selector(response.text)

        # Extract product blocks
        product_blocks = sel.xpath('//div[@data-product-handle]')
        if not product_blocks:
            logging.info(f"No products found on {current_url}")
            return None
        category_name = sel.xpath('//h1[contains(@class, "section-header__title")]/text()').get()
        category_name = category_name.strip() if category_name else ""

        for product in product_blocks:
            product_url = product.xpath('.//a[contains(@href, "/products")]/@href').get()
            full_url = f"https://noragardner.com{product_url}" if product_url and product_url.startswith('/') else ''

            price = (
                product.xpath('.//span[contains(@class, "price")]/text()').get() or
                product.xpath('.//div[contains(@class, "grid-product__price")]/text()').get() or
                product.xpath('.//div[contains(@class, "price")]/span/text()').get()
            )

            product_price = price.strip() if price else ''           
            item = {
                "name": product.xpath('./@data-product-handle').get() or "",
                "id": product.xpath('./@data-product-id').get() or "",
                "pdp_url": full_url,
                "category":category_name,
                "product_price": product_price,
            }

            logging.info(item)
            try:
                collection.insert_one(item)
            except Exception as e:
                logging.error(f"Insert error: {e}")

        # Handle pagination
        next_page_url = sel.xpath('//span[@class="next"]/a/@href').get()
        if next_page_url:
            full_next_page_url = next_page_url if next_page_url.startswith("http") else "https://noragardner.com" + next_page_url
            return full_next_page_url
        return None

    def close(self):
        """Close MongoDB connection"""
        mongo.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    crawler = Crawler()
    crawler.start()
    crawler.close()
