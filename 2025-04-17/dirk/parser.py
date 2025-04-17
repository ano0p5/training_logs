import os
import logging
import json
from parsel import Selector
from datetime import datetime


class Parser:
    def __init__(self):
        self.file_paths = [
            "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic Buttermilk. Now at Dirk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic full-fat yoghurt. Now at Dirk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic semi-skimmed milk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic semi-skimmed yoghurt vanilla _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Arla Organic whole milk. Now at Dirk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Biologische houdbare volle melk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Full-fat yoghurt. Now at Dirk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Organic rice drink unsweetened plant-based _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Bio+ Yogurt half-fat. Now at Dirk _ Dirk.html",
            # "/home/anoop/training_log/2025-04-17/dirk_html/Offer_ Oatly Oat Drink organic plant-based _ Dirk.html"
        ]
        self.competitor_name = "Dirk"

    def extract_fields(self, data, file_path,sel):
        product = next((entry for entry in data.get("@graph", []) if entry.get("@type") == "Product"), {})
        offer = product.get("offers", {})
        breadcrumb_data = next((entry for entry in data.get("@graph", []) if entry.get("@type") == "BreadcrumbList"), {})

        # Extract breadcrumb and split to hierarchy levels
        breadcrumb_items = breadcrumb_data.get("itemListElement", [])
        hierarchy = [item.get("item", {}).get("name", "").strip() for item in breadcrumb_items]
        breadcrumb = "> ".join(hierarchy)

        # Pad hierarchy levels up to 5
        producthierarchy = hierarchy + [""] * (4 - len(hierarchy))
        manufacturer_info = product.get("manufacturer", {})



        return {
            "unique_id": str(product.get("mpn", "")),
            "competitor_name": self.competitor_name,
            "extraction_date": datetime.now().strftime("%Y-%m-%d"),
            "product_name": product.get("name", ""),
            "brand": product.get("brand", {}).get("name", ""),
            "brand_type":  manufacturer_info.get("@type", ""),
            "grammage_quantity": sel.xpath('//p[@class="subtitle"]/text()').get().strip() if sel.xpath('//p[@class="subtitle"]/text()').get() else "",
            "grammage_unit": "",
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
            "pdp_url":product.get("@id", "").split('#')[0],
            "Fat %": "",
            "variants": "",
            "product_description": product.get("description", ""),
            "instructions": "",
            "storage_instructions": "",
            "country_of_origin": "",
            "allergens": "",
            "nutritional_score": "",
            "organictype": "",
            "file_name_1": "",
            "upc": "",
            "ingredients": "",
            "servings_per_pack": ""
        }

    def start(self):
        for file_path in self.file_paths:
            if not os.path.exists(file_path):
                logging.warning(f"File not found: {file_path}")
                continue

            with open(file_path, "r", encoding="utf-8") as f:
                html_text = f.read()
                sel = Selector(text=html_text)  # Create the Selector instance
                json_ld_script = sel.xpath('//script[@type="application/ld+json"]/text()').get()

                if json_ld_script:
                    try:
                        json_data = json.loads(json_ld_script)
                        # Now pass sel to extract_fields
                        fields = self.extract_fields(json_data, file_path, sel)  
                        print("\n===== Extracted Product Data =====\n")
                        for k, v in fields.items():
                            print(f"{k}: {v}")
                        print("\n===== End of Product Data =====\n")
                    except json.JSONDecodeError:
                        logging.warning(f"Failed to decode JSON from file: {file_path}")
                else:
                    logging.warning(f"No JSON-LD found in file: {file_path}")

    def close(self):
        pass

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = Parser()
    parser.start()
    parser.close()
