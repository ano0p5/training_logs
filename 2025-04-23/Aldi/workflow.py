import requests
from parsel import Selector

headers = {
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "referer": "https://www.aldi.nl/"
}

url = "https://www.aldi.nl/producten.html"
base_url = "https://www.aldi.nl"

response = requests.get(url, headers=headers)
selector = Selector(response.text)

products_menu = selector.xpath(
    '//li[contains(@class, "header__bottomSection__bottomMenuSection__listItem") and .//a[contains(@data-attr-2, "PRODUCTEN")]]'
)

main_category_urls = set()
subcategory_urls = set()

if products_menu:
    columns = products_menu.xpath('.//div[@class="subnavigation__content"]/ul')
    for col in columns:
        main_links = col.xpath('./li[contains(@class, "subnavigation__content__col__list")]/a/@href').getall()
        sub_links = col.xpath('./li[contains(@class, "subnavigation__content__col__subcategory__list")]/a/@href').getall()

        for href in main_links:
            main_category_urls.add(base_url + href)

        for href in sub_links:
            subcategory_urls.add(base_url + href)

    print("category_urls:")
    for url in sorted(main_category_urls):
        print(f"- {url}")

    print("\nsub_category_urls:")
    for url in sorted(subcategory_urls):
        print(f"- {url}")

