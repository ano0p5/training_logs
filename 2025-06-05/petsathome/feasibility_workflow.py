import logging
import requests
from parsel import Selector

class PetsAtHomeEANChecker:
    def __init__(self, ean_list):
        self.ean_list = ean_list
        self.headers = {
            "User-Agent": "Mozilla/5.0"
        }
        self.success_count = 0
        self.failure_count = 0

        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(levelname)s - %(message)s"
        )

    def fetch_product_data(self):
        for ean in self.ean_list:
            url = f"https://www.petsathome.com/search?searchTerm='{ean}'"
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                if response.status_code != 200:
                    logging.warning(f"[{ean}] Failed to fetch page: {response.status_code}")
                    self.failure_count += 1
                    continue

                sel = Selector(text=response.text)
                product = sel.xpath('//article[contains(@class, "product-tile_root__Gd_H0")]').get()
                if not product:
                    logging.info(f"[{ean}] Product not found")
                    self.failure_count += 1
                    continue

                self.success_count += 1
                product_item = {
                    "ean": ean,
                    "product_name": sel.xpath('//article[contains(@class, "product-tile_root__Gd_H0")]//h3/text()').get(default="").strip(),
                    "product_url": "https://www.petsathome.com" + sel.xpath('//article[contains(@class, "product-tile_root__Gd_H0")]//a/@href').get(default="").strip(),
                    "product_image": sel.xpath('//article[contains(@class, "product-tile_root__Gd_H0")]//img/@src').get(default="").strip(),
                    "product_price": sel.xpath('//article[contains(@class, "product-tile_root__Gd_H0")]//p[contains(@class, "price") or contains(@class, "product-tile_price__")]/text()').get(default="").strip()
                }

                logging.info(product_item)

            except Exception as e:
                logging.error(f"[{ean}] Exception occurred: {e}")
                self.failure_count += 1

    def print_summary(self):
        total = len(self.ean_list)
        success_rate = (self.success_count / total) * 100
        failure_rate = (self.failure_count / total) * 100

        logging.info("===== SUMMARY =====")
        logging.info(f"Total EANs Processed : {total}")
        logging.info(f" Success Percentage     : {self.success_count} ({success_rate:.2f}%)")
        logging.info(f"Failure Percentage : {self.failure_count} ({failure_rate:.2f}%)")


if __name__ == "__main__":
    ean_list = [
        "76344107521", "76344107491", "76344108115", "76344107538", "76344118572",
        "76344105398", "76344107262", "76344108320", "76344116639", "76344106661",
        "64992523206", "64992525200", "64992523602", "64992525118", "64992714369",
        "64992714376", "64992719814", "64992719807", "5060184240512", "5060184240703",
        "5060184240598", "5060184244909", "5060184240109", "5425039485256", "5425039485010",
        "5425039485263", "5425039485034", "5425039485317", "5407009646591", "5407009640353",
        "5407009640391", "5407009640636", "5407009641022", "3182551055672", "3182551055788",
        "3182551055719", "3182551055825", "9003579008362", "3182550704625", "3182550706933",
        "9003579013793", "9003579013861"
    ]

    obj = PetsAtHomeEANChecker(ean_list)
    obj.fetch_product_data()
    obj.print_summary()
