# settings.py

# MongoDB Settings
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "noragardner"
MONGO_COLLECTION = "products"
MONGO_CATEGORY_COLLECTION = "category_urls"
MONGO_COLLECTION_REVIEWS = "PARSER"
CSV_FILE = "nora_gardner_export.csv"

# Request Headers
headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "content-type": "application/json"
}
