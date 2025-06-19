import logging
import requests
from parsel import Selector
from mongoengine import connect, disconnect
from items import ProductItem
from settings import MONGO_URI, MONGO_DB, HEADERS

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class AlmayaProductParser:
    def __init__(self):
        connect(alias="default", db=MONGO_DB, host=MONGO_URI)

    def update_product_descriptions(self):
        logger.info("Fetching all products from database...")
        products = ProductItem.objects().only(
            "product_name", "product_url", "product_price", "currency", "product_image"
        )

        for product in products:
            product_name = product.product_name or ""
            product_url = product.product_url or ""
            product_price = product.product_price or ""
            currency = product.currency or ""
            product_image = product.product_image or ""

            description = self.fetch_description(product_url)

            # Update product_description and save
            product.product_description = description
            try:
                product.save()
                logger.info({
                    "product_name": product_name,
                    "product_url": product_url,
                    "product_price": product_price,
                    "currency": currency,
                    "product_image": product_image,
                    "product_description": description
                })
            except Exception as e:
                logger.error(f" Failed to update product {product_url}: {e}")

    def fetch_description(self, url):
        try:
            response = requests.get(url, headers=HEADERS, timeout=10)
            if response.status_code == 200:
                sel = Selector(text=response.text)
                desc = sel.xpath('normalize-space(//div[@class="full-description"])').get(default="").strip()
                return desc
            else:
                logger.warning(f" Non-200 response while fetching description: {url}")
        except Exception as e:
            logger.error(f" Error fetching description from {url}: {e}")
        return ""
        

    def close(self):
        disconnect()
        logger.info("MongoDB connection closed.")


if __name__ == "__main__":
    parser = AlmayaProductParser()
    parser.update_product_descriptions()
    parser.close()
