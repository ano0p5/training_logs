import os
import json
import re
import logging
from datetime import datetime
from parsel import Selector
from mongoengine import connect
from mongoengine.errors import NotUniqueError
from settings import MONGO_DB, MONGO_URI, MONGO_COLLECTION_DATA, HEADERS
from items import ProductItem
import requests

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

class Parser:
    def __init__(self, filePaths):
        self.filePaths = filePaths
        connect(db=MONGO_DB, host=MONGO_URI)
        self.mongo = None 

    def extractJsonData(self, htmlContent):
        try:
            return json.loads(htmlContent)
        except json.JSONDecodeError:
            logging.error("Failed to decode JSON.")
            return None

    def extractNutritionalValues(self, jsonData):
        if not jsonData:
            return ""
        try:
            productDetails = next((item for item in jsonData if isinstance(item, dict) and item.get("standardPackagingUnit") == 33), None)
            if productDetails and "nutritionalValues" in productDetails:
                nutritionalValuesRefIndex = productDetails["nutritionalValues"]
                if isinstance(nutritionalValuesRefIndex, int) and 0 <= nutritionalValuesRefIndex < len(jsonData) and isinstance(jsonData[nutritionalValuesRefIndex], list):
                    nutritionalParts = []
                    for index in jsonData[nutritionalValuesRefIndex]:
                        if isinstance(index, int) and 0 <= index < len(jsonData) and isinstance(jsonData[index], dict) and "text" in jsonData[index] and "value" in jsonData[index]:
                            textIndex = jsonData[index]["text"]
                            valueIndex = jsonData[index]["value"]
                            if isinstance(textIndex, int) and 0 <= textIndex < len(jsonData) and isinstance(jsonData[textIndex], str) and \
                               isinstance(valueIndex, (int, float, str)) and 0 <= valueIndex < len(jsonData) and isinstance(jsonData[valueIndex], str):
                                nutritionalParts.append(f"{jsonData[textIndex]}:{jsonData[valueIndex]}")
                            elif isinstance(textIndex, int) and 0 <= textIndex < len(jsonData) and isinstance(jsonData[textIndex], str) and \
                                 isinstance(valueIndex, (int, float, str)):
                                nutritionalParts.append(f"{jsonData[textIndex]}:{jsonData[valueIndex]}")
                    return ",".join(nutritionalParts)
            return ""
        except (IndexError, TypeError):
            logging.warning("Error extracting nutritional values.")
            return ""

    def extractIngredients(self, jsonData):
        if not jsonData:
            return ""
        try:
            if len(jsonData) > 22 and isinstance(jsonData[22], dict) and "ingredients" in jsonData[22]:
                ingredientsRefIndex = jsonData[22]["ingredients"]
                if isinstance(ingredientsRefIndex, int) and 0 <= ingredientsRefIndex < len(jsonData) and isinstance(jsonData[ingredientsRefIndex], str):
                    ingredientsString = re.sub(r"^Ingrediënten:\s*", "", jsonData[ingredientsRefIndex]).strip()
                    return ingredientsString.replace("\n", " ")
            return ""
        except (IndexError, TypeError):
            logging.warning("Error extracting ingredients.")
            return ""

    def extractImageUrl(self, jsonLdData):
        if not jsonLdData or not isinstance(jsonLdData, dict) or "@graph" not in jsonLdData:
            return None
        try:
            for item in jsonLdData.get("@graph", []):
                if item.get("@type") == "ImageObject":
                    return item.get("url")
                elif item.get("@type") == ["WebPage", "ItemPage"] and "primaryImageOfPage" in item:
                    primaryImageId = item["primaryImageOfPage"].get("@id")
                    for graphItem in jsonLdData.get("@graph", []):
                        if graphItem.get("@id") == primaryImageId and graphItem.get("@type") == "ImageObject":
                            return graphItem.get("url")
            return None
        except (AttributeError, TypeError):
            logging.warning("Error extracting image URL from JSON-LD.")
            return None

    def extractGrammage(self, sel):
        text = sel.css('p.subtitle ::text').get()
        if text:
            match = re.search(r"(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)", text)
            if match:
                return match.group(1).replace(",", "."), match.group(2).lower()
        return "", ""

    def extractProductData(self, sel):
        nuxtDataScript = sel.xpath("//script[@id='__NUXT_DATA__']/text()").get()
        return self.extractJsonData(nuxtDataScript.strip()) if nuxtDataScript else None

    def extractJsonLdData(self, sel):
        jsonLdScript = sel.xpath('//script[@type="application/ld+json"]/text()').get()
        if jsonLdScript:
            try:
                return json.loads(jsonLdScript.strip())
            except json.JSONDecodeError:
                logging.error(f"Failed to decode JSON-LD script: {jsonLdScript}")
                return None
        return None

    def parseItem(self, url, response):
        sel = Selector(text=response.text)
        jsonLdData = self.extractJsonLdData(sel)
        nuxtData = self.extractProductData(sel)

        item = {}

        if jsonLdData and isinstance(jsonLdData, dict) and "@graph" in jsonLdData:
            product = next((entry for entry in jsonLdData.get("@graph", []) if entry.get("@type") == "Product"), {})
            offer = product.get("offers", {})
            breadcrumbData = next((entry for entry in jsonLdData.get("@graph", []) if entry.get("@type") == "BreadcrumbList"), {})
            breadcrumbItems = breadcrumbData.get("itemListElement", [])
            hierarchy = [item.get("item", {}).get("name", "").strip() for item in breadcrumbItems]
            breadcrumb = "> ".join(hierarchy)
            productHierarchy = hierarchy + [""] * (4 - len(hierarchy))
            manufacturerInfo = product.get("manufacturer", {})
            grammageQuantity, grammageUnit = self.extractGrammage(sel)
            nutritionalString = self.extractNutritionalValues(nuxtData)
            ingredientsString = self.extractIngredients(nuxtData)
            imageUrl = self.extractImageUrl(jsonLdData)
            uniqueId = str(product.get("mpn", ""))
            organicType = "True" if "Organic" in product.get("name", "") or "Bio+" in product.get("brand", {}).get("name", "") else ""

            item["unique_id"] = uniqueId
            item["competitor_name"] = "dirk"
            item["extraction_date"] = datetime.now().strftime("%Y-%m-%d")
            item["product_name"] = product.get("name", "")
            item["brand"] = product.get("brand", {}).get("name", "")
            item["brand_type"] = manufacturerInfo.get("@type", "")
            item["grammage_quantity"] = grammageQuantity
            item["grammage_unit"] = grammageUnit
            item["producthierarchy_level1"] = productHierarchy[0]
            item["producthierarchy_level2"] = productHierarchy[1]
            item["producthierarchy_level3"] = productHierarchy[2]
            item["producthierarchy_level4"] = productHierarchy[3]
            item["regular_price"] = str(offer.get("price", offer.get("Price", "")))
            item["selling_price"] = str(offer.get("price", offer.get("Price", "")))
            item["price_was"] = ""
            item["promotion_price"] = ""
            item["promotion_valid_from"] = ""
            item["promotion_valid_upto"] = ""
            item["promotion_type"] = ""
            item["percentage_discount"] = ""
            item["promotion_description"] = ""
            item["price_per_unit"] = ""
            item["currency"] = offer.get("priceCurrency", "")
            item["beadcrumb"] = breadcrumb
            item["pdp_url"] = product.get("@id", "").split('#')[0]
            item["fat_percentage"] = ""
            item["variants"] = ""
            item["product_description"] = product.get("description", "")
            item["instructions"] = ""
            item["storage_instructions"] = ""
            item["country_of_origin"] = "nl"
            item["allergens"] = ""
            item["nutritional_score"] = nutritionalString
            item["organictype"] = organicType
            item["file_name_1"] = imageUrl if imageUrl else ""
            item["upc"] = uniqueId
            item["ingredients"] = ingredientsString
            item["servings_per_pack"] = ""

            try:
                productItem = ProductItem(**item)
                productItem.save()
                logging.info(f"Saved product: {item.get('product_name')} from {url} with UPC: {uniqueId}")
            except NotUniqueError:
                logging.warning(f"Duplicate UPC found for product in {url}. Skipping: {uniqueId}")
            except Exception as e:
                logging.error(f"An error occurred while saving {url} (UPC: {uniqueId}): {e}")
        else:
            logging.warning(f"Could not parse JSON-LD data from {url}.")

    def start(self):
        metas = [{'url': filePath} for filePath in self.filePaths]
        for meta in metas:
            url = meta.get('url')
            try:
                with open(url, 'r', encoding='utf-8') as f:
                    htmlText = f.read()
                response = type('Response', (), {'text': htmlText, 'url': url})()
                self.parseItem(url, response)
            except FileNotFoundError:
                logging.error(f"File not found: {url}")
            except Exception as e:
                logging.error(f"Error processing {url}: {e}")

    def close(self):
        pass

if __name__ == "__main__":
    filePaths = [
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
    ]
    parser = Parser(filePaths)
    parser.start()
    logging.info(f"Data processing finished.")
    parser.close()