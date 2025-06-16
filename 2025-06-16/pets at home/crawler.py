import requests
from parsel import Selector
from settings import crawler_collection, headers,logger
import re

class Crawler:
    def __init__(self, ean_list):
        self.ean_list = ean_list

    def fetch_product(self):
        for ean in self.ean_list:
            url = f"https://www.petsathome.com/search?searchTerm='{ean}'"
            try:
                response = requests.get(url, headers=headers, timeout=10)

                sel = Selector(text=response.text)
                products = sel.xpath('//article[contains(@class,"product-tile_root")]')
                logger.info(f"Found {len(products)} products.")

                for product in products:
                    product_url = product.xpath('.//a[@class="product-tile_wrapper__T0IlX"]/@href').get(default='').strip()
                    if product_url:
                        product_url = f"https://www.petsathome.com{product_url}"

                    product_name = product.xpath('.//h3[contains(@class,"product-tile_title")]/text()').get(default='').strip()
                    image_url = product.xpath('.//img[contains(@class,"product-tile_image")]/@src').get(default='').strip()
                    size = product.xpath('.//p[contains(@class,"product-tile_weights")]/text()').get(default='').strip()
                    price = product.xpath('.//p[contains(@class,"product-tile_price")]/text()').get(default='').strip()
                    price_was = product.xpath('.//p[contains(@class,"product-tile_original")]/text()').get(default='').strip()
                    promotion_text = product.xpath('.//p[contains(@class,"product-tile_promotion")]/text()').get(default='').strip()
                    reviews_text = product.xpath('.//span[contains(@class,"product-tile_reviews")]/text()').get(default='').strip()
                    reviews_count = re.search(r'\d+', reviews_text)
                    reviews_count = reviews_count.group() if reviews_count else ''                   
                    rating = str(len(product.xpath('.//span[@aria-label="Star rating"]/svg')))

                    grammage_quantity = ""
                    match = re.search(r'(\d+)\s*[xX×]\s*(\d+(?:\.\d+)?)\s*([a-zA-Z]+)', size)
                    if match:
                        count = int(match.group(1))
                        weight = float(match.group(2))
                        unit = match.group(3)
                        grammage_quantity = f"{count * weight}{unit}"


                    item = {}
                    item["ean"] = ean
                    item["product_name"] = product_name
                    item["product_url"] = product_url
                    item["product_image"] = image_url
                    item["promotion_description"] = promotion_text
                    item["selling_price"] = price
                    item["original_price"] = price_was
                    item["grammage_unit"] = grammage_quantity
                    item["rating"] = rating
                    item["reviews_count"] = reviews_count

                
                crawler_collection.insert_one(item)
                logger.info(f"[{ean}] Inserted into DB")

            except Exception as e:
                logger.error(f"[{ean}] Error: {e}")


if __name__ == "__main__":
    ean_list = [
        "76344107521", "76344107491", "76344108115", "76344107538", "76344118572",
        "76344105398", "76344107262", "76344108320", "76344116639", "76344106661",
        "64992523206", "64992525200", "64992523602", "64992525118", "64992714369",
        "64992714376", "64992719814", "64992719807", "5060184240512", "5060184240703",
        "5060184240598", "5060184244909", "5060184240109", "5425039485256", "5425039485010",
        "5425039485263", "5425039485034", "5425039485317", "5407009646591", "5407009640353",
        "5407009640391", "5407009640636", "5407009641022", "3182551055672", "3182551055788",
        "3182551055719", "3182551055825", "9003579008362", "3182550704625", "3182550706933",
        "9003579013793", "9003579013861"
    ]

    obj = Crawler(ean_list)
    obj.fetch_product()
