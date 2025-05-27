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