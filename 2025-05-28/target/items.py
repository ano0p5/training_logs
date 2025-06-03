from mongoengine import DynamicDocument, StringField
from settings import MONGO_DB, parser_collection

class ProductItem(DynamicDocument):
    """Initializing product data fields and their data types."""

    meta = {"collection": parser_collection, "db": MONGO_DB}

    unique_id = StringField()
    competitor_name = StringField()
    extraction_date = StringField()
    product_name = StringField()
    brand = StringField()
    regular_price = StringField()
    selling_price = StringField()
    promotion_price = StringField()
    promotion_valid_from = StringField()
    promotion_valid_upto = StringField()
    promotion_type = StringField()
    promotion_description = StringField()
    currency = StringField()
    breadcrumb = StringField()

    producthierarchy_level1 = StringField()
    producthierarchy_level2 = StringField()
    producthierarchy_level3 = StringField()
    producthierarchy_level4 = StringField()
    producthierarchy_level5 = StringField()

    pdp_url = StringField()
    variants = StringField()
    product_description = StringField()
    country_of_origin = StringField()
    color = StringField()
    model_number = StringField()
    size = StringField()
    rating = StringField()
    review = StringField()
    competitor_product_key = StringField()
    upc = StringField()
    Gender = StringField()
    clothing_type = StringField()
    variant_color = StringField()

    # Additional fields extracted dynamically from bullet descriptions
    material = StringField()
    material_composition = StringField()
    Clothing_Length = StringField()
    Fastener_Closure_Type = StringField()
    Rise_Pants_capris_leg_wear = StringField()
    clothing_fit = StringField()
    Body_fit = StringField()
    features = StringField()
    clothing_weight = StringField()
    stretch = StringField()
    care_instructions = StringField()

    # Dynamically added image URLs (you can store them as Strings)
    image_url_1 = StringField()
    image_url_2 = StringField()
    image_url_3 = StringField()
    # Add more if needed...
