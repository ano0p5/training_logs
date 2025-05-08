import csv
from datetime import datetime
from mongoengine import connect
from settings import FILE_NAME_FULLDUMP, MONGO_DB
from items import ProductItem

csv_headers = [
    "unique_id",
    "competitor_name",
    "extraction_date",
    "product_name",
    "brand",
    "grammage_quantity",
    "grammage_unit",
    "breadcrumb",
    "producthierarchy_level1",
    "producthierarchy_level2",
    "producthierarchy_level3",
    "producthierarchy_level4",
    "producthierarchy_level5",
    "regular_price",
    "selling_price",
    "price_was",
    "promotion_price",
    "promotion_valid_from",
    "promotion_valid_upto",
    "promotion_type",
    "percentage_discount",
    "promotion_description",
    "price_per_unit",
    "currency",
    "pdp_url",
    "Fat %",
    "variants",
    "product_description",
    "instructions",
    "storage_instructions",
    "country_of_origin",
    "allergens",
    "nutritional_score",
    "organictype",
    "upc",
    "ingredients",
    "servings_per_pack",
    "img_urls"
]

class Export:
    def __init__(self, writer):
        connect(db=MONGO_DB)
        self.writer = writer

    def start(self):
        self.writer.writerow(csv_headers)

        for item in ProductItem.objects:
            row = [
                getattr(item, "unique_id", ""),
                getattr(item, "competitor_name", "aldi"),
                getattr(item, "extraction_date", datetime.now().strftime('%Y-%m-%d')),
                getattr(item, "product_name", ""),
                getattr(item, "brand", ""),
                getattr(item, "grammage_quantity", ""),
                getattr(item, "grammage_unit", ""),
                getattr(item, "breadcrumb", ""),
                getattr(item, "producthierarchy_level1", ""),
                getattr(item, "producthierarchy_level2", ""),
                getattr(item, "producthierarchy_level3", ""),
                getattr(item, "producthierarchy_level4", ""),
                getattr(item, "producthierarchy_level5", ""),
                getattr(item, "regular_price", ""),
                getattr(item, "selling_price", ""),
                getattr(item, "price_was", ""),
                getattr(item, "promotion_price", ""),
                getattr(item, "promotion_valid_from", ""),
                getattr(item, "promotion_valid_upto", ""),
                getattr(item, "promotion_type", ""),
                getattr(item, "percentage_discount", ""),
                getattr(item, "promotion_description", ""),
                getattr(item, "price_per_unit", ""),
                getattr(item, "currency", "EUR"),
                getattr(item, "pdp_url", ""),
                getattr(item, "fat_percentage", ""), 
                self.stringify(getattr(item, "variants", "")),
                getattr(item, "product_description", ""),
                getattr(item, "instructions", ""),
                getattr(item, "storage_instructions", ""),
                getattr(item, "country_of_origin", "nl"),
                getattr(item, "allergens", ""),
                getattr(item, "nutritional_score", ""),
                getattr(item, "organictype", ""),
                getattr(item, "upc", ""),
                getattr(item, "ingredients", ""),
                getattr(item, "servings_per_pack", ""),
                self.stringify(getattr(item, "img_urls", ""))
            ]
            self.writer.writerow([str(x).strip() for x in row])

    def stringify(self, value):
        if isinstance(value, (list, dict)):
            return str(value)
        return value or ""

if __name__ == "__main__":
    with open(FILE_NAME_FULLDUMP, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="|", quotechar='"', quoting=csv.QUOTE_MINIMAL)
        Export(writer).start()
