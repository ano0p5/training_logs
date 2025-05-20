import requests
from datetime import datetime
from settings import headers, url, get_payload, parser_collection, logger


class Parser:
    def __init__(self):
        self.cursor = None

    def parse_product(self, product):
        item = {}
        item["unique_id"] = str(product.get("sku", "") or product.get("id", ""))
        item["competitor_name"] = "gianteagle"
        item["extraction_date"] = datetime.now().strftime("%Y-%m-%d")
        item["product_name"] = str(product.get("name", ""))
        item["brand"] = str(product.get("brand", "") or product.get("vendor", ""))
        item["grammage_quantity"] = str(product.get("unitQty", ""))
        item["grammage_unit"] = str(product.get("units", ""))
        categoryNames = product.get("categoryNames", [])
        item["producthierarchy_level1"] = str(categoryNames[0]) if len(categoryNames) > 0 else ""
        item["producthierarchy_level2"] = str(categoryNames[1]) if len(categoryNames) > 1 else ""
        item["producthierarchy_level3"] = str(categoryNames[2]) if len(categoryNames) > 2 else ""
        item["producthierarchy_level4"] = str(categoryNames[3]) if len(categoryNames) > 3 else ""
        item["producthierarchy_level5"] = str(categoryNames[4]) if len(categoryNames) > 4 else ""
        price = product.get("price", "")
        item["regular_price"] = str(price)
        item["selling_price"] = str(price)
        offers = product.get("offers", [])
        item["promotion_description"] = "; ".join([o.get("title", "") for o in offers]) if offers else ""
        item["currency"] = "USD"
        item["beadcrumb"] = " > ".join(categoryNames) if categoryNames else ""
        item["pdp_url"] = str(product.get("pdp_url", ""))
        item["product_description"] = str(product.get("description", ""))
        item["instructions"] = str(product.get("instructions", ""))
        item["storage_instructions"] = str(product.get("storageInstructions", ""))
        item["country_of_origin"] = str(product.get("countryOfOrigin", ""))
        item["img_urls"] = offers[0].get("image", "") if offers and "image" in offers[0] else ""
        item["upc"] = str(product.get("sku", ""))
        item["ingredients"] = str(product.get("ingredients", ""))
        return item


    def parse_and_store(self, product):
        item = self.parse_product(product)
        parser_collection.update_one({"unique_id": item["unique_id"]}, {"$set": item}, upsert=True)

    def start(self):
        while True:
            response = requests.post(url, headers=headers, json=get_payload(cursor=self.cursor))
            data = response.json()
            edges = data.get("data", {}).get("products", {}).get("edges", [])
            if not edges:
                break

            for edge in edges:
                self.parse_and_store(edge.get("node", {}))

            page_info = data["data"]["products"]["pageInfo"]
            self.cursor = page_info.get("endCursor")
            if not page_info.get("hasNextPage"):
                break

if __name__ == "__main__":
    parser = Parser()
    parser.start()
