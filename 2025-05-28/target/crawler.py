from settings import logger, HEADERS, crawler_collection
import requests
import html

class TargetCrawler:
    def __init__(self):
        self.base_url = "https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2"
        self.params = {
            "key": "9f36aeafbe60771e321a7cc95a78140772ab3e96",
            "category": "18y1l",
            "channel": "WEB",
            "count": "24",
            "default_purchasability_filter": "true",
            "include_dmc_dmr": "true",
            "include_sponsored": "true",
            "include_review_summarization": "false",
            "new_search": "false",
            "offset": "0",
            "page": "/c/18y1l",
            "platform": "desktop",
            "pricing_store_id": "2166",
            "scheduled_delivery_store_id": "2166",
            "spellcheck": "true",
            "store_ids": "2166,1338,2182,2530,2130",
            "useragent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
            "visitor_id": "0196F7E091610201A9DF8DB51BD38EEB",
            "zip": "04030"
        }
        crawler_collection.create_index("unique_id", unique=True)


    def start(self):
        offset = 0
        while True:
            self.params["offset"] = str(offset)
            try:
                response = requests.get(self.base_url, params=self.params, headers=HEADERS)
            except Exception as e:
                logger.error(f"Request error: {e}")
                break

            if response.status_code != 200:
                logger.warning(f"Request failed with status code {response.status_code}")
                break

            if not self.crawl(response):
                break

            offset += 24

    def crawl(self, response):
        data = response.json()
        products = data.get("data", {}).get("search", {}).get("products", [])

        if not products:
            logger.info("No more products found.")
            return

        for product in products:
            item = product.get("item", {})
            enrichment = item.get("enrichment", {})
            items = {
                "unique_id": product.get("tcin", ""),
                "buy_url": enrichment.get("buy_url", ""),
                "title": html.unescape(item.get("product_description", {}).get("title", ""))
            }

            logger.info(items)

            crawler_collection.insert_one(items)



if __name__ == "__main__":
    TargetCrawler().start()