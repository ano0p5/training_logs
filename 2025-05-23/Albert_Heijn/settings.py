import logging
from pymongo import MongoClient

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "ah_db"
Crawler_Collection = "ah_crawler"
Parser_Collection = "ah_parser"

# MongoDB Initialization
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
collection = db[Crawler_Collection]


# Logging Configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Export Configuration 
FILE_NAME_FULLDUMP = "ah_products.csv"

BASE_URL = "https://www.ah.nl"

headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "referer": "https://www.ah.nl"
}

HEADERS = {
            'referer': 'https://www.ah.nl/producten/product/wi585895/arla-cultura-blauwe-bes',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        }
