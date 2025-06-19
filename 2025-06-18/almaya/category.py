import logging
import requests
from parsel import Selector
from mongoengine import connect, disconnect
from mongoengine.errors import NotUniqueError
from items import AlmayaCategoryItem
from settings import MONGO_URI, MONGO_DB, HEADERS

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


class Crawler:
    """Almaya Category URL Extractor"""

    def __init__(self):
        connect(alias="default", host=MONGO_URI, db=MONGO_DB)
        self.start_url = "https://www.almayaonline.com/"

    def start(self):
        response = requests.get(self.start_url, headers=HEADERS)
        if response.status_code == 200:
            self.parse(response)
        else:
            logger.error(f"Failed to load homepage: {response.status_code}")

    def parse(self, response):
        sel = Selector(text=response.text)
        containers = sel.xpath('//ul[@class="sublist"]/li')

        for container in containers:
            main_category = container.xpath('./a/text()').get(default="").strip()
            sub_links = container.xpath('.//ul[@class="sublist first-level"]/li/a')

            for sub in sub_links:
                subcategory = sub.xpath('./text()').get(default="").strip()
                sub_url = sub.xpath('./@href').get(default="").strip()

                if not sub_url.startswith("http"):
                    sub_url = f"https://www.almayaonline.com{sub_url}"

                item = {}
                item["main_category"] = main_category
                item["subcategory"] = subcategory
                item["url"] = sub_url

                logger.info(item)

                try:
                    AlmayaCategoryItem(**item).save()
                except NotUniqueError:
                    logger.info(f"URL already exists: {sub_url}")
                except Exception as e:
                    logger.error(f"MongoDB insert error for {sub_url}: {e}")

    def close(self):
        disconnect()
        logger.info("MongoDB connection closed.")


if __name__ == "__main__":
    crawler = Crawler()
    crawler.start()
    crawler.close()
