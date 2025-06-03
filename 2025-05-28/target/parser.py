import requests
import re
import html
from datetime import datetime
from mongoengine import connect
from items import ProductItem
from settings import HEADERS, crawler_collection, logger,MONGO_URI,MONGO_DB

class TargetProductParser:
    BASE_URL = "https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&is_bot=false&pricing_store_id=3991&has_pricing_store_id=true&has_financing_options=true&include_obsolete=true&visitor_id=019720FA54790201B7563E4F292EC9BB&skip_personalized=true&skip_variation_hierarchy=true&channel=WEB"

    def start(self):
        connect(db=MONGO_DB, host= MONGO_URI)
        for doc in crawler_collection.find({}, {"unique_id": 1, "_id": 0}):
            tcin = doc.get("unique_id")
            if not tcin:
                continue

            url = f"{self.BASE_URL}&tcin={tcin}&page=%2Fp%2FA-{tcin}"
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()
            data = response.json()

            self.parse(data)

    def parse(self, data):
        product = data.get("data", {}).get("product", {})
        item = product.get("item", {})
        enrichment = item.get("enrichment", {})
        price = product.get("price", {})
        product_desc = item.get("product_description", {})
        brand = item.get("primary_brand", {})
        ratings = product.get("ratings_and_reviews", {})
        category = product.get("category", {})
        breadcrumbs = category.get("breadcrumbs", [])

        # Extract breadcrumb names into a list
        breadcrumb_names = [b.get("name", "") for b in breadcrumbs]

        # Create a breadcrumb string separated by ' > '
        breadcrumb_str = " > ".join(breadcrumb_names)

        # Initialize hierarchy levels (up to 5)
        product_hierarchy_levels = {}
        for i in range(5):
            level_key = f"producthierarchy_level{i+1}"
            product_hierarchy_levels[level_key] = breadcrumb_names[i] if i < len(breadcrumb_names) else ""
        
        # Clean description removing HTML tags
        raw_desc = product_desc.get("downstream_description", "")
        cleanr = re.compile('<.*?>')
        description = re.sub(cleanr, '', raw_desc)
        description = re.sub(r'\s+', ' ', description).strip()

        # Price cleanup
        raw_selling_price = price.get("formatted_current_price", "")
        selling_price = re.sub(r'[^\d.]', '', raw_selling_price)

        item_type= item.get("product_classification", {}).get("item_type", {}).get("name", "")   
        

        bullet_map = {
            "Sizing": "Gender",
            "Material": ["material", "material_composition"],
            "Garment Length": "Clothing_Length",
            "Closure Style": "Fastener/Closure Type(Zip/belt)",
            "Rise": "Rise(Pants/capris/leg wear)",
            "Fit": ["clothing_fit", "Body fit"],
            "Garment Details": "features",
            "Fabric Weight Type": "clothing_weight",
            "Stretch": "stretch",
            "Care and Cleaning": "care_instructions"
        }

        extracted_fields = {}

        for bullet in product_desc.get("bullet_descriptions", []):
            clean = re.sub(r"<.*?>", "", bullet).strip()
            if ": " in clean:
                key, value = clean.split(": ", 1)
                mapped = bullet_map.get(key)
                if mapped:
                    if isinstance(mapped, list):
                        for m in mapped:
                            extracted_fields[m] = value.strip()
                    else:
                        extracted_fields[mapped] = value.strip()
        size_chart_url = enrichment.get("size_chart_fragment_url","")
        id = product.get("tcin", "")
        name = html.unescape(product_desc.get("title", ""))
        brand_name = brand.get("name", "")
        date = datetime.utcnow().date().isoformat()
        rating = ratings.get("statistics", {}).get("rating", {}).get("average", "")
        review = ratings.get("statistics", {}).get("rating", {}).get("count", "")
        pdp_url = enrichment.get("buy_url", "")
        items = {
            "unique_id": id,
            "competitor_name": "target",
            "extraction_date": date,
            "product_name": name,
            "brand": brand_name,
            "regular_price": selling_price,
            "selling_price": selling_price,
            "promotion_price": "",
            "promotion_valid_from":"",
            "promotion_valid_upto": "",
            "promotion_type": "",
            "promotion_description": "",
            "currency": "dollar",
            "breadcrumb": breadcrumb_str,
            **product_hierarchy_levels,
            "pdp_url": pdp_url,
            "variants": "",
            "product_description": description,
            "country_of_origin": "US",
            "color": "",
            "model_number":id ,
            "size": size_chart_url,
            "rating": rating,
            "review": review,
            "competitor_product_key": id,
            "upc": id,
            "Gender": "Men",
            "clothing_type": item_type,
            "variant color": "",
            **extracted_fields,
        }
        image_urls = []
        images_info = enrichment.get("image_info", {})
        primary = images_info.get("primary_image", {})
        if primary.get("url"):
            image_urls.append(primary["url"])

        for alt in images_info.get("alternate_images", []):
            if alt.get("url"):
                image_urls.append(alt["url"])

        # Add image URLs dynamically to items dict
        for idx, url in enumerate(image_urls, 1):
            items[f"image_url_{idx}"] = url


        logger.info(items)

        item = {k: str(v).replace("\n", " ").strip() if v is not None else "" for k, v in items.items()}

        try:
            productItem = ProductItem(**item)
            productItem.save()
            logger.info(f"Saved item with unique_id: {item.get('unique_id')}")
        except Exception as e:
            logger.error(f"Error while saving item with unique_id {item.get('unique_id')}: {e}")
            
if __name__ == "__main__":
    TargetProductParser().start()
