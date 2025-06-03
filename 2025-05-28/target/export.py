import csv
from settings import FILE_NAME_FULLDUMP, MONGO_DB, MONGO_URI
from mongoengine import connect
from items import ProductItem  
csv_headers = [
    "unique_id",
    "competitor_name",
    "extraction_date",
    "product_name",
    "brand",
    "regular_price",
    "selling_price",
    "promotion_price",
    "promotion_valid_from",
    "promotion_valid_upto",
    "promotion_type",
    "promotion_description",
    "currency",
    "breadcrumb",
    "producthierarchy_level1",
    "producthierarchy_level2",
    "producthierarchy_level3",
    "producthierarchy_level4",
    "producthierarchy_level5",
    "pdp_url",
    "variants",
    "product_description",
    "country_of_origin",
    "color",
    "model_number",
    "size",
    "rating",
    "review",
    "competitor_product_key",
    "upc",
    "Gender",
    "clothing_type",
    "variant_color",
    "material",
    "material_composition",
    "Clothing_Length",
    "Fastener_Closure_Type",
    "Rise_Pants_capris_leg_wear",
    "clothing_fit",
    "Body_fit",
    "features",
    "clothing_weight",
    "stretch",
    "care_instructions",
    "image_url_1",
    "image_url_2",
    "image_url_3",
]

class Export:
    def __init__(self, writer):
        connect(db=MONGO_DB, host=MONGO_URI)
        self.writer = writer
        self.competitor_name = 'target' 
    def start(self):
        self.writer.writerow(csv_headers)
        for item in ProductItem.objects.all():
            row = [
                getattr(item, "unique_id", ""),
                getattr(item, "competitor_name", self.competitor_name),
                getattr(item, "extraction_date", ""),
                getattr(item, "product_name", ""),
                getattr(item, "brand", ""),
                getattr(item, "regular_price", ""),
                getattr(item, "selling_price", ""),
                getattr(item, "promotion_price", ""),
                getattr(item, "promotion_valid_from", ""),
                getattr(item, "promotion_valid_upto", ""),
                getattr(item, "promotion_type", ""),
                getattr(item, "promotion_description", ""),
                getattr(item, "currency", ""),
                getattr(item, "breadcrumb", ""),
                getattr(item, "producthierarchy_level1", ""),
                getattr(item, "producthierarchy_level2", ""),
                getattr(item, "producthierarchy_level3", ""),
                getattr(item, "producthierarchy_level4", ""),
                getattr(item, "producthierarchy_level5", ""),
                getattr(item, "pdp_url", ""),
                getattr(item, "variants", ""),
                getattr(item, "product_description", ""),
                getattr(item, "country_of_origin", ""),
                getattr(item, "color", ""),
                getattr(item, "model_number", ""),
                getattr(item, "size", ""),
                getattr(item, "rating", ""),
                getattr(item, "review", ""),
                getattr(item, "competitor_product_key", ""),
                getattr(item, "upc", ""),
                getattr(item, "Gender", ""),
                getattr(item, "clothing_type", ""),
                getattr(item, "variant_color", ""),
                getattr(item, "material", ""),
                getattr(item, "material_composition", ""),
                getattr(item, "Clothing_Length", ""),
                getattr(item, "Fastener_Closure_Type", ""),
                getattr(item, "Rise_Pants_capris_leg_wear", ""),
                getattr(item, "clothing_fit", ""),
                getattr(item, "Body_fit", ""),
                getattr(item, "features", ""),
                getattr(item, "clothing_weight", ""),
                getattr(item, "stretch", ""),
                getattr(item, "care_instructions", ""),
                getattr(item, "image_url_1", ""),
                getattr(item, "image_url_2", ""),
                getattr(item, "image_url_3", ""),
            ]
            self.writer.writerow([str(v).replace('\n', ' ').strip() for v in row])

if __name__ == "__main__":
    with open(FILE_NAME_FULLDUMP, "w", encoding="utf-8", newline='') as f:
        writer = csv.writer(f, delimiter="|", quotechar='"')
        Export(writer).start()
