import csv
from settings import FILE_NAME_FULLDUMP, MONGO_DB
from mongoengine import connect
from items import ProductItem 


csv_headers = [
    "unique_id",
    "competitor_name",
    "extraction_date",
    "product_name",
    "brand",
    "brand_type",
    "grammage_quantity",
    "grammage_unit",
    "producthierarchy_level1",
    "producthierarchy_level2",
    "producthierarchy_level3",
    "producthierarchy_level4",
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
    "breadcrumb",  
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
    "file_name_1",
    "upc",
    "ingredients",
    "servings_per_pack",
]

def get_safe_value(item, attr):
    val = getattr(item, attr, '')
    if val is None:
        return ''
    if isinstance(val, str) and val.strip().lower() == "none":
        return ''
    return val

class Export:

    def __init__(self, writer):
        connect(db=MONGO_DB)
        self.writer = writer
        self.competitor_name = 'gianteagle' 

    def start(self):
        """Start Function to export data to CSV"""
        self.writer.writerow(csv_headers)

        for item in ProductItem.objects.all():
            data = [
                get_safe_value(item, "unique_id"),
                self.competitor_name,
                get_safe_value(item, "extraction_date"),
                get_safe_value(item, "product_name"),
                get_safe_value(item, "brand"),
                get_safe_value(item, "brand_type"),
                get_safe_value(item, "grammage_quantity"),
                get_safe_value(item, "grammage_unit"),
                get_safe_value(item, "producthierarchy_level1"),
                get_safe_value(item, "producthierarchy_level2"),
                get_safe_value(item, "producthierarchy_level3"),
                get_safe_value(item, "producthierarchy_level4"),
                get_safe_value(item, "regular_price"),
                get_safe_value(item, "selling_price"),
                get_safe_value(item, "price_was"),
                get_safe_value(item, "promotion_price"),
                get_safe_value(item, "promotion_valid_from"),
                get_safe_value(item, "promotion_valid_upto"),
                get_safe_value(item, "promotion_type"),
                get_safe_value(item, "percentage_discount"),
                get_safe_value(item, "promotion_description"),
                get_safe_value(item, "price_per_unit"),
                get_safe_value(item, "currency"),
                get_safe_value(item, "breadcrumb"),
                get_safe_value(item, "pdp_url"),
                get_safe_value(item, "fat_percentage"),  
                get_safe_value(item, "variants"),
                get_safe_value(item, "product_description"),
                get_safe_value(item, "instructions"),
                get_safe_value(item, "storage_instructions"),
                get_safe_value(item, "country_of_origin"),
                get_safe_value(item, "allergens"),
                get_safe_value(item, "nutritional_score"),
                get_safe_value(item, "organictype"),
                get_safe_value(item, "file_name_1"),
                get_safe_value(item, "upc"),
                get_safe_value(item, "ingredients"),
                get_safe_value(item, "servings_per_pack"),
            ]

            self.writer.writerow([str(d) for d in data])


if __name__ == "__main__":
    with open(FILE_NAME_FULLDUMP, "w", encoding="utf-8", newline='') as file:
        writer_file = csv.writer(file, delimiter="|", quotechar='"')
        export = Export(writer_file)
        export.start()
