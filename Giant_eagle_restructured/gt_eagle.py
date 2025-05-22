import requests
from datetime import datetime
from pymongo.errors import DuplicateKeyError
from settings import payload, logger, parser_collection


class GiantEagleParser:
    def __init__(self, category_id="1146", count=34):
        self.url = "https://core.shop.gianteagle.com/api/v2"
        self.headers = {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=utf-8",
            "origin": "https://www.gianteagle.com",
            "referer": "https://www.gianteagle.com/",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        }
        self.payload = payload
        self.category_id = category_id
        self.count = count

    def get_payload(self, cursor=None):
        self.payload["variables"] = {
            "filters": {
                "query": "",
                "brandIds": [],
                "healthClaimIds": [],
                "savings": [],
                "circular": False,
                "categoryId": self.category_id,
                "excludeRestricted": False
            },
            "store": {
                "storeCode": "VIRTUAL"
            },
            "sort": "bestMatch",
            "count": self.count
        }

        if cursor:
            self.payload["variables"]["cursor"] = cursor

        return self.payload

    def fetch_products(self):
        all_products = []
        cursor = None
        has_next_page = True

        while has_next_page:
            logger.info(f"Fetching products for category {self.category_id}, cursor: {cursor}")
            response = requests.post(self.url, json=self.get_payload(cursor), headers=self.headers)

            if response.status_code != 200:
                logger.error(f"Failed request with status code {response.status_code}")
                break

            json_response = response.json()
            product_list = json_response.get("data", {}).get("products", {}).get("edges", [])
            page_info = json_response.get("data", {}).get("products", {}).get("pageInfo", {})

            for product_entry in product_list:
                product_data = product_entry.get("node", {})
                all_products.append(product_data)

            has_next_page = page_info.get("hasNextPage", False)
            cursor = page_info.get("endCursor")

        return all_products

    def parse_product(self, product):

        unique_id = str(product.get("sku", "") or product.get("id", ""))
        competitor_name = "gianteagle"
        extraction_date = datetime.now().strftime("%Y-%m-%d")
        product_name = str(product.get("name", ""))
        brand = str(product.get("brand", "") or product.get("vendor", ""))
        grammage_quantity = str(product.get("unitQty", ""))
        grammage_unit = str(product.get("units", ""))

        categoryNames = product.get("categoryNames", [])
        breadcrumb = " > ".join(categoryNames) if categoryNames else ""

        price = str(product.get("price", ""))
        regular_price = price
        selling_price = price
        offers = product.get("offers", [])
        promotion_description = "; ".join([o.get("title", "") for o in offers]) if offers else ""
        currency = "USD"
        pdp_url = f"https://www.gianteagle.com/grocery/search/product/{unique_id}" if unique_id else ""
        product_description = str(product.get("description", ""))
        instructions = str(product.get("instructions", ""))
        storage_instructions = str(product.get("storageInstructions", ""))
        country_of_origin = str(product.get("countryOfOrigin", ""))
        img_urls = offers[0].get("image", "") if offers and "image" in offers[0] else ""
        upc = str(product.get("sku", ""))
        ingredients = str(product.get("ingredients", ""))

        item = {}
        item["unique_id"] = unique_id
        item["competitor_name"] = competitor_name
        item["extraction_date"] = extraction_date
        item["product_name"] = product_name
        item["brand"] = brand
        item["grammage_quantity"] = grammage_quantity
        item["grammage_unit"] = grammage_unit

        for i in range(1, 6):
            key = f"producthierarchy_level{i}"
            item[key] = str(categoryNames[i - 1]) if len(categoryNames) >= i else ""

        item["regular_price"] = regular_price
        item["selling_price"] = selling_price
        item["promotion_description"] = promotion_description
        item["currency"] = currency
        item["breadcrumb"] = breadcrumb
        item["pdp_url"] = pdp_url
        item["product_description"] = product_description
        item["instructions"] = instructions
        item["storage_instructions"] = storage_instructions
        item["country_of_origin"] = country_of_origin
        item["img_urls"] = img_urls
        item["upc"] = upc
        item["ingredients"] = ingredients

        try:
            parser_collection.insert_one(item)
            logger.info(f"Inserted: {unique_id}")
        except :
            pass

    def run(self):
        products = self.fetch_products()
        for product_data in products:
            self.parse_product(product_data) 

if __name__ == "__main__":
    parser = GiantEagleParser()
    parser.run()