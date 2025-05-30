from mongoengine import connect
from items import ProductItem
from settings import collection,HEADERS,logging,MONGO_URI
from curl_cffi import requests
import re

class Parser:
    
    def start(self):
        connect(db="ah_db", host= MONGO_URI)
        for doc in collection.find({}, {"unique_id": 1}):
            product_id = doc.get("unique_id")
            if product_id:
                url = 'https://www.ah.nl/gql'
                payload = {'operationName': 'product', 'variables': {'id': int(product_id)}, 'query': 'query product($id: Int!, $date: String) { product(id: $id, date: $date) { ...productV2 virtualBundleProducts { ...virtualBundleItem __typename } __typename } } fragment productV2 on Product { ...baseProductFields interactionLabel icons isSample shopType privateLabel hasListPrice highlight highlights imagePack { ...productImage __typename } availability { ...availability __typename } taxonomies { ...productTaxonomies __typename } tradeItem { ...tradeItem __typename } priceV2(forcePromotionVisibility: true) { ...price __typename } virtualBundleProducts { quantity product { ...baseProductFields highlights imagePack { ...productImage __typename } availability { ...availability offline { status availableFrom __typename } __typename } priceV2(forcePromotionVisibility: true) { ...price __typename } taxonomies { ...productTaxonomies __typename } tradeItem { ...tradeItem __typename } properties { ...productProperties __typename } __typename } __typename } variant { ...variant __typename } variants { ...variant __typename } properties { ...productProperties __typename } otherSorts { ...productCardV2 __typename } __typename } fragment baseProductFields on Product { id hqId title brand category webPath summary additionalInformation salesUnitSize webPath minBestBeforeDays isDeactivated __typename } fragment productImage on ProductImage { angle small { ...productImageRendition __typename } medium { ...productImageRendition __typename } large { ...productImageRendition __typename } __typename } fragment productImageRendition on ProductImageRendition { url width height __typename } fragment availability on ProductAvailability { maxUnits isOrderable isVisible availabilityLabel online { status availableFrom __typename } unavailableForOrder { status availableFrom __typename } __typename } fragment productTaxonomies on ProductTaxonomy { id name active parents __typename } fragment tradeItem on ProductTradeItem { gtin gtinRevisions gln description { ...tradeItemDescription __typename } resources { ...tradeItemResources __typename } contact { ...tradeItemContact __typename } ingredients { ...tradeItemIngredients __typename } nutritions { ...tradeItemNutritions __typename } feedingInstructions { statement __typename } usage { ...tradeItemUsage __typename } storage { ...tradeItemStorage __typename } additionalInfo { ...tradeItemAdditionalInfo __typename } marketing { ...tradeItemMarketing __typename } contents { ...tradeItemContents __typename } origin { ...tradeItemOrigin __typename } __typename } fragment tradeItemDescription on ProductTradeItemDescription { descriptions definitions { ...tradeItemDefinitions __typename } __typename } fragment tradeItemDefinitions on ProductTradeItemDescriptionDefinitions { dosageForm percentageOfAlcohol sunProtectionFactor fishCatchInfo fishCatchMethod animalType animalFeedType __typename } fragment tradeItemResources on ProductTradeItemResources { icons { ...TradeItemResourceIcon __typename } attachments { ...TradeItemResourceAttachment __typename } __typename } fragment TradeItemResourceIcon on ProductTradeItemResourceIcon { id title type meta __typename } fragment TradeItemResourceAttachment on ProductTradeItemResourceAttachment { name format type value __typename } fragment tradeItemContact on ProductTradeItemContact { name address communicationChannels { ...tradeItemCommunicationChannels __typename } __typename } fragment tradeItemCommunicationChannels on ProductTradeItemCommunicationChannel { type value __typename } fragment tradeItemIngredients on ProductTradeItemIngredients { allergens { ...tradeItemAllergens __typename } statement nonfoodIngredientStatement animalFeeding { ...tradeItemAnimalFeeding __typename } __typename } fragment tradeItemAllergens on ProductTradeItemIngredientAllergens { list contains mayContain freeFrom __typename } fragment tradeItemAnimalFeeding on ProductTradeItemIngredientsAnimalFeeding { statement analyticalConstituents additives __typename } fragment tradeItemNutritions on ProductTradeItemNutrition { dailyValueIntakeReference nutrients { ...tradeItemNutrient __typename } servingSize servingSizeDescription preparationState additionalInfo { ...tradeItemNutritionAdditionalInfo __typename } basisQuantity basisQuantityDescription __typename } fragment tradeItemNutrient on ProductTradeItemNutrient { type name value superscript dailyValue __typename } fragment tradeItemNutritionAdditionalInfo on ProductTradeItemDefinition { value label __typename } fragment tradeItemUsage on ProductTradeItemUsage { instructions ageDescription servingSuggestion preparationInstructions { extra contentLines __typename } dosageInstructions precautions warnings hazardStatements signalWords duringPregnancy duringBreastFeeding bacteriaWarning __typename } fragment tradeItemStorage on ProductTradeItemStorage { instructions lifeSpan __typename } fragment tradeItemAdditionalInfo on ProductTradeItemAdditionalInfo { salesConditions identificationNumbers { type label value __typename } certificationNumbers __typename } fragment tradeItemMarketing on ProductTradeItemMarketing { features description __typename } fragment tradeItemContents on ProductTradeItemContents { netContents servingSize drainedWeight servingsPerPackage statement eMark __typename } fragment tradeItemOrigin on ProductTradeItemOrigin { provenance activities { rearing birth slaughter __typename } __typename } fragment price on ProductPriceV2 { now { amount formattedV2 __typename } was { amount __typename } unitInfo { price { amount __typename } description __typename } discount { description promotionType segmentType subtitle theme tieredOffer wasPriceVisible smartLabel availability { startDate endDate __typename } __typename } promotionShields { ...promotionShield __typename } __typename } fragment promotionShield on BonusSegmentDiscountShield { text emphasis theme defaultDescription title topText centerText bottomText __typename } fragment productProperties on ProductProperty { code values __typename } fragment variant on ProductVariant { label type product { id hqId title brand category minBestBeforeDays hasListPrice salesUnitSize isSample highlight icons taxonomies { ...productTaxonomies __typename } imagePack { angle small { height url width __typename } __typename } priceV2(forcePromotionVisibility: true) { ...price __typename } properties { code values __typename } __typename } __typename } fragment productCardV2 on Product { id hqId title brand category webPath salesUnitSize interactionLabel icons isSample shopType highlight highlights isSponsored privateLabel hasListPrice additionalInformation imagePack { angle small { height url width __typename } __typename } availability { ...availability __typename } tradeItem { gtin gtinRevisions __typename } priceV2(forcePromotionVisibility: true) { ...price __typename } virtualBundleProducts { quantity __typename } variant { ...variant __typename } variants { ...variant __typename } properties { code values __typename } __typename } fragment virtualBundleItem on ProductVirtualBundleItem { quantity product { ...productV2 __typename } __typename }'}

                try:
                    response = requests.post(url, headers=HEADERS, impersonate='chrome101', json=payload)
                    if response.ok:
                        data = response.json()
                        self.parse_item(data, product_id)
                    else:
                        logging.error(f"[{product_id}] Request failed with status: {response.status_code}")
                except Exception as e:
                    pass

    def parse_item(self, data, product_id):
        product = data.get("data", {}).get("product", {})
        if not product:
            logging.warning(f"[{product_id}] No product data found")
            return

        # Unique id, product name, brand
        unique_id = product.get("id", "")
        product_name = product.get("title", "")
        brand = product.get("brand", "")

        # Grammage
        trade_item = product.get("tradeItem") or {}
        contents = trade_item.get("contents") or {}
        net_contents = contents.get("netContents") or []
        if net_contents:
            match_qty = re.search(r"([\d\.]+)", net_contents[0])
            grammage_quantity = match_qty.group(1) if match_qty else ""
            match_unit = re.search(r"([A-Za-z]+)", net_contents[0])
            grammage_unit = match_unit.group(1) if match_unit else ""
        else:
            grammage_quantity = ""
            grammage_unit = ""

        # Prices
        priceV2 = product.get("priceV2") or {}
        selling_price = priceV2.get("now", {}).get("amount")
        was_field = priceV2.get("was")

        if was_field is None:
            regular_price = selling_price
            price_was = ""
            promotion_price = selling_price
        else:
            regular_price = was_field.get("amount", "")
            if regular_price != selling_price:
                price_was = regular_price
                promotion_price = selling_price
            else:
                price_was = ""
                promotion_price = ""

        discount = priceV2.get("discount") or {}
        promotion_description = discount.get("description", "")
        availability = discount.get("availability") or {}
        promotion_valid_from = availability.get("startDate", "")
        promotion_valid_upto = availability.get("endDate", "")

        # Promotion shields (percentage discount)
        promotion_shields = priceV2.get("promotionShields", [])
        percentage_discount = ""
        if promotion_shields:
            shield_texts = promotion_shields[0].get("text", [])
            if shield_texts:
                match_pct = re.search(r"([\d\.]+)%", shield_texts[0])
                percentage_discount = match_pct.group(1) if match_pct else ""

        # Price per unit
        unitInfo = priceV2.get("unitInfo") or {}
        ppu_amount = unitInfo.get("price", {}).get("amount")
        ppu_description = unitInfo.get("description")
        price_per_unit = f"{ppu_amount} per {ppu_description}" if ppu_amount and ppu_description else ""

        # PDP URL
        webPath = product.get("webPath", "")
        pdp_url = f"https://www.ah.nl{webPath}"

        # Fat percentage
        nutritions = trade_item.get("nutritions") or []
        fat_percentage_raw = None
        if nutritions:
            nutrients = nutritions[0].get("nutrients") or []
            for nutrient in nutrients:
                if nutrient.get("type") == "FAT":
                    fat_percentage_raw = nutrient.get("value")
                    break
        fat_percentage = ""
        if fat_percentage_raw:
            match_fat = re.search(r"([\d\.]+)", fat_percentage_raw)
            fat_percentage = match_fat.group(1) if match_fat else ""

        # Product description
        description = trade_item.get("description") or {}
        descriptions_list = description.get("descriptions") or []
        product_description = " ".join(descriptions_list) if descriptions_list else ""

        # Storage instructions
        storage = trade_item.get("storage") or {}
        storage_instructions_list = storage.get("instructions") or []
        storage_instructions = " ".join(storage_instructions_list) if storage_instructions_list else ""

        # Usage instructions
        usage = trade_item.get("usage") or {}
        usage_instructions_list = usage.get("instructions") or []
        instructions = " ".join(usage_instructions_list) if usage_instructions_list else ""

        # Ingredients
        ingredients = (trade_item.get("ingredients") or {}).get("statement", "")

        # Nutritional score and organic type
        icons = product.get("icons", [])
        nutritional_score = ""
        for icon in icons:
            if icon.startswith("NUTRISCORE_"):
                nutritional_score = icon.split("_", 1)[1]
                break
        organictype = "Organic" if "ORGANIC" in icons else "Non-Organic"

        # Servings per pack
        servings_per_pack = ""
        if nutritions and nutritions[0]:
            servings_per_pack = nutritions[0].get("basisQuantity", "")

        # Image URLs
        image_pack = product.get("imagePack", [])

        image_url = ""

        if image_pack:
            image = image_pack[0]  
            
            if image.get("small", {}).get("url", ""):
                image_url = image["small"]["url"]
            elif image.get("medium", {}).get("url", ""):
                image_url = image["medium"]["url"]
            elif image.get("large", {}).get("url", ""):
                image_url = image["large"]["url"]
        
        item = {
            "unique_id": str(unique_id) if unique_id else "",
            "product_name": product_name,
            "brand": brand,
            "grammage_quantity": str(grammage_quantity),
            "grammage_unit": grammage_unit,
            "regular_price": str(regular_price) if regular_price else "",
            "selling_price": str(selling_price) if selling_price else "",
            "price_was": str(price_was),
            "promotion_price": str(promotion_price),
            "promotion_valid_from": promotion_valid_from,
            "promotion_valid_upto": promotion_valid_upto,
            "promotion_description": promotion_description,
            "percentage_discount": percentage_discount,
            "price_per_unit": price_per_unit,
            "currency": "euro",
            "competitor_name": "albert_heijn",
            "pdp_url": pdp_url,
            "fat_percentage": fat_percentage,
            "product_description": product_description,
            "storage_instructions": storage_instructions,
            "instructions": instructions,
            "ingredients": ingredients,
            "nutritional_score": nutritional_score,
            "organictype": organictype,
            "servings_per_pack": str(servings_per_pack),
            "image_urls": image_url
        }

        product_hierarchy = ["Home", "Producten"] + [t.get("name", "") for t in product.get("taxonomies", [])]
        product_hierarchy_levels_count = 5

        for i in range(1, product_hierarchy_levels_count + 1):
            item[f'producthierarchy_level{i}'] = (
                product_hierarchy[i - 1] if i - 1 < len(product_hierarchy) else ""
            )

        item["breadcrumb"] = " > ".join(filter(None, product_hierarchy[:product_hierarchy_levels_count]))

        item = {k: str(v).replace("\n", " ").strip() if v is not None else "" for k, v in item.items()}

        try:
            productItem = ProductItem(**item)
            productItem.save()
            logging.info(f"Saved item with unique_id: {item.get('unique_id')}")

        except Exception as e:
            logging.error(f"Error while saving item with unique_id {item.get('unique_id')}: {e}")

          



if __name__ == "__main__":
    parser = Parser()
    parser.start()