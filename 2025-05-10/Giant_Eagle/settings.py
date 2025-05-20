import logging
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger()

# MongoDB Config
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "Gt_eagle"
CRAWLER_COLLECTION = "ge_crawler"
PARSER_COLLECTION = "ge_parser"

# MongoDB Client and DB
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

# Collections
crawler_collection = db[CRAWLER_COLLECTION]
parser_collection = db[PARSER_COLLECTION]

MONGO_COLLECTION_DATA = "ge_parser"

# Ensure Index
parser_collection.create_index("unique_id", unique=True)

FILE_NAME_FULLDUMP = "ge_products_export.csv"

url = "https://core.shop.gianteagle.com/api/v2"

headers = {
    "accept": "application/json, text/plain, */*",
    "content-type": "application/json;charset=utf-8",
    "origin": "https://www.gianteagle.com",
    "referer": "https://www.gianteagle.com/",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "x-hl-app": "grocery",
    "x-hl-client": "web",
    "x-hl-referrer": "https://www.gianteagle.com/category/produce/fruit/275",
    "x-hl-request-id": "o9lebm8jd",
    "x-hl-session-id": "5ACAE142-56F0-459C-EE40-39865BE737CE",
    "x-hl-session-start": "1747665659940",
    "x-hl-version": "64b9d86f9effad1",
    "cache-control": "no-cache",
}

def get_payload(category_id="1146", cursor=None, count=34):
    variables = {
        "filters": {
            "query": "",
            "brandIds": [],
            "healthClaimIds": [],
            "savings": [],
            "circular": False,
            "categoryId": category_id,
            "excludeRestricted": False
        },
        "store": {
            "storeCode": "VIRTUAL"
        },
        "sort": "bestMatch",
        "count": count
    }

    if cursor:
        variables["cursor"] = cursor  

    payload = {
        "operationName": "GetProducts",
        "variables": variables,
        "query": """
            fragment GetProductTileData on Product {
              allergens
              brand
              categoryNames
              categorySeoUrls
              comparedPrice
              coupons {
                conditions {
                  minBasketValue
                  minQty
                  offerType
                  __typename
                }
                couponScope
                description
                disclaimer
                expiryDate
                id
                imageUrl
                products {
                  sku
                  __typename
                }
                rewards {
                  offerValue
                  rewardQuantity
                  __typename
                }
                summary
                __typename
              }
              description
              directions
              displayItemSize
              displayPricePerUnit
              eventId
              fulfillmentMethods
              healthClaims
              id
              images {
                fileSize
                format
                height
                kind
                url
                width
                __typename
              }
              indications
              ingredients
              name
              offers {
                brand
                id
                image
                offerDetailsType
                offerType
                rewardInfo
                tags
                title
                __typename
              }
              price
              pricingModel
              productLocation {
                aisleLocation
                __typename
              }
              restrictions {
                restrictionKind
                __typename
              }
              inventoryStatus
              isNewLowPrice
              isEverydaySavings
              isFoodStampItem
              scopedPromo {
                priceLock
                qty
                __typename
              }
              scopedPromoDisplayPricePerUnit
              scopedPromoPrice
              scopedPromoUnitPrice
              sizeOfFirstAdd
              sizes
              sku
              unitPrice
              unitQty
              units
              vendor
              warnings
              previouslyPurchased
              lastPurchaseDate
              __typename
            }

            query GetProducts($cursor: String, $count: Int, $filters: ProductFilters, $store: StoreInput!, $sort: ProductSortKey) {
              products(
                first: $count
                after: $cursor
                filters: $filters
                store: $store
                sort: $sort
              ) {
                edges {
                  cursor
                  node {
                    ...GetProductTileData
                    __typename
                  }
                  __typename
                }
                pageInfo {
                  endCursor
                  hasNextPage
                  __typename
                }
                totalCount
                queryId
                responseId
                __typename
              }
            }
        """
    }
    return payload
