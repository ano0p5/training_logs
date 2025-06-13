import csv
import re
from html import unescape
from pymongo import MongoClient

# Constants
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "cvs"
MONGO_COLLECTION = "products"
OUTPUT_FILE = "cvs_products.csv"

csv_headers = [
    "retailer_id", "product_name", "breadcrumb", "retailer_url", "image_url",
    "selling_price", "original_price", "currency", "promo_description",
    "product_description", "product_specifications", "grammage", "upc",
    "ingredients", "warning", "country_of_origin", "zipcode", "other_data"
]

def clean_html(text):
    """Remove HTML tags and extra whitespace from text."""
    if not text:
        return ''
    return re.sub(r"<.*?>|\s+", " ", unescape(str(text))).strip()

def export_to_csv():
    client = MongoClient(MONGO_URI)
    collection = client[MONGO_DB][MONGO_COLLECTION]

    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="|", quotechar='"')
        writer.writerow(csv_headers)

        for doc in collection.find():
            row = []
            for field in csv_headers:
                value = doc.get(field, "")

                # Clean HTML in descriptions
                if field in ["product_description", "promo_description", "product_specifications"]:
                    value = clean_html(value)

                if isinstance(value, list):
                    value = ", ".join(map(str, value))
                value = str(value).strip()
                row.append(value)
            writer.writerow(row)

    print(f"✅ Exported {collection.count_documents({})} records to '{OUTPUT_FILE}'.")

if __name__ == "__main__":
    export_to_csv()
