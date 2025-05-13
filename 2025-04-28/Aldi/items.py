from mongoengine import DynamicDocument, StringField, FloatField
from settings import MONGO_DB, MONGO_COLLECTION_DATA

class ProductItem(DynamicDocument):
    """Initializing product data fields and their data types."""

    meta = {"collection": MONGO_COLLECTION_DATA, "db": MONGO_DB}
    
    unique_id = StringField(required=True, unique=True)
    competitor_name = StringField()
    extraction_date = StringField()
    product_name = StringField()
    brand = StringField()
    brand_type = StringField()
    grammage_quantity = FloatField()
    grammage_unit = StringField()
    producthierarchy_level1 = StringField()
    producthierarchy_level2 = StringField()
    producthierarchy_level3 = StringField()
    producthierarchy_level4 = StringField()
    regular_price = StringField()
    selling_price = StringField()
    price_was = StringField()
    promotion_price = StringField()
    promotion_valid_from = StringField()
    promotion_valid_upto = StringField()
    promotion_type = StringField()
    percentage_discount = StringField()
    promotion_description = StringField()
    price_per_unit = StringField()
    currency = StringField()
    breadcrumb = StringField()  
    pdp_url = StringField()
    fat_percentage = StringField(db_field="Fat %")
    variants = StringField()
    product_description = StringField()
    instructions = StringField()
    storage_instructions = StringField()
    country_of_origin = StringField()
    allergens = StringField()
    nutritional_score = StringField()
    organictype = StringField()
    file_name_1 = StringField()
    upc = StringField()
