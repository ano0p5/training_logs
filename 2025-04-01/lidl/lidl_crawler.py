import requests
from parsel import Selector
from pymongo import MongoClient

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "lidl"
COLLECTION_NAME = "category_urls"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

BASE_URL = "https://www.lidl.nl"
url = f"{BASE_URL}/online"
headers = {
    "referer": BASE_URL,
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    selector = Selector(text=response.text)
    data_to_insert = []
    
    for category in selector.css('.ATheSitemap__Category'):
        category_name = category.css('.ATheSitemap__Headline::text').get()
        
        for link in category.css('.ATheSitemap__Link'):
            subcategory_name = link.css('::text').get()
            subcategory_url = link.attrib.get('href')
            full_url = f"{BASE_URL}{subcategory_url}" if subcategory_url.startswith("/") else subcategory_url
            
            data_to_insert.append({
                "category": category_name,
                "subcategory": subcategory_name,
                "url": full_url
            })
            print(f"{category_name} -> {subcategory_name}: {full_url}")
    
    if data_to_insert:
        collection.insert_many(data_to_insert)
        print("Data successfully saved to MongoDB.")
else:
    print(f"Failed to fetch the page: {response.status_code}")