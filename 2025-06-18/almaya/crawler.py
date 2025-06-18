import requests
from parsel import Selector

headers = {
    "User-Agent": "Mozilla/5.0"
}

base_url = "https://www.almayaonline.com/fresh-fruits-and-vegetables"

def scrape_products():
    page_number = 1
    total_count = 0

    while True:
        url = f"{base_url}?pagenumber={page_number}&orderby=0&viewmode=grid&pagesize=16"
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            print(f" Failed to fetch page {page_number}. Status code: {response.status_code}")
            break

        selector = Selector(text=response.text)
        products = selector.xpath('//div[contains(@class, "item-box")]')

        if not products:
            print(" No more products found. Pagination ended.")
            break

        for product in products:
            product_name = product.xpath('.//h2[@class="product-title"]/a/text()').get(default="").strip()
            product_url = product.xpath('.//h2[@class="product-title"]/a/@href').get(default="").strip()
            product_price = product.xpath('.//span[contains(@class,"actual-price")]/text()').get(default="").strip()
            product_image = product.xpath('.//div[@class="picture"]/a/img/@src').get(default="").strip()

            item = {
                "product_name": product_name,
                "product_url": f"https://www.almayaonline.com{product_url}",
                "product_price": product_price,
                "product_image": product_image
            }

            print(item)
            total_count += 1

        page_number += 1

    print(f" Total products scraped: {total_count}")

scrape_products()
