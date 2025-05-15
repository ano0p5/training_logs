import logging
import settings
import requests as request

class Crawler:
    def __init__(self):
        self.algolia_app_id = "2HU29PF6BH"
        self.algolia_api_key = "686cf0c8ddcf740223d420d1115c94c1"
        self.algolia_index_name = "an_prd_nl_nl_products"
        self.algolia_query_url = f"https://{self.algolia_app_id}-dsn.algolia.net/1/indexes/*/queries"
        self.algolia_headers = {
            "Content-Type": "application/json",
            "x-algolia-api-key": self.algolia_api_key,
            "x-algolia-application-id": self.algolia_app_id,
        }

        self.collection = settings.crawler_collection

    def start(self):
        URLS = [
            "https://www.aldi.nl/producten/verse-zuivel.html",
            "https://www.aldi.nl/producten/kaas.html",
            "https://www.aldi.nl/producten/frisdrank.html",
            "https://www.aldi.nl/producten/chips-noten.html"
        ]
        for url in URLS:
            category_filter = self.extract_category_for_algolia(url)
            if category_filter:
                payload = {
                    "requests": [
                        {
                            "indexName": self.algolia_index_name,
                            "params": f"filters=categories%3A{category_filter}&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=1000&page=0"
                        }
                    ]
                }

                response = request.post(self.algolia_query_url, headers=self.algolia_headers, json=payload)
                if response.status_code == 200:
                    algolia_data = response.json()
                    extracted_products = self.parse_algolia_response(algolia_data)
                    if extracted_products:
                        self.collection.insert_many(extracted_products)
                        category_name = url.split('/')[-1].replace(".html", "").replace("-", " ").title()
                        logging.info(f"Saved {len(extracted_products)} products for category: {category_name} to MongoDB.")
                    else:
                        logging.info(f"No products found for URL: {url}.")
                else:
                    logging.error(f"Failed to fetch data for {url}, status code: {response.status_code}")
            else:
                logging.warning(f"Could not extract Algolia-compatible category for URL: {url}")

    def extract_category_for_algolia(self, url):
        parts = url.split('/')
        if len(parts) > 1:
            category_part = parts[-1].replace(".html", "").replace("-", " ")
            return settings.CATEGORY_MAPPING.get(category_part, category_part.replace(" ", "-"))
        return ""

    def parse_algolia_response(self, algolia_data):
        extracted_products = []
        results = algolia_data.get("results", [])
        if results:
            hits = results[0].get("hits", [])
            for hit in hits:
                product = self.extract_product(hit)
                extracted_products.append(product)
        return extracted_products

    def extract_product(self, hit):
        item = {}
        item['product_name'] = hit.get("variantName", "")
        item['brand'] = hit.get("brandName", "")
        item['pdp_url'] = f"{settings.ALDI_PRODUCT_URL_BASE}{hit.get('productSlug', '')}-{hit.get('objectID', '')}{settings.ALDI_PRODUCT_URL_SUFFIX}"
        item['image_url'] = hit.get("images", [{}])[0].get("url", "") if hit.get("images") else ""
        
        return item 

if __name__ == "__main__":
    crawler = Crawler()
    crawler.start()
