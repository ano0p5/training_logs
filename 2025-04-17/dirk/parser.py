import os
import json
import re
from parsel import Selector
from datetime import datetime
from mongoengine import connect
from mongoengine.errors import NotUniqueError
from settings import MONGO_DB, MONGO_URI
from items import ProductItem 


class Parser:
    def __init__(self, file_paths, competitor_name="Dirk", country="nl"):
        self.file_paths = file_paths
        self.competitor_name = competitor_name
        self.country = country
        connect(db=MONGO_DB, host=MONGO_URI)

    def extract_nutritional_values(self, html_content):
        try:
            json_data = json.loads(html_content)
            product_details = next((item for item in json_data if isinstance(item, dict) and item.get("standardPackagingUnit") == 33), None)
            if product_details and "nutritionalValues" in product_details:
                nutritional_values_ref_index = product_details["nutritionalValues"]
                if isinstance(nutritional_values_ref_index, int) and len(json_data) > nutritional_values_ref_index and isinstance(json_data[nutritional_values_ref_index], list):
                    nutritional_parts = []
                    for index in json_data[nutritional_values_ref_index]:
                        if isinstance(index, int) and len(json_data) > index and isinstance(json_data[index], dict) and "text" in json_data[index] and "value" in json_data[index]:
                            text_index = json_data[index]["text"]
                            value_index = json_data[index]["value"]
                            if isinstance(text_index, int) and len(json_data) > text_index and isinstance(json_data[text_index], str) and \
                               isinstance(value_index, (int, float, str)) and len(json_data) > value_index and isinstance(json_data[value_index], str):
                                nutritional_parts.append(f"{json_data[text_index]}:{json_data[value_index]}")
                            elif isinstance(text_index, int) and len(json_data) > text_index and isinstance(json_data[text_index], str) and \
                                 isinstance(value_index, (int, float, str)):
                                nutritional_parts.append(f"{json_data[text_index]}:{json_data[value_index]}")
                    return ",".join(nutritional_parts)
            return ""
        except (json.JSONDecodeError, IndexError):
            return ""

    def extract_ingredients(self, html_content):
        try:
            json_data = json.loads(html_content)
            ingredients_container = json_data[22] if len(json_data) > 22 else None
            if isinstance(ingredients_container, dict) and "ingredients" in ingredients_container:
                ingredients_ref_index = ingredients_container["ingredients"]
                if isinstance(ingredients_ref_index, int) and len(json_data) > ingredients_ref_index and isinstance(json_data[ingredients_ref_index], str):
                    ingredients_string = re.sub(r"^Ingrediënten:\s*", "", json_data[ingredients_ref_index]).strip()
                    return ingredients_string.replace("\n", " ")
            return ""
        except (json.JSONDecodeError, IndexError):
            return ""

    def extract_image_url(self, json_ld_snippet):
        try:
            data = json.loads(json_ld_snippet)
            for item in data.get("@graph", []):
                if item.get("@type") == "ImageObject":
                    return item.get("url")
                elif item.get("@type") == ["WebPage", "ItemPage"] and "primaryImageOfPage" in item:
                    primary_image_id = item["primaryImageOfPage"].get("@id")
                    for graph_item in data.get("@graph", []):
                        if graph_item.get("@id") == primary_image_id and graph_item.get("@type") == "ImageObject":
                            return graph_item.get("url")
            return None
        except json.JSONDecodeError:
            return None

    def extract_grammage(self, sel):
        text = sel.css('p.subtitle ::text').get()
        if text:
            match = re.search(r"(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)", text)
            if match:
                return match.group(1).replace(",", "."), match.group(2).lower()
        return "", ""

    def extract_nutritional(self, sel):
        nuxt_data_script = sel.xpath("//script[@id='__NUXT_DATA__']/text()").get()
        return self.extract_nutritional_values(nuxt_data_script.strip()) if nuxt_data_script else ""

    def extract_ingredients_info(self, sel):
        nuxt_data_script = sel.xpath("//script[@id='__NUXT_DATA__']/text()").get()
        return self.extract_ingredients(nuxt_data_script.strip()) if nuxt_data_script else ""

    def extract_product_image_url(self, sel):
        json_ld_script = sel.xpath('//script[@type="application/ld+json"]/text()').get()
        return self.extract_image_url(json_ld_script.strip()) if json_ld_script else None

    def extract_fields(self, data, file_path, sel):
        product = next((entry for entry in data.get("@graph", []) if entry.get("@type") == "Product"), {})
        offer = product.get("offers", {})
        breadcrumb_data = next((entry for entry in data.get("@graph", []) if entry.get("@type") == "BreadcrumbList"), {})
        breadcrumb_items = breadcrumb_data.get("itemListElement", [])
        hierarchy = [item.get("item", {}).get("name", "").strip() for item in breadcrumb_items]
        breadcrumb = "> ".join(hierarchy)
        producthierarchy = hierarchy + [""] * (4 - len(hierarchy))
        manufacturer_info = product.get("manufacturer", {})
        grammage_quantity, grammage_unit = self.extract_grammage(sel)
        nutritional_string = self.extract_nutritional(sel)
        ingredients_string = self.extract_ingredients_info(sel)
        image_url = self.extract_product_image_url(sel)
        unique_id = str(product.get("mpn", ""))
        organictype = "True" if "Organic" in product.get("name", "") or "Bio+" in product.get("brand", {}).get("name", "") else ""

        return {
            "unique_id": unique_id,
            "competitor_name": self.competitor_name,
            "extraction_date": datetime.now().strftime("%Y-%m-%d"),
            "product_name": product.get("name", ""),
            "brand": product.get("brand", {}).get("name", ""),
            "brand_type": manufacturer_info.get("@type", ""),
            "grammage_quantity": grammage_quantity,
            "grammage_unit": grammage_unit,
            "producthierarchy_level1": producthierarchy[0],
            "producthierarchy_level2": producthierarchy[1],
            "producthierarchy_level3": producthierarchy[2],
            "producthierarchy_level4": producthierarchy[3],
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
            "country_of_origin": self.country,
            "allergens": "",
            "nutritional_score": nutritional_string,
            "organictype": organictype,
            "file_name_1": image_url if image_url else "",
            "upc": unique_id,
            "ingredients": ingredients_string,
            "servings_per_pack": "",
        }

    def start(self):
        for file_path in self.file_paths:
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    html_text = f.read()
                    sel = Selector(text=html_text)
                    json_ld_script = sel.xpath('//script[@type="application/ld+json"]/text()').get()
                    if json_ld_script:
                        try:
                            json_data = json.loads(json_ld_script)
                            fields = self.extract_fields(json_data, file_path, sel)
                            product = ProductItem(**fields)
                            product.save()
                        except json.JSONDecodeError:
                            pass
                        except NotUniqueError:
                            print(f"Duplicate unique_id found for product in {file_path}. Skipping.")
                        except Exception as e:
                            print(f"An error occurred while processing {file_path}: {e}")

    def get_product_list(self):
        return list(ProductItem.objects.all().as_pymongo())

    def close(self):
        pass


if __name__ == "__main__":
    file_paths = [
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
    ]
    parser = Parser(file_paths)
    parser.start()
    print(f"Data saved to MongoDB, database: {MONGO_DB}, collection: parser")
    parser.close()