import logging
from pymongo import MongoClient

# MongoDB Setup
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "target_db"

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
parser_collection = "parser"

category_collection = db["category_collection"]
sub_category_collection = db["sub_category_collection"]
crawler_collection = db["crawler_final"] 



# Logging setup
LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "Referer": "https://www.target.com/",
    "Origin": "https://www.target.com",
    "Accept": "application/json"
}

FILE_NAME_FULLDUMP = "Target_products.csv"