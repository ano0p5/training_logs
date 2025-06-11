import requests
from parsel import Selector

start_url = "https://noragardner.com/collections/dresses"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

response = requests.get(start_url, headers=headers)
sel = Selector(response.text)

product_elements = sel.xpath('//a[contains(@class, "grid-product__link")]')

for product in product_elements:
    product_url = product.xpath('./@href').get(default='')
    full_url = f"https://noragardner.com{product_url}" if product_url else ''

    product_name = product.xpath('.//div[contains(@class, "grid-product__title")]/text()').get(default='').strip()
    price = product.xpath('.//div[contains(@class, "grid-product__price")]/text()').get(default='').strip()

    # Primary image
    image_url_1 = product.xpath('.//div[@class="image-wrap"]/img/@data-src').get(default='').strip()

    # Secondary image
    image_url_2 = product.xpath('.//div[contains(@class,"grid-product__secondary-image")]/img/@data-srcset').get(default='').split()[0].strip() if product.xpath('.//div[contains(@class,"grid-product__secondary-image")]/img/@data-srcset') else ''

    print({
        "product_name": product_name,
        "price": price,
        "product_url": full_url,
        "image_url_1": image_url_1,
        "image_url_2": image_url_2
    })
