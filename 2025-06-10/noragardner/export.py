import csv
from pymongo import MongoClient
from settings import MONGO_COLLECTION_REVIEWS,CSV_FILE,MONGO_DB,MONGO_URI



# === Fields 
FIELDS = [
    "website",
    "url",
    "product_sku",
    "product_name",
    "brand",
    "original_price",
    "sale_price",
    "category",
    "total_number_of_reviews",
    "1_star",
    "2_star",
    "3_star",
    "4_star",
    "5_star",
    "review_title",
    "review_text",
    "date_of_purchase",
    "place_of_purchase"
]

# === Export Class ===
def export_to_csv():
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    collection = db[MONGO_COLLECTION_REVIEWS]

    with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="|", quotechar='"')
        writer.writerow(FIELDS)

        for doc in collection.find({}, {field: 1 for field in FIELDS}):
            row = [doc.get(field, "") for field in FIELDS]
            writer.writerow(row)

    print(f"Exported to: {CSV_FILE}")

# === Run Export ===
if __name__ == "__main__":
    export_to_csv()
