from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "mmlafleur"
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]


HEADERS = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "content-type": "application/json"
}