import settings

CATEGORY_MAPPING = {
    "verse zuivel": "verse-zuivel",
    "kaas": "kaas",
    "frisdrank": "frisdrank",
    "chips noten": "chips"
}

def extract_category_for_algolia(self, url):
    parts = url.split('/')
    if len(parts) > 1:
        category_part = parts[-1].replace(".html", "").replace("-", " ")
        return settings.CATEGORY_MAPPING.get(category_part, category_part.replace(" ", "-"))
    return ""


test_urls = [
    "https://www.aldi.nl/producten/kaas-vleeswaren-tapas/kaas.html",
    "https://www.aldi.nl/producten/chips--noten/chips.html"
]