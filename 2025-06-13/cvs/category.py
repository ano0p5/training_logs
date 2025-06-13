import re
import json
from parsel import Selector
from pymongo import MongoClient

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["cvs"]
collection = db["sub_cat"]

# File and base URL
base_url = "https://www.cvs.com"
file_path = "/home/anoop/training_log/2025-06-13/html/Shop Beauty, Vitamins, Medicine & Everyday Essentials _ CVS Pharmacy.html"

# Load HTML and extract JSON
html = open(file_path, 'r', encoding='utf-8').read()
script = Selector(text=html).xpath('//script[@id="variableScript"]/text()').get()
data = json.loads(re.search(r'var\s+initialState\s*=\s*({.*?})\s*;', script, re.DOTALL).group(1))
cats = data["allCategories"]["allCategories"]["children"]

# Extract and insert subcategory URLs
for cat in cats:
    main_cat = cat['title']
    for sub in cat.get("children", []):
        subcat_data = {
            "main_category": main_cat,
            "subcategory": sub["title"],
            "url": f"{base_url}{sub['url']}"
        }
        collection.insert_one(subcat_data)
