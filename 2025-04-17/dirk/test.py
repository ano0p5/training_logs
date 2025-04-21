import os
import re
import json
import logging
from datetime import datetime
from parsel import Selector
from settings import MONGO_URI, MONGO_DB
from mongoengine import connect
from items import ProductItem

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Parser:
    def __init__(self, file_paths):
        self.file_paths = file_paths
        connect(host=MONGO_URI, db=MONGO_DB)

    def start(self):
        for path in self.file_paths:
            if not os.path.exists(path):
                logger.warning(f"File does not exist: {path}")
                continue

            sel = Selector(text=open(path, encoding="utf-8").read())
            json_ld_script = sel.xpath('//script[@type="application/ld+json"]/text()').get()
            nuxt_script = sel.xpath("//script[@id='__NUXT_DATA__']/text()").get()

            if not json_ld_script:
                logger.warning(f"Missing JSON-LD script in: {path}")
                continue

            data = json.loads(json_ld_script.strip())
            nuxt_data = json.loads(nuxt_script.strip()) if nuxt_script else []

            product = next((x for x in data.get("@graph", []) if x.get("@type") == "Product"), {})
            offer = product.get("offers", {})
            breadcrumb_items = next((x.get("itemListElement", []) for x in data.get("@graph", []) if x.get("@type") == "BreadcrumbList"), [])
            hierarchy = [i.get("item", {}).get("name", "").strip() for i in breadcrumb_items] + [""] * 4

            breadcrumb = "> ".join(hierarchy[:4])
            manufacturer = product.get("manufacturer", {})
            brand = product.get("brand", {}).get("name", "")
            grammage_text = sel.css("p.subtitle ::text").get() or ""
            match = re.search(r"(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)", grammage_text)
            grammage_quantity = match.group(1).replace(",", ".") if match else ""
            grammage_unit = match.group(2).lower() if match else ""

            # Nutritional + Ingredients
            nutritional = ""
            ingredients = ""
            if isinstance(nuxt_data, list):
                product_block = next((x for x in nuxt_data if isinstance(x, dict) and x.get("standardPackagingUnit") == 33), {})
                ref = product_block.get("nutritionalValues")
                if isinstance(ref, int) and isinstance(nuxt_data[ref], list):
                    parts = []
                    for idx in nuxt_data[ref]:
                        if isinstance(idx, int) and isinstance(nuxt_data[idx], dict):
                            t_idx, v_idx = nuxt_data[idx].get("text"), nuxt_data[idx].get("value")
                            text = nuxt_data[t_idx] if isinstance(t_idx, int) and isinstance(nuxt_data[t_idx], str) else ""
                            value = nuxt_data[v_idx] if isinstance(v_idx, int) else str(v_idx)
                            if text:
                                parts.append(f"{text}:{value}")
                    nutritional = ",".join(parts)

                # Ingredients
                ing_index = nuxt_data[22].get("ingredients") if len(nuxt_data) > 22 and isinstance(nuxt_data[22], dict) else None
                if isinstance(ing_index, int) and isinstance(nuxt_data[ing_index], str):
                    ingredients = re.sub(r"^Ingrediënten:\s*", "", nuxt_data[ing_index]).replace("\n", " ").strip()

            # Image
            image_url = ""
            for obj in data.get("@graph", []):
                if obj.get("@type") == "ImageObject":
                    image_url = obj.get("url", "")
                    break
                if obj.get("@type") == ["WebPage", "ItemPage"] and "primaryImageOfPage" in obj:
                    img_id = obj["primaryImageOfPage"].get("@id", "")
                    image_url = next((x.get("url") for x in data.get("@graph", []) if x.get("@id") == img_id and x.get("@type") == "ImageObject"), "")
                    break

            # Organic check
            name = product.get("name", "")
            organictype = "True" if "organic" in name.lower() or "bio+" in brand.lower() else ""

            item = {
                "unique_id": str(product.get("mpn", "")),
                "competitor_name": "dirk",
                "extraction_date": datetime.now().strftime("%Y-%m-%d"),
                "product_name": name,
                "brand": brand,
                "brand_type": manufacturer.get("@type", ""),
                "grammage_quantity": grammage_quantity,
                "grammage_unit": grammage_unit,
                "producthierarchy_level1": hierarchy[0],
                "producthierarchy_level2": hierarchy[1],
                "producthierarchy_level3": hierarchy[2],
                "producthierarchy_level4": hierarchy[3],
                "regular_price": str(offer.get("price", offer.get("Price", ""))),
                "selling_price": str(offer.get("price", offer.get("Price", ""))),
                "price_was": "",
                "promotion_price": "",
                "promotion_valid_from": "",
                "promotion_valid_upto": "",
                "promotion_type": "",
                "percentage_discount": "",
                "promotion_description": "",
                "price_per_unit": "",
                "currency": offer.get("priceCurrency", ""),
                "beadcrumb": breadcrumb,
                "pdp_url": product.get("@id", "").split('#')[0],
                "Fat %": "",
                "variants": "",
                "product_description": product.get("description", ""),
                "instructions": "",
                "storage_instructions": "",
                "country_of_origin": "nl",
                "allergens": "",
                "nutritional_score": nutritional,
                "organictype": organictype,
                "file_name_1": image_url,
                "upc": str(product.get("mpn", "")),
                "ingredients": ingredients,
                "servings_per_pack": "",
            }

            yield item


if __name__ == "__main__":
    parser = Parser([
        "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic Buttermilk. Now at Dirk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic full-fat yoghurt. Now at Dirk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic semi-skimmed milk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic semi-skimmed yoghurt vanilla _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic whole milk. Now at Dirk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Biologische houdbare volle melk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Full-fat yoghurt. Now at Dirk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Organic rice drink unsweetened plant-based _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Yogurt half-fat. Now at Dirk _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/Offer_ Oatly Oat Drink organic plant-based _ Dirk.html",
        "/home/anoop/training_log/2025-04-17/dirk_html/s.html",
    ])
    for item in parser.start():
        ProductItem(**item).save()
        logger.info(f"✅ Saved: {item.get('product_name')} | ID: {item.get('unique_id')}")