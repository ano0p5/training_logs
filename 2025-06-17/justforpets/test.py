import requests
from parsel import Selector
from pymongo import MongoClient
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

# Setup MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["justforpets"]
collection = db["sub_categories"]

# Optional: Clear previous data
collection.delete_many({})
logger.info("Cleared existing sub-category documents.")

# Request setup
start_url = "https://justforpets.co.uk/"
headers = {
    "User-Agent": "Mozilla/5.0"
}

# Fetch and parse homepage
response = requests.get(start_url, headers=headers)
selector = Selector(text=response.text)

# Parse main categories
main_categories = selector.xpath('//ul[@class="navPages-list"]/li[contains(@class, "navPages-item")]')

for main_cat in main_categories:
    main_cat_name = main_cat.xpath('./a[@class="navPages-action has-subMenu"]/text()').get()
    main_cat_url = main_cat.xpath('./a[@class="navPages-action has-subMenu"]/@href').get()

    if not main_cat_name or not main_cat_url:
        continue

    main_cat_name = main_cat_name.strip()
    main_cat_url = main_cat_url.strip()

    # Parse sub-categories
    sub_categories = main_cat.xpath('.//div[contains(@class, "navPage-subMenu")]//li[contains(@class, "navPage-subMenu-item")]')

    for sub_cat in sub_categories:
        sub_cat_name = sub_cat.xpath('./a[contains(@class, "navPage-subMenu-action")]/text()').get()
        sub_cat_url = sub_cat.xpath('./a[contains(@class, "navPage-subMenu-action")]/@href').get()

        if not sub_cat_name or not sub_cat_url:
            continue

        sub_cat_name = sub_cat_name.strip()
        sub_cat_url = sub_cat_url.strip()

        # Parse child categories
        child_categories = sub_cat.xpath('.//ul[contains(@class, "navPage-childList")]/li[contains(@class, "navPage-childList-item")]')

        if child_categories:
            for child_cat in child_categories:
                child_cat_name = child_cat.xpath('./a[contains(@class, "navPage-childList-action")]/text()').get()
                child_cat_url = child_cat.xpath('./a[contains(@class, "navPage-childList-action")]/@href').get()

                if child_cat_name and child_cat_url:
                    doc = {
                        "main_category_name": main_cat_name,
                        "main_category_url": main_cat_url,
                        "sub_category_name": sub_cat_name,
                        "sub_category_url": sub_cat_url,
                        "child_category_name": child_cat_name.strip(),
                        "child_category_url": child_cat_url.strip()
                    }
                    collection.insert_one(doc)
                    logger.info(f"Saved child category: {doc}")
        else:
            # Save sub-category only if no child category exists
            doc = {
                "main_category_name": main_cat_name,
                "main_category_url": main_cat_url,
                "sub_category_name": sub_cat_name,
                "sub_category_url": sub_cat_url,
                "child_category_name": "",
                "child_category_url": ""
            }
            collection.insert_one(doc)
            logger.info(f"Saved sub category: {doc}")

logger.info("All sub and child categories saved to MongoDB.")
