import csv
from pymongo import MongoClient
from settings import MONGO_URI, MONGO_DB, PARSER_COLLECTION, CSV_EXPORT_FILE

# === Fields to Export ===
FIELDS = [
    "ean",
    "product_name",
    "product_url",
    "product_image",
    "promotion_description",
    "selling_price",
    "original_price",
    "currency",
    "grammage_unit",
    "rating",
    "reviews_count",
    "long_description",
    "short_description",
    "suitable_for",
    "dimensions_value",
    "product_id",  
    "composition_list",
    "analytical_constituents",
    "nutritional_additives",
    "sensory_additives",
    "technological_additives"
]

def export_items_to_csv():
    client = MongoClient(MONGO_URI)
    db = client[MONGO_DB]
    collection = db[PARSER_COLLECTION]

    with open(CSV_EXPORT_FILE, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file, delimiter="|", quotechar='"')
        writer.writerow(FIELDS)

        for doc in collection.find({}, {field: 1 for field in FIELDS}):
            row = [doc.get(field, "") for field in FIELDS]
            writer.writerow(row)

    print(f" Exported to CSV: {CSV_EXPORT_FILE}")


if __name__ == "__main__":
    export_items_to_csv()
