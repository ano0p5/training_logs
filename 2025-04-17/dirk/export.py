
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
    "beadcrumb",
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


class Export:
    """PostProcessing - Export to CSV from MongoDB"""

    def __init__(self, writer):
        connect(db=MONGO_DB)
        self.writer = writer
        self.competitor_name = 'dirk' 

    def start(self):
        """Start Function to export data to CSV"""

        self.writer.writerow(csv_headers)

        for item in ProductItem.objects.all():
            data = [
                item.unique_id if hasattr(item, 'unique_id') else '',
                self.competitor_name,
                item.extraction_date if hasattr(item, 'extraction_date') else '',
                item.product_name if hasattr(item, 'product_name') else '',
                item.brand if hasattr(item, 'brand') else '',
                item.brand_type if hasattr(item, 'brand_type') else '',
                item.grammage_quantity if hasattr(item, 'grammage_quantity') else '',
                item.grammage_unit if hasattr(item, 'grammage_unit') else '',
                item.producthierarchy_level1 if hasattr(item, 'producthierarchy_level1') else '',
                item.producthierarchy_level2 if hasattr(item, 'producthierarchy_level2') else '',
                item.producthierarchy_level3 if hasattr(item, 'producthierarchy_level3') else '',
                item.producthierarchy_level4 if hasattr(item, 'producthierarchy_level4') else '',
                item.regular_price if hasattr(item, 'regular_price') else '',
                item.selling_price if hasattr(item, 'selling_price') else '',
                item.price_was if hasattr(item, 'price_was') else '',
                item.promotion_price if hasattr(item, 'promotion_price') else '',
                item.promotion_valid_from if hasattr(item, 'promotion_valid_from') else '',
                item.promotion_valid_upto if hasattr(item, 'promotion_valid_upto') else '',
                item.promotion_type if hasattr(item, 'promotion_type') else '',
                item.percentage_discount if hasattr(item, 'percentage_discount') else '',
                item.promotion_description if hasattr(item, 'promotion_description') else '',
                item.price_per_unit if hasattr(item, 'price_per_unit') else '',
                item.currency if hasattr(item, 'currency') else '',
                item.beadcrumb if hasattr(item, 'beadcrumb') else '',
                item.pdp_url if hasattr(item, 'pdp_url') else '',
                item.fat_percentage if hasattr(item, 'fat_percentage') else '',
                item.variants if hasattr(item, 'variants') else '',
                item.product_description if hasattr(item, 'product_description') else '',
                item.instructions if hasattr(item, 'instructions') else '',
                item.storage_instructions if hasattr(item, 'storage_instructions') else '',
                item.country_of_origin if hasattr(item, 'country_of_origin') else '',
                item.allergens if hasattr(item, 'allergens') else '',
                item.nutritional_score if hasattr(item, 'nutritional_score') else '',
                item.organictype if hasattr(item, 'organictype') else '',
                item.file_name_1 if hasattr(item, 'file_name_1') else '',
                item.upc if hasattr(item, 'upc') else '',
                item.ingredients if hasattr(item, 'ingredients') else '',
                item.servings_per_pack if hasattr(item, 'servings_per_pack') else '',
            ]
            self.writer.writerow([str(d).encode('utf-8').decode('utf-8') for d in data])


if __name__ == "__main__":
    with open(FILE_NAME_FULLDUMP, "a", encoding="utf-8") as file:
        writer_file = csv.writer(file, delimiter="|", quotechar='"')

        export = Export(writer_file)
        export.start()

        file.close()