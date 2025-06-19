from mongoengine import DynamicDocument, StringField
from settings import (
    MONGO_COLLECTION_CATEGORY,
    MONGO_COLLECTION_DATA
)


class AlmayaCategoryItem(DynamicDocument):
    """Almaya Category URLs"""

    meta = {"db_alias": "default", "collection": MONGO_COLLECTION_CATEGORY}

    main_category = StringField()
    subcategory = StringField()
    url = StringField(required=True, unique=True)


class ProductItem(DynamicDocument):
    """Almaya Product Item Schema"""

    meta = {"db_alias": "default", "collection": MONGO_COLLECTION_DATA}

    product_name = StringField()
    product_url = StringField()
    product_price = StringField()
    currency = StringField()
    product_image = StringField()
    product_description = StringField()
    breadcrumb = StringField()
