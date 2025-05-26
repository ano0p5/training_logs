from curl_cffi import requests
from settings import collection ,logging

headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "referer": "https://www.ah.nl"
}

class AHCrawler:
    def __init__(self):
        self.base_url = "https://www.ah.nl"
        self.size = 36
        self.collection = collection

    def start(self):
        categories = [("chips", "997"), ("frisdrank", "1083")]

        for slug, tax in categories:
            page = 1
            while True:
                logging.info(f"Fetching page {page} for category {slug}")
                url = f"https://www.ah.nl/zoeken/api/products/search?page={page}&size={self.size}&taxonomySlug={slug}&taxonomy={tax}"
                headers["referer"] = f"{self.base_url}/zoeken/{slug}"
                response = requests.get(url, headers=headers)
                if response.status_code != 200 or not self.parse_items(response.json()):
                    logging.info(f"Stopping pagination at page {page} for category {slug}")
                    break
                page += 1


    def parse_items(self, data):
        cards = data.get("cards", [])
        items = []

        for card in cards:
            products = card.get("products", [])
            for product in products:
                item = {}
                item["unique_id"] = str(product.get("id", ""))
                item["product_name"] = product.get("title", "")
                item["pdp_url"] = self.base_url + product.get("link", "")
                logging.info(item)
                try:
                   self.collection.insert_one(item)
                except:
                    pass

                items.append(item)  

        return items if items else None

if __name__ == "__main__":
    crawler = AHCrawler()
    crawler.start()
