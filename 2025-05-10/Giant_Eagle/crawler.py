import requests
from settings import headers, url, get_payload, crawler_collection, logger

class Crawler:
    def start(self):
        cursor = None
        while True:
            payload = get_payload(cursor=cursor)
            response = requests.post(url, headers=headers, json=payload)
            if response.status_code != 200:
                logger.error(f"Status: {response.status_code}")
                break
            data = response.json()
            edges = data.get('data', {}).get('products', {}).get('edges', [])
            if not edges:
                break
            for edge in edges:
                product = edge.get('node', {})
                item = {}
                item['sku'] = product.get('sku', '')
                item['name'] = product.get('name', '')
                item['brand'] = product.get('brand', '')
                item['product_url'] = f"https://www.gianteagle.com/grocery/search/product/{item['sku']}"
                logger.info(item)
                try:
                    crawler_collection.update_one({"sku": item['sku']}, {"$set": item}, upsert=True)
                except Exception as e:
                    logger.error(e)
            pageInfo = data.get('data', {}).get('products', {}).get('pageInfo', {})
            cursor = pageInfo.get('endCursor')
            if not pageInfo.get('hasNextPage'):
                break

if __name__ == "__main__":
    Crawler().start()
