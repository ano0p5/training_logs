import re
import csv
from html import unescape
from settings import FILE_NAME_FULLDUMP, MONGO_DB, MONGO_COLLECTION_DATA 
from pymongo import MongoClient

csv_headers = [
    "unique_id", "competitor_name", "store_name", "store_addressline1", "store_addressline2",
    "store_suburb", "store_state", "store_postcode", "store_addressid", "extraction_date",
    "product_name", "brand", "brand_type", "grammage_quantity", "grammage_unit", "drained_weight",
    "producthierarchy_level1", "producthierarchy_level2", "producthierarchy_level3",
    "producthierarchy_level4", "producthierarchy_level5", "producthierarchy_level6",
    "producthierarchy_level7", "regular_price", "selling_price", "price_was", "promotion_price",
    "promotion_valid_from", "promotion_valid_upto", "promotion_type", "percentage_discount",
    "promotion_description", "package_sizeof_sellingprice", "per_unit_sizedescription",
    "price_valid_from", "price_per_unit", "multi_buy_item_count", "multi_buy_items_price_total",
    "currency", "breadcrumb", "pdp_url", "variants", "product_description", "instructions",
    "storage_instructions", "preparationinstructions", "instructionforuse", "country_of_origin",
    "allergens", "age_of_the_product", "age_recommendations", "flavour", "nutritions",
    "nutritional_information", "vitamins", "labelling", "grade", "region", "packaging",
    "receipies", "processed_food", "barcode", "frozen", "chilled", "organictype", "cooking_part",
    "Handmade", "max_heating_temperature", "special_information", "label_information",
    "dimensions", "special_nutrition_purpose", "feeding_recommendation", "warranty", "color",
    "model_number", "material", "usp", "dosage_recommendation", "tasting_note",
    "food_preservation", "size", "rating", "review", "file_name_1", "image_url_1", "file_name_2",
    "image_url_2", "file_name_3", "image_url_3", "competitor_product_key", "fit_guide", "occasion",
    "material_composition", "style", "care_instructions", "heel_type", "heel_height", "upc",
    "features", "dietary_lifestyle", "manufacturer_address", "importer_address",
    "distributor_address", "vinification_details", "recycling_information", "return_address",
    "alchol_by_volume", "beer_deg", "netcontent", "netweight", "site_shown_uom", "ingredients",
    "random_weight_flag", "instock", "promo_limit", "product_unique_key", "multibuy_items_pricesingle",
    "perfect_match", "servings_per_pack", "Warning", "suitable_for", "standard_drinks",
    "environmental", "grape_variety", "retail_limit"
]

class Export:
    def __init__(self, writer):
        self.mongo = MongoClient()[MONGO_DB]
        self.writer = writer

    def start(self):
        self.writer.writerow(csv_headers)

        for item in self.mongo[MONGO_COLLECTION_DATA ].find():
            row = []
            for field in csv_headers:
                if field == "competitor_name":
                    value = "Almaya"
                elif field == "regular_price":
                    value = item.get("product_price", "")
                elif field == "image_url_1":
                    value = item.get("product_image", "")
                elif field == "pdp_url":
                    value = item.get("product_url", "")
                elif field == "extraction_date":
                    value = "2025-06-19"
                else:
                    value = item.get(field, "")

                if isinstance(value, list):
                    value = ", ".join(map(str, value))
                if isinstance(value, str):
                    value = unescape(value).replace("\n", " ").replace("\r", " ").strip()
                row.append(value)
            self.writer.writerow(row)

if __name__ == "__main__":
    with open(FILE_NAME_FULLDUMP, "w", encoding="utf-8", newline="") as file:
        writer_file = csv.writer(file, delimiter="|", quotechar='"', quoting=csv.QUOTE_MINIMAL)
        export = Export(writer_file)
        export.start()
