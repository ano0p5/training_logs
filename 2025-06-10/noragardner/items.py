import logging
from curl_cffi import requests
from pymongo import MongoClient
from datetime import datetime, timedelta
from parsel import Selector
from dateutil.relativedelta import relativedelta
from settings import MONGO_URI, MONGO_DB, MONGO_COLLECTION, headers

# MongoDB setup
mongo = MongoClient(MONGO_URI)
db = mongo[MONGO_DB]
collection = db[MONGO_COLLECTION]


def convert_relative_time(text):
    """Convert '1 month ago' or '2 weeks ago' into a datetime string (e.g., 2025-06-11)."""
    now = datetime.now()
    num, unit, *_ = text.lower().split()

    num = int(num)

    if "day" in unit:
        return (now - timedelta(days=num)).strftime("%Y-%m-%d")
    elif "week" in unit:
        return (now - timedelta(weeks=num)).strftime("%Y-%m-%d")
    elif "month" in unit:
        return (now - relativedelta(months=num)).strftime("%Y-%m-%d")
    elif "year" in unit:
        return (now - relativedelta(years=num)).strftime("%Y-%m-%d")
    else:
        return ""


def check_product_urls():
    urls = collection.distinct("pdp_url")
    for url in urls:
        if not url:
            continue

        full_url = url if url.startswith("http") else "https://noragardner.com" + url

        try:
            response = requests.get(full_url, headers=headers, timeout=10)
            print(f"{full_url} --> Status Code: {response.status_code}")
            if response.status_code == 200:
                selector = Selector(response.text)

                name = selector.css("h1.product-single__title::text").get(default="").strip()
                price = selector.css("span.product__price::text").get(default="").strip().replace("$", "")
                category_name = selector.css("span.product_type a::text").get(default="").strip()
                added_time_text = selector.css("div.kl_reviews__review__timestamp::text").get(default="").strip()
                added_time = convert_relative_time(added_time_text) if added_time_text else ""

                item = {
                    "name": name,
                    "pdp_url": full_url,
                    "price": price,
                    "category_name": category_name,
                    "added_time": added_time
                }

                print(item)  # or save to MongoDB

        except requests.exceptions.RequestException as e:
            print(f"{full_url} --> Error: {e}")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    check_product_urls()
    mongo.close()
