import logging

# Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# MongoDB Configuration
MONGO_DB = "aldi"
MONGO_COLLECTION_DATA = "aldi_parser1"  # Target for parsed product data

# Algolia API Configuration
ALGOLIA_APP_ID = "2HU29PF6BH"
ALGOLIA_API_KEY = "686cf0c8ddcf740223d420d1115c94c1"
ALGOLIA_INDEX_NAME = "an_prd_nl_nl_products"
ALGOLIA_QUERY_URL = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/*/queries"

# Request Headers
headers = {
    "user-agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    ),
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "referer": "https://www.aldi.nl/"
}

# Algolia Headers for Product Query
ALGOLIA_HEADERS = {
    "Content-Type": "application/json",
    "x-algolia-api-key": ALGOLIA_API_KEY,
    "x-algolia-application-id": ALGOLIA_APP_ID,
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

# Optional CSV export file name
FILE_NAME_FULLDUMP = "aldi_products_export.csv"
