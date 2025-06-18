from pymongo import MongoClient
import logging

MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "petsathome"
CRAWLER_COLLECTION = "crawler"
PARSER_COLLECTION = "parser"

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
crawler_collection = db[CRAWLER_COLLECTION]
parser_collection = db[PARSER_COLLECTION]

CSV_EXPORT_FILE = "petsathome.csv"

headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "content-type": "application/json"
}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s:%(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("PetsAtHome")