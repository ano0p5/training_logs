from pymongo import MongoClient
import re

client = MongoClient("mongodb://localhost:27017/")
db = client['walgreens_db']
source = db['product_urls']
target = db['product_ids']

pattern = re.compile(r'ID=(prod\d+)-product')
prod_ids = set()

for doc in source.find({}, {"product_url": 1}):
    url = doc.get("product_url", "")
    match = pattern.search(url)
    if match:
        prod_ids.add(match.group(1))

target.insert_one({"prod_ids": sorted(prod_ids)})
