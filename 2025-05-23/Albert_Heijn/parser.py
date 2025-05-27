from mongoengine import connect
from items import ProductItem
from settings import MONGO_DB,MONGO_URI
from pymongo import MongoClient
from curl_cffi import requests
import re

class Parser:
    def __init__(self):
        connect(db=MONGO_DB, host=MONGO_URI)

        client = MongoClient(MONGO_URI)
        self.crawler_collection = client[MONGO_DB]["ah_crawler"]

        self.headers = {
            'referer': 'https://www.ah.nl/producten/product/wi585895/arla-cultura-blauwe-bes',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        }

    def start(self):
        # Get all documents with a unique_id from the ah_crawler collection.
        docs = self.crawler_collection.find({}, {"unique_id": 1})
        unique_ids = []
        for doc in docs:
            if "unique_id" in doc:
                unique_ids.append(int(doc["unique_id"]))
            else:
                pass
        
        self.parse_items(unique_ids)

    def parse_items(self, unique_ids):

        def extract_quantity(text):
            match = re.search(r"([\d\.]+)", text)
            return match.group(1) if match else None

        def extract_unit(text):
            match = re.search(r"([A-Za-z]+)", text)
            return match.group(1) if match else None

        def extract_percentage(text):
            match = re.search(r"([\d\.]+)%", text)
            return match.group(1) if match else None

        for unique_id_from_db in unique_ids:

            payload = {
                'operationName': 'product',
                'variables': {
                    'id': unique_id_from_db,
                },
                'query': (
                    'query product($id: Int!, $date: String) {\n'
                    '  product(id: $id, date: $date) {\n'
                    '    ...productV2\n'
                    '    virtualBundleProducts {\n'
                    '      ...virtualBundleItem\n'
                    '      __typename\n'
                    '    }\n'
                    '    __typename\n'
                    '  }\n'
                    '}\n'
                    '\n'
                    'fragment productV2 on Product {\n'
                    '  ...baseProductFields\n'
                    '  interactionLabel\n'
                    '  icons\n'
                    '  isSample\n'
                    '  shopType\n'
                    '  privateLabel\n'
                    '  hasListPrice\n'
                    '  highlight\n'
                    '  highlights\n'
                    '  imagePack {\n'
                    '    ...productImage\n'
                    '    __typename\n'
                    '  }\n'
                    '  availability {\n'
                    '    ...availability\n'
                    '    __typename\n'
                    '  }\n'
                    '  taxonomies {\n'
                    '    ...productTaxonomies\n'
                    '    __typename\n'
                    '  }\n'
                    '  tradeItem {\n'
                    '    ...tradeItem\n'
                    '    __typename\n'
                    '  }\n'
                    '  priceV2(forcePromotionVisibility: true) {\n'
                    '    ...price\n'
                    '    __typename\n'
                    '  }\n'
                    '  virtualBundleProducts {\n'
                    '    quantity\n'
                    '    product {\n'
                    '      ...baseProductFields\n'
                    '      highlights\n'
                    '      imagePack {\n'
                    '        ...productImage\n'
                    '        __typename\n'
                    '      }\n'
                    '      availability {\n'
                    '        ...availability\n'
                    '        offline {\n'
                    '          status\n'
                    '          availableFrom\n'
                    '          __typename\n'
                    '        }\n'
                    '        __typename\n'
                    '      }\n'
                    '      priceV2(forcePromotionVisibility: true) {\n'
                    '        ...price\n'
                    '        __typename\n'
                    '      }\n'
                    '      taxonomies {\n'
                    '        ...productTaxonomies\n'
                    '        __typename\n'
                    '      }\n'
                    '      tradeItem {\n'
                    '        ...tradeItem\n'
                    '        __typename\n'
                    '      }\n'
                    '      properties {\n'
                    '        ...productProperties\n'
                    '        __typename\n'
                    '      }\n'
                    '      __typename\n'
                    '    }\n'
                    '    __typename\n'
                    '  }\n'
                    '  variant {\n'
                    '    ...variant\n'
                    '    __typename\n'
                    '  }\n'
                    '  variants {\n'
                    '    ...variant\n'
                    '    __typename\n'
                    '  }\n'
                    '  properties {\n'
                    '    ...productProperties\n'
                    '    __typename\n'
                    '  }\n'
                    '  otherSorts {\n'
                    '    ...productCardV2\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment baseProductFields on Product {\n'
                    '  id\n'
                    '  hqId\n'
                    '  title\n'
                    '  brand\n'
                    '  category\n'
                    '  webPath\n'
                    '  summary\n'
                    '  additionalInformation\n'
                    '  salesUnitSize\n'
                    '  webPath\n'
                    '  minBestBeforeDays\n'
                    '  isDeactivated\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment productImage on ProductImage {\n'
                    '  angle\n'
                    '  small {\n'
                    '    ...productImageRendition\n'
                    '    __typename\n'
                    '  }\n'
                    '  medium {\n'
                    '    ...productImageRendition\n'
                    '    __typename\n'
                    '  }\n'
                    '  large {\n'
                    '    ...productImageRendition\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment productImageRendition on ProductImageRendition {\n'
                    '  url\n'
                    '  width\n'
                    '  height\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment availability on ProductAvailability {\n'
                    '  maxUnits\n'
                    '  isOrderable\n'
                    '  isVisible\n'
                    '  availabilityLabel\n'
                    '  online {\n'
                    '    status\n'
                    '    availableFrom\n'
                    '    __typename\n'
                    '  }\n'
                    '  unavailableForOrder {\n'
                    '    status\n'
                    '    availableFrom\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment productTaxonomies on ProductTaxonomy {\n'
                    '  id\n'
                    '  name\n'
                    '  active\n'
                    '  parents\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItem on ProductTradeItem {\n'
                    '  gtin\n'
                    '  gtinRevisions\n'
                    '  gln\n'
                    '  description {\n'
                    '    ...tradeItemDescription\n'
                    '    __typename\n'
                    '  }\n'
                    '  resources {\n'
                    '    ...tradeItemResources\n'
                    '    __typename\n'
                    '  }\n'
                    '  contact {\n'
                    '    ...tradeItemContact\n'
                    '    __typename\n'
                    '  }\n'
                    '  ingredients {\n'
                    '    ...tradeItemIngredients\n'
                    '    __typename\n'
                    '  }\n'
                    '  nutritions {\n'
                    '    ...tradeItemNutritions\n'
                    '    __typename\n'
                    '  }\n'
                    '  feedingInstructions {\n'
                    '    statement\n'
                    '    __typename\n'
                    '  }\n'
                    '  usage {\n'
                    '    ...tradeItemUsage\n'
                    '    __typename\n'
                    '  }\n'
                    '  storage {\n'
                    '    ...tradeItemStorage\n'
                    '    __typename\n'
                    '  }\n'
                    '  additionalInfo {\n'
                    '    ...tradeItemAdditionalInfo\n'
                    '    __typename\n'
                    '  }\n'
                    '  marketing {\n'
                    '    ...tradeItemMarketing\n'
                    '    __typename\n'
                    '  }\n'
                    '  contents {\n'
                    '    ...tradeItemContents\n'
                    '    __typename\n'
                    '  }\n'
                    '  origin {\n'
                    '    ...tradeItemOrigin\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemDescription on ProductTradeItemDescription {\n'
                    '  descriptions\n'
                    '  definitions {\n'
                    '    ...tradeItemDefinitions\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemDefinitions on ProductTradeItemDescriptionDefinitions {\n'
                    '  dosageForm\n'
                    '  percentageOfAlcohol\n'
                    '  sunProtectionFactor\n'
                    '  fishCatchInfo\n'
                    '  fishCatchMethod\n'
                    '  animalType\n'
                    '  animalFeedType\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemResources on ProductTradeItemResources {\n'
                    '  icons {\n'
                    '    ...TradeItemResourceIcon\n'
                    '    __typename\n'
                    '  }\n'
                    '  attachments {\n'
                    '    ...TradeItemResourceAttachment\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment TradeItemResourceIcon on ProductTradeItemResourceIcon {\n'
                    '  id\n'
                    '  title\n'
                    '  type\n'
                    '  meta\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment TradeItemResourceAttachment on ProductTradeItemResourceAttachment {\n'
                    '  name\n'
                    '  format\n'
                    '  type\n'
                    '  value\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemContact on ProductTradeItemContact {\n'
                    '  name\n'
                    '  address\n'
                    '  communicationChannels {\n'
                    '    ...tradeItemCommunicationChannels\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemCommunicationChannels on ProductTradeItemCommunicationChannel {\n'
                    '  type\n'
                    '  value\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemIngredients on ProductTradeItemIngredients {\n'
                    '  allergens {\n'
                    '    ...tradeItemAllergens\n'
                    '    __typename\n'
                    '  }\n'
                    '  statement\n'
                    '  nonfoodIngredientStatement\n'
                    '  animalFeeding {\n'
                    '    ...tradeItemAnimalFeeding\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemAllergens on ProductTradeItemIngredientAllergens {\n'
                    '  list\n'
                    '  contains\n'
                    '  mayContain\n'
                    '  freeFrom\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemAnimalFeeding on ProductTradeItemIngredientsAnimalFeeding {\n'
                    '  statement\n'
                    '  analyticalConstituents\n'
                    '  additives\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemNutritions on ProductTradeItemNutrition {\n'
                    '  dailyValueIntakeReference\n'
                    '  nutrients {\n'
                    '    ...tradeItemNutrient\n'
                    '    __typename\n'
                    '  }\n'
                    '  servingSize\n'
                    '  servingSizeDescription\n'
                    '  preparationState\n'
                    '  additionalInfo {\n'
                    '    ...tradeItemNutritionAdditionalInfo\n'
                    '    __typename\n'
                    '  }\n'
                    '  basisQuantity\n'
                    '  basisQuantityDescription\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemNutrient on ProductTradeItemNutrient {\n'
                    '  type\n'
                    '  name\n'
                    '  value\n'
                    '  superscript\n'
                    '  dailyValue\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemNutritionAdditionalInfo on ProductTradeItemDefinition {\n'
                    '  value\n'
                    '  label\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemUsage on ProductTradeItemUsage {\n'
                    '  instructions\n'
                    '  ageDescription\n'
                    '  servingSuggestion\n'
                    '  preparationInstructions {\n'
                    '    extra\n'
                    '    contentLines\n'
                    '    __typename\n'
                    '  }\n'
                    '  dosageInstructions\n'
                    '  precautions\n'
                    '  warnings\n'
                    '  hazardStatements\n'
                    '  signalWords\n'
                    '  duringPregnancy\n'
                    '  duringBreastFeeding\n'
                    '  bacteriaWarning\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemStorage on ProductTradeItemStorage {\n'
                    '  instructions\n'
                    '  lifeSpan\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemAdditionalInfo on ProductTradeItemAdditionalInfo {\n'
                    '  salesConditions\n'
                    '  identificationNumbers {\n'
                    '    type\n'
                    '    label\n'
                    '    value\n'
                    '    __typename\n'
                    '  }\n'
                    '  certificationNumbers\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemMarketing on ProductTradeItemMarketing {\n'
                    '  features\n'
                    '  description\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemContents on ProductTradeItemContents {\n'
                    '  netContents\n'
                    '  servingSize\n'
                    '  drainedWeight\n'
                    '  servingsPerPackage\n'
                    '  statement\n'
                    '  eMark\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment tradeItemOrigin on ProductTradeItemOrigin {\n'
                    '  provenance\n'
                    '  activities {\n'
                    '    rearing\n'
                    '    birth\n'
                    '    slaughter\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment price on ProductPriceV2 {\n'
                    '  now {\n'
                    '    amount\n'
                    '    formattedV2\n'
                    '    __typename\n'
                    '  }\n'
                    '  was {\n'
                    '    amount\n'
                    '    __typename\n'
                    '  }\n'
                    '  unitInfo {\n'
                    '    price {\n'
                    '      amount\n'
                    '      __typename\n'
                    '    }\n'
                    '    description\n'
                    '    __typename\n'
                    '  }\n'
                    '  discount {\n'
                    '    description\n'
                    '    promotionType\n'
                    '    segmentType\n'
                    '    subtitle\n'
                    '    theme\n'
                    '    tieredOffer\n'
                    '    wasPriceVisible\n'
                    '    smartLabel\n'
                    '    availability {\n'
                    '      startDate\n'
                    '      endDate\n'
                    '      __typename\n'
                    '    }\n'
                    '    __typename\n'
                    '  }\n'
                    '  promotionShields {\n'
                    '    ...promotionShield\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment promotionShield on BonusSegmentDiscountShield {\n'
                    '  text\n'
                    '  emphasis\n'
                    '  theme\n'
                    '  defaultDescription\n'
                    '  title\n'
                    '  topText\n'
                    '  centerText\n'
                    '  bottomText\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment productProperties on ProductProperty {\n'
                    '  code\n'
                    '  values\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment variant on ProductVariant {\n'
                    '  label\n'
                    '  type\n'
                    '  product {\n'
                    '    id\n'
                    '    hqId\n'
                    '    title\n'
                    '    brand\n'
                    '    category\n'
                    '    minBestBeforeDays\n'
                    '    hasListPrice\n'
                    '    salesUnitSize\n'
                    '    isSample\n'
                    '    highlight\n'
                    '    icons\n'
                    '    taxonomies {\n'
                    '      ...productTaxonomies\n'
                    '      __typename\n'
                    '    }\n'
                    '    imagePack {\n'
                    '      angle\n'
                    '      small {\n'
                    '        height\n'
                    '        url\n'
                    '        width\n'
                    '        __typename\n'
                    '      }\n'
                    '      __typename\n'
                    '    }\n'
                    '    priceV2(forcePromotionVisibility: true) {\n'
                    '      ...price\n'
                    '      __typename\n'
                    '    }\n'
                    '    properties {\n'
                    '      code\n'
                    '      values\n'
                    '      __typename\n'
                    '    }\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment productCardV2 on Product {\n'
                    '  id\n'
                    '  hqId\n'
                    '  title\n'
                    '  brand\n'
                    '  category\n'
                    '  webPath\n'
                    '  salesUnitSize\n'
                    '  interactionLabel\n'
                    '  icons\n'
                    '  isSample\n'
                    '  shopType\n'
                    '  highlight\n'
                    '  highlights\n'
                    '  isSponsored\n'
                    '  privateLabel\n'
                    '  hasListPrice\n'
                    '  additionalInformation\n'
                    '  imagePack {\n'
                    '    angle\n'
                    '    small {\n'
                    '      height\n'
                    '      url\n'
                    '      width\n'
                    '      __typename\n'
                    '    }\n'
                    '    __typename\n'
                    '  }\n'
                    '  availability {\n'
                    '    ...availability\n'
                    '    __typename\n'
                    '  }\n'
                    '  tradeItem {\n'
                    '    gtin\n'
                    '    gtinRevisions\n'
                    '    __typename\n'
                    '  }\n'
                    '  priceV2(forcePromotionVisibility: true) {\n'
                    '    ...price\n'
                    '    __typename\n'
                    '  }\n'
                    '  virtualBundleProducts {\n'
                    '    quantity\n'
                    '    __typename\n'
                    '  }\n'
                    '  variant {\n'
                    '    ...variant\n'
                    '    __typename\n'
                    '  }\n'
                    '  variants {\n'
                    '    ...variant\n'
                    '    __typename\n'
                    '  }\n'
                    '  properties {\n'
                    '    code\n'
                    '    values\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}\n'
                    '\n'
                    'fragment virtualBundleItem on ProductVirtualBundleItem {\n'
                    '  quantity\n'
                    '  product {\n'
                    '    ...productV2\n'
                    '    __typename\n'
                    '  }\n'
                    '  __typename\n'
                    '}'
                ),
            }
            
            response = requests.post('https://www.ah.nl/gql', headers=self.headers, impersonate='chrome101', json=payload)
            print("Response status code for unique_id", unique_id_from_db, ":", response.status_code)
            
            try:
                response_json = response.json()
            except:
                pass

            product = response_json["data"]["product"]

            # Unique id, product name, brand
            unique_id = product.get("id")
            product_name = product.get("title")
            brand = product.get("brand")

            # Grammage: from tradeItem->contents->netContents
            trade_item = product.get("tradeItem") or {}
            contents = trade_item.get("contents") or {}
            net_contents = contents.get("netContents") or []
            if net_contents:
                grammage_quantity = extract_quantity(net_contents[0])
                grammage_unit = extract_unit(net_contents[0])
            else:
                grammage_quantity = None
                grammage_unit = None

            # Product hierarchy levels
            taxonomies = product.get("taxonomies", [])
            producthierarchy_level1 = "Home"
            producthierarchy_level2 = "Producten"
            producthierarchy_level3 = taxonomies[0]["name"] if len(taxonomies) >= 1 else None
            producthierarchy_level4 = taxonomies[1]["name"] if len(taxonomies) >= 2 else None
            producthierarchy_level5 = taxonomies[2]["name"] if len(taxonomies) >= 3 else None

            # Prices: extract regular and selling prices from priceV2.
            priceV2 = product.get("priceV2") or {}
            selling_price = priceV2.get("now", {}).get("amount")
            was_field = priceV2.get("was")
            if was_field is None:
                regular_price = selling_price
                price_was = None
                promotion_price = selling_price
                discount = {}
                promotion_description = None
                promotion_valid_from = None
                promotion_valid_upto = None
                percentage_discount = None
            else:
                regular_price = was_field.get("amount")
                if regular_price != selling_price:
                    price_was = regular_price
                    promotion_price = selling_price
                else:
                    price_was = None
                    promotion_price = None

                discount = priceV2.get("discount") or {}
                promotion_description = discount.get("description")
                availability = discount.get("availability") or {}
                promotion_valid_from = availability.get("startDate")
                promotion_valid_upto = availability.get("endDate")

                # Extract percentage discount from promotionShields field
                promotion_shields = priceV2.get("promotionShields", [])
                percentage_discount = None
                if promotion_shields:
                    shield_texts = promotion_shields[0].get("text", [])
                    if shield_texts:
                        percentage_discount = extract_percentage(shield_texts[0])

            # Price per unit from unitInfo
            unitInfo = priceV2.get("unitInfo") or {}
            ppu_amount = unitInfo.get("price", {}).get("amount")
            ppu_description = unitInfo.get("description")
            price_per_unit = f"{ppu_amount} per {ppu_description}" if ppu_amount and ppu_description else None

            # Breadcrumb: join the product hierarchy levels
            breadcrumb_levels = [producthierarchy_level1, producthierarchy_level2,
                                 producthierarchy_level3, producthierarchy_level4, producthierarchy_level5]
            breadcrumb = " > ".join(filter(None, breadcrumb_levels))

            # PDP URL: prefix webPath with the domain
            webPath = product.get("webPath", "")
            pdp_url = f"https://www.ah.nl{webPath}"

            # Fat percentage: from nutritions list, search for nutrient with type "FAT"
            nutritions = trade_item.get("nutritions") or []
            fat_percentage_raw = None
            if nutritions:
                nutrients = nutritions[0].get("nutrients") or []
                for nutrient in nutrients:
                    if nutrient.get("type") == "FAT":
                        fat_percentage_raw = nutrient.get("value")
                        break
            fat_percentage = extract_quantity(fat_percentage_raw) if fat_percentage_raw else None

            # Product description: join the list from tradeItem->description->descriptions
            description = trade_item.get("description") or {}
            descriptions_list = description.get("descriptions") or []
            product_description = " ".join(descriptions_list) if descriptions_list else None

            # Storage instructions: join list from tradeItem->storage->instructions
            storage = trade_item.get("storage") or {}
            storage_instructions_list = storage.get("instructions") or []
            storage_instructions = " ".join(storage_instructions_list) if storage_instructions_list else None

            # Usage instructions: join list from tradeItem->usage->instructions
            usage = trade_item.get("usage") or {}
            usage_instructions_list = usage.get("instructions") or []
            instructions = " ".join(usage_instructions_list) if usage_instructions_list else None

            # Ingredients: from tradeItem->ingredients->statement
            ingredients = (trade_item.get("ingredients") or {}).get("statement")

            # Nutritional score and organic type from icons list.
            icons = product.get("icons", [])
            nutritional_score = None
            for icon in icons:
                if icon.startswith("NUTRISCORE_"):
                    nutritional_score = icon.split("_", 1)[1]
                    break
            organictype = "Organic" if "ORGANIC" in icons else "Non-Organic"

            # Servings per pack: from nutritions->basisQuantity
            servings_per_pack = (nutritions[0].get("basisQuantity") if nutritions and nutritions[0] else None)

            image_pack = product.get("imagePack", [])
            image_urls_list = []  

            for image in image_pack:
                small_url = image.get("small", {}).get("url", "")
                medium_url = image.get("medium", {}).get("url", "")
                large_url = image.get("large", {}).get("url", "")
            
                if small_url:
                    image_urls_list.append(small_url)
                if medium_url:
                    image_urls_list.append(medium_url)
                if large_url:
                    image_urls_list.append(large_url)

            image_urls = ", ".join(image_urls_list)

            item = {
                "unique_id": unique_id,
                "product_name": product_name,
                "brand": brand,
                "grammage_quantity": grammage_quantity,
                "image_urls": image_urls,
                "grammage_unit": grammage_unit,
                "producthierarchy_level1": producthierarchy_level1,
                "producthierarchy_level2": producthierarchy_level2,
                "producthierarchy_level3": producthierarchy_level3,
                "producthierarchy_level4": producthierarchy_level4,
                "producthierarchy_level5": producthierarchy_level5,
                "regular_price": regular_price,
                "selling_price": selling_price,
                "price_was": price_was,
                "promotion_price": promotion_price,
                "promotion_valid_from": promotion_valid_from,
                "promotion_valid_upto": promotion_valid_upto,
                "promotion_description": promotion_description,
                "percentage_discount": percentage_discount,
                "price_per_unit": price_per_unit,
                "currency": "€",
                "competitor_name": "albert_heijn",
                "breadcrumb": breadcrumb,
                "pdp_url": pdp_url,
                "fat_percentage": fat_percentage,
                "product_description": product_description,
                "storage_instructions": storage_instructions,
                "instructions": instructions,
                "ingredients": ingredients,
                "nutritional_score": nutritional_score,
                "organictype": organictype,
                "servings_per_pack": servings_per_pack,
            }
            item = {k: str(v) if v is not None else "" for k, v in item.items()}

            try:
                productItem = ProductItem(**item)
                productItem.save()
            except Exception as e:
                print(f"Error while saving: {e}")

            print(item)

if __name__ == "__main__":
    parser = Parser()
    parser.start()
