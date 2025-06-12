import csv
from pymongo import MongoClient

# MongoDB setup
mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["mmlafleur"]  # Replace with your DB name
collection = db["products_pdp"]  # Replace with your collection name

# Output file
FILE_NAME = "mm_lafleur_reviews.csv"

# Fields to export
csv_headers = [
    "website", "product_url", "product_name", "brand", "original_price", "sale_price", "category",
    "product_sku", "total_number_of_reviews", "1_star", "2_star", "3_star", "4_star", "5_star",
    "date_of_purchase", "place_of_purchase", "review_title", "review_text"
]

def clean_text(val):
    if isinstance(val, list):
        return ", ".join(str(v).strip() for v in val)
    if isinstance(val, dict):
        return ""
    if val is None:
        return ""
    return str(val).strip()

def export_reviews():
    with open(FILE_NAME, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="|", quotechar='"')
        writer.writerow(csv_headers)

        for doc in collection.find():
            # Extract values
            row = [
                "MMLaFleur",
                clean_text(doc.get("product_url", "")),
                clean_text(doc.get("product_name", "")),
                clean_text(doc.get("brand", "")),
                clean_text(doc.get("orginal_price", "")),
                clean_text(doc.get("sale_price", "")),
                clean_text(doc.get("category", "")),
                clean_text(doc.get("product_sku", "")),
                clean_text(doc.get("total_number_of_reviews", "")),
                doc.get("1_star", 0),
                doc.get("2_star", 0),
                doc.get("3_star", 0),
                doc.get("4_star", 0),
                doc.get("5_star", 0),
                clean_text(doc.get("date_of_purchase", "")),
                clean_text(doc.get("place_of_purchase", "")),
                clean_text(doc.get("review_title", "")),
                clean_text(doc.get("review_text", ""))
            ]
            writer.writerow(row)

if __name__ == "__main__":
    export_reviews()
