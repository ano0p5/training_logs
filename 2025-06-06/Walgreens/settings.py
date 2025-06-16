# settings.py

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "walgreen_db"
COLLECTION_NAME = "product_ids"
PARSER_COLLECTION_NAME = "parser"


HEADERS = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "content-type": "application/json"
}
