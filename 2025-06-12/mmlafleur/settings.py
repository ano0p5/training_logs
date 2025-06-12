from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "mmlafleur"
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
