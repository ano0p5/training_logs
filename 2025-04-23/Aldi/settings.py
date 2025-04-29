headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "referer": "https://www.aldi.nl/"
}

urls = [
    "https://www.aldi.nl/producten/zuivel-eieren-boter/verse-zuivel.html",
    "https://www.aldi.nl/producten/kaas-vleeswaren-tapas/kaas.html",
    "https://www.aldi.nl/producten/sappen-frisdrank/frisdrank.html",
    "https://www.aldi.nl/producten/chips--noten/chips.html"
]

# Algolia API details
ALGOLIA_APP_ID = "2HU29PF6BH"
ALGOLIA_API_KEY = "686cf0c8ddcf740223d420d1115c94c1"
ALGOLIA_INDEX_NAME = "an_prd_nl_nl_products"
ALGOLIA_QUERY_URL = f"https://{ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/*/queries"

# Request headers for Algolia
HEADERS = {
    "Content-Type": "application/json",
    "x-algolia-api-key": ALGOLIA_API_KEY,
    "x-algolia-application-id": ALGOLIA_APP_ID,
}

# List of Aldi product category URLs
URLS = [
    "https://www.aldi.nl/producten/zuivel-eieren-boter/verse-zuivel.html",
    "https://www.aldi.nl/producten/kaas-vleeswaren-tapas/kaas.html",
    "https://www.aldi.nl/producten/sappen-frisdrank/frisdrank.html",
    "https://www.aldi.nl/producten/chips--noten/chips.html"
]

# Aldi Product URL Base
ALDI_PRODUCT_URL_BASE = "https://www.aldi.nl/product/"
ALDI_PRODUCT_URL_SUFFIX = ".html"

# Category Mapping (if needed)
CATEGORY_MAPPING = {
    "verse zuivel": "verse-zuivel",
    "kaas": "kaas",
    "frisdrank": "frisdrank",
    "chips noten": "chips"  # Adjust if needed
}