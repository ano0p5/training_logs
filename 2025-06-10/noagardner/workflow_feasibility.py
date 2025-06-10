#Category urls


import requests
from parsel import Selector

url = "https://noragardner.com/"


response = requests.get(url)
selector = Selector(response.text)

category_urls = selector.xpath("//div[contains(@class, 'megamenu')]//a[contains(@class, 'site-nav__dropdown-link') and not(contains(@class, 'site-nav__dropdown-link--top-level'))]/@href").getall()

for url in category_urls:
    print(f"https://noragardner.com{url}")
    
#Product crawler

"product_name": selector.xpath('//div[@data-product-handle]/@data-product-handle').get(),
"product_id": selector.xpath('//div[@data-product-id]/@data-product-id').get(),
"product_url": selector.xpath('//a[@class="grid-product__link"]/@href').get(),
"product_price": selector.xpath('//div[@class="grid-product__price"]/text()').get(),
