import parsel
from pathlib import Path

# Define the path to your HTML file
html_file_path = Path("/home/anoop/training_log/2025-04-10/dirk/products_html/Arla Organic Buttermilk. Now at Dirk _ Dirk.html")

# Read the content of the HTML file
with open(html_file_path, 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parse the HTML content with Parsel
selector = parsel.Selector(html_content)

# Safe extraction function with error handling
def safe_extract(css_selector):
    result = selector.css(css_selector).get()
    if result:
        return result.strip()
    return ""

# Extract product details
product_name = safe_extract('h1[data-v-cb259a3e]::text')
image_url = selector.css('img.product-image::attr(src)').get() or ""
subtitle = safe_extract('p.subtitle::text')
description = safe_extract('div.description::text')
price = safe_extract('span.price-large::text') + safe_extract('span.price-small::text')

# Extract ingredients and allergens
ingredients = safe_extract('article[data-v-fa649d13] p::text')
allergens = selector.css('article[data-v-fa649d13] ul li::text').getall()

# Extract nutritional information
nutrition_items = selector.css('div.nutrition-item')
nutrition = {}
for item in nutrition_items:
    nutrient_name = item.css('span::text').get().strip()
    nutrient_value = item.css('span + span::text').get().strip()
    nutrition[nutrient_name] = nutrient_value

# Extract usage advice
usage_advice = safe_extract('article[data-v-fa649d13] p::text')

# Extract sender and address
sender_address = selector.css('article[data-v-fa649d13] p::text').getall()

# Extract disclaimer
disclaimer = safe_extract('article[data-v-fa649d13] p::text')

# Print extracted information
extracted_data = {
    'product_name': product_name,
    'image_url': image_url,
    'subtitle': subtitle,
    'description': description,
    'price': price,
    'ingredients': ingredients,
    'allergens': allergens,
    'nutrition': nutrition,
    'usage_advice': usage_advice,
    'sender_address': sender_address,
    'disclaimer': disclaimer
}

# Output the extracted data
for key, value in extracted_data.items():
    print(f"{key}: {value}")
