import logging
from pymongo import MongoClient

# Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# MongoDB Config
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "aldi_test"
CRAWLER_COLLECTION = "aldi_crawler"
PARSER_COLLECTION = "aldi_parser"

# MongoDB Client and DB
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

# Collections
crawler_collection = db[CRAWLER_COLLECTION]
parser_collection = db[PARSER_COLLECTION]

# Ensure Index
parser_collection.create_index("unique_id", unique=True)


# Request Headers
headers = {
    "user-agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    ),
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "referer": "https://www.aldi.nl/"
}

# Base URL Constants
ALDI_PRODUCT_URL_BASE = "https://www.aldi.nl/product/"
ALDI_PRODUCT_URL_SUFFIX = ".html"

# Category Mapping
CATEGORY_MAPPING = {
    "verse zuivel": "verse-zuivel",
    "kaas": "kaas",
    "frisdrank": "frisdrank",
    "chips noten": "chips"
}

MONGO_COLLECTION_DATA = "aldi_parser"

# Optional CSV export file name
FILE_NAME_FULLDUMP = "aldi_products_export.csv"
