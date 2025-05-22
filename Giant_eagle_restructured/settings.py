import logging
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger()

# MongoDB Config
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "Gt_eg"
PARSER_COLLECTION = "ge_parser"

# MongoDB Client and DB
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]


parser_collection = db[PARSER_COLLECTION]


# Ensure Index
parser_collection.create_index("unique_id", unique=True)

FILE_NAME_FULLDUMP = "ge_products_export.csv"

payload = {
    "operationName": "GetProducts",
    "variables": {},  
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

