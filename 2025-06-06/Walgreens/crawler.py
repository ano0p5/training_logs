from playwright.sync_api import sync_playwright
from parsel import Selector
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
import re
import time
import logging

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client['walgreens_db']
collection = db['product_ids']

# Create unique index 
collection.create_index(
    [("extracted_prod_id", 1)],
    unique=True,
    name="unique_extracted_prod_id"
)

# Walgreens product ID list
product_ids = [
    "40000166909", "40000173032", "40000173033", "40000173034", "40000175576",
    "40000256026", "40000256029", "40000265333", "40000265334", "40000265337",
    "40000265338", "40000265339", "40000275193", "40000275199", "40000275201",
    "40000275210", "40000276743", "40000277084", "40000277201", "40000307743",
    "40000307758", "40000308025", "40000314795", "40000317933", "40000317954",
    "40000317961", "40000332419", "40000332420", "40000332421", "40000381524",
    "40000382865", "40000404620", "40000412878", "40000417935", "40000446777",
    "40000490530", "40000501525", "40000558093", "40000582769", "40000583312",
    "40000583527", "40000586260", "40000586403", "40000586529", "40000636278",
    "40000643767", "40000647316", "40000656702", "40000667926", "40000667960",
    "40000680404", "40000682117", "40000694979", "40000694984", "40000711719",
    "40000711757", "40000723149", "40000730122", "40000730142", "40000751714",
    "40000757328", "40000757329", "40000757503", "40000761338", "40000763357",
    "40000767732", "40000783179", "40000790934", "40000800415", "40000826766",
    "40000829879", "40000831763", "40000848474", "40000848898", "40000851284",
    "40000851287", "40000875715", "40000877918", "40000878287", "40000878534",
    "40000892108", "40000897273", "40000899023", "40000899025", "40000899026",
    "40000901484", "40000920165", "40000934277", "40000935449", "40000942501",
    "40000942502", "40000944675", "40000980267", "40000991454", "40000993465",
    "40000995034", "40000995035", "40000995036", "40000995037"
]

base_url = "https://www.walgreens.com/search/results.jsp?Ntt={}&analyticsTag=global"
prod_id_pattern = re.compile(r'ID=(prod\d+)-product')

def extract_product_urls(html):
    sel = Selector(text=html)
    links = sel.xpath('//li[contains(@class,"item")]//a[contains(@href,"/store/c/")]/@href').getall()
    full_links = ["https://www.walgreens.com" + link.strip() for link in links if link.strip().startswith("/store/c/")]
    pdp_urls = [url for url in full_links if prod_id_pattern.search(url)]
    return list(set(pdp_urls))

# Playwright context
with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    for pid in product_ids:
        url = base_url.format(pid)
        logger.info(f"Processing product ID: {pid}")
        page.goto(url, timeout=90000)
        page.wait_for_selector('li.item a[href*="/store/c/"]', timeout=30000)

        html = page.content()
        product_urls = extract_product_urls(html)

        if product_urls:
            for product_url in product_urls:
                match = prod_id_pattern.search(product_url)
                extracted_prod_id = match.group(1) if match else ""

                item = {
                    "product_id": pid,
                    "product_url": product_url,
                    "extracted_prod_id": extracted_prod_id
                }

                try:
                    collection.insert_one(item)
                    logger.info(f"Inserted: {item}")
                except DuplicateKeyError:
                    logger.warning(f"Duplicate skipped: {item}")
        else:
            logger.info(f"No product URLs found for: {pid}")

        time.sleep(2)

    browser.close()
    logger.info("Scraping completed.")
