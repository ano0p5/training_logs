import re
import requests
from parsel import Selector
from pymongo import MongoClient
from settings import logger, crawler_collection, headers, parser_collection


class Parser:
    def __init__(self):
        self.headers = headers
        self.crawler_collection = crawler_collection
        self.parser_collection = parser_collection

    def fetch_product(self):
        for product in self.crawler_collection.find({}):
            product_url = product.get("product_url", "").strip()
            if not product_url:
                continue

            try:
                response = requests.get(product_url, headers=self.headers, timeout=10)
                selector = Selector(text=response.text)

                #DB fields
                ean = product.get("ean", "")
                product_name = product.get("product_name", "")
                product_image = product.get("product_image", "")
                promotion_description = product.get("promotion_description", "")
                selling_price = str(product.get("selling_price", "")).replace("£", "").strip()
                original_price = str(product.get("original_price", "")).replace("£", "").strip()
                currency = "pounds"
                grammage_unit = product.get("grammage_unit", "")
                rating = product.get("rating", "")
                reviews_count = product.get("reviews_count", "")

                # XPaths
                long_description = selector.xpath('//div[@class="truncated-text_root__EHwzP description_long-description__QbAoG"]//p[1]/text()').get(default="")
                short_description = selector.xpath('//b[@class="description_short-description__wAVhH"]/text()').get(default="").strip()
                suitable_for = selector.xpath('//div[@class="heading-with-text_root__0fF3S"]/div[@class="heading-with-text_inline__o5liF heading-with-text_mb-0__Om1Tx"]/text()').get(default="").strip()
                dimensions_value = selector.xpath('//p[@class="description_dimensions-value__0khx3"]/text()').get(default="").strip()
                product_id = selector.xpath('//p[@class="description_product-code__kqIiU"]/text()').get(default="").replace("Product code: ", "").strip()
                composition_list = selector.xpath('//h3[text()="Composition"]/following-sibling::p[1]/text()').get(default="").strip()
                analytical_constituents = selector.xpath('//p[contains(text(), "Analytical Constituents")]/span/text()').get(default="").strip()
                nutritional_additives = selector.xpath('//p[contains(text(), "Nutritional Additives and Trace Elements")]/span/text()').get(default="").strip()
                sensory_additives = selector.xpath('//p[contains(text(), "Sensory Additives")]/span/text()').get(default="").strip()
                technological_additives = selector.xpath('//p[contains(text(), "Technological Additives")]/span/text()').get(default="").strip()

                # Assign to dictionary
                item = {}
                item["ean"] = ean
                item["product_name"] = product_name
                item["product_url"] = product_url
                item["product_image"] = product_image
                item["promotion_description"] = promotion_description
                item["selling_price"] = selling_price
                item["original_price"] = original_price
                item["currency"] = currency
                item["grammage_unit"] = grammage_unit
                item["rating"] = rating
                item["reviews_count"] = reviews_count
                item["long_description"] = long_description
                item["short_description"] = short_description
                item["suitable_for"] = suitable_for
                item["dimensions_value"] = dimensions_value
                item["product_id"] = product_id
                item["composition_list"] = composition_list
                item["analytical_constituents"] = analytical_constituents
                item["nutritional_additives"] = nutritional_additives
                item["sensory_additives"] = sensory_additives
                item["technological_additives"] = technological_additives

                logger.info(item)
                try:
                    self.parser_collection.insert_one(item)
                except Exception as e:
                    logger.warning(f"Mongo insert error for {product_url}: {e}")


            except Exception as e:
                logger.warning(f"Failed to fetch {product_url} - {e}")


if __name__ == "__main__":
    fetcher = Parser()
    fetcher.fetch_product()
