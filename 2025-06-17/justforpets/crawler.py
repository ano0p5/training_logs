import requests
from parsel import Selector
from pymongo import MongoClient
import logging
from time import sleep

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["justforpets"]
collection = db["sub_categories"]

# Headers
headers = {
    "User-Agent": "Mozilla/5.0"
}

# Fetch all non-empty child category URLs
child_urls = collection.distinct("child_category_url", {"child_category_url": {"$ne": ""}})
logger.info(f"Found {len(child_urls)} child category URLs.\n")

# Crawl and parse products from each child category URL
for url in child_urls:
    try:
        logger.info(f"Crawling URL: {url}")
        response = requests.get(url, headers=headers, timeout=10)
        selector = Selector(text=response.text)

        # Select all product cards
        product_cards = selector.xpath('//li[contains(@class, "product")]')
        logger.info(f"  Found {len(product_cards)} product(s) on the page.")

        for product in product_cards:
            item = {
                "product_name": product.xpath('.//h4[@class="card-title"]/a/text()').get(default="").strip(),
                "product_url": product.xpath('.//h4[@class="card-title"]/a/@href').get(default="").strip(),
                "product_image": product.xpath('.//div[@class="card-img-container"]/img/@src').get(default="").strip(),
                "original_price": product.xpath('.//span[@class="price price--non-sale"]/text()').get(default="").strip(),
                "selling_price": product.xpath('.//span[@class="price price--withTax"]/text()').get(default="").strip(),
                "promotion_description": product.xpath('.//div[@class="sticker"]/text()').get(default="").strip()
            }

            logger.info(f"    → {item['product_name']} | {item['selling_price']} | {item['product_url']}")
        
        sleep(1)

    except Exception as e:
        logger.error(f"Failed to fetch from {url}: {e}")
