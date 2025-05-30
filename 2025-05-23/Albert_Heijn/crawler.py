from curl_cffi import requests
from settings import collection, logging, headers,BASE_URL


class AHCrawler:
    def __init__(self):
        collection.create_index("unique_id", unique=True)  

    def start(self):
        categories = [("chips", "997"), ("frisdrank", "1083")]

        for slug, tax in categories:
            page = 1
            while True:
                logging.info(f"Fetching page {page} for category {slug}")
                url = f"https://www.ah.nl/zoeken/api/products/search?page={page}&size=36&taxonomySlug={slug}&taxonomy={tax}"
                
                headers["referer"] = f"{BASE_URL}/zoeken/{slug}"
                
                response = requests.get(url, headers=headers)
                if response.status_code != 200:
                    logging.warning(f"Failed to fetch URL: {url}, Status: {response.status_code}")
                    break
                data = response.json()
                cards = data.get("cards", [])
                if not cards:
                    logging.info(f"No more cards found, stopping pagination at page {page} for category {slug}")
                    break

                self.parse_items(data)
                page += 1

    def parse_items(self, data):
        cards = data.get("cards", [])
        for card in cards:
            for product in card.get("products", []):
                item = {
                    "unique_id": str(product.get("id", "")),
                    "product_name": product.get("title", ""),
                    "pdp_url": BASE_URL + product.get("link", "")
                }

                logging.info(f"Parsed item: {item}")

                collection.insert_one(item)  


if __name__ == "__main__":
    crawler = AHCrawler()
    crawler.start()
