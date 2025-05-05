import logging
from parsel import Selector
import requests
import json
from datetime import datetime
from pymongo import MongoClient

# Configure logging (set to INFO to reduce verbosity)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class AldiProductParser:
    """Parses product information from Aldi product pages, attempting to extract all requested fields."""

    def __init__(self):
        """Initializes the parser and MongoDB client."""
        self.headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
        }
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['aldi']
        self.collection = self.db['crawler']

    def fetch_html(self, url: str):
        """Fetches the HTML content of a given URL."""
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.text
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching URL '{url}': {e}")
            return ""

    def parse_product(self, html_content: str, url: str) -> dict:
        """Parses the HTML content to extract product information for all requested fields."""
        selector = Selector(text=html_content)
        product_data = {}
        all_image_urls = []

        try:

            product_data['unique_id'] = ""
            product_data['competitor_name'] = "aldi"
            product_data['extraction_date'] = datetime.now().strftime("%Y-%m-%d")
            product_data['product_name'] = selector.xpath('//h1[@class="product-header__variant"]/text()').get(default='').strip()
            product_data['brand'] = selector.xpath('//p[@class="product-header__brand"]/text()').get(default='').strip()
            weight_text = selector.xpath('//div[@class="price-info__additional-det"]/p[1]/text()').get(default='').strip()
            quantity = ''.join(filter(str.isdigit, weight_text))
            unit = ''.join(filter(str.isalpha, weight_text)).strip()
            product_data['grammage_quantity'] = int(quantity) if quantity else ""
            product_data['grammage_unit'] = unit if unit else ""
            breadcrumbs_list = [crumb.strip() for crumb in selector.xpath('//div[@data-testid="breadcrumbs-container"]//li[@class="breadcrumbs__item"]/a/span/text()').getall()]
            product_data['breadcrumb'] = ' > '.join(breadcrumbs_list)
            product_data['producthierarchy_level1'] = breadcrumbs_list[0] if len(breadcrumbs_list) > 0 else ""
            product_data['producthierarchy_level2'] = breadcrumbs_list[1] if len(breadcrumbs_list) > 1 else ""
            product_data['producthierarchy_level3'] = breadcrumbs_list[2] if len(breadcrumbs_list) > 2 else ""
            product_data['producthierarchy_level4'] = ""
            product_data['producthierarchy_level5'] = ""
            product_data['regular_price'] = selector.xpath('//div[@class="price-info__container__sale-section__value"]/text()').get(default='').strip()
            product_data['selling_price'] = product_data['regular_price']
            product_data['price_was'] = ""
            product_data['promotion_price'] = ""
            product_data['promotion_valid_from'] = ""
            product_data['promotion_valid_upto'] = ""
            product_data['promotion_type'] = ""
            product_data['percentage_discount'] = ""
            product_data['promotion_description'] = ""
            product_data['price_per_unit'] = ""
            product_data['currency'] = 'EUR'
            product_data['pdp_url'] = url
            product_data['Fat %'] = ""
            product_data['variants'] = ""
            product_data['product_description'] = ""
            product_data['instructions'] = ""
            product_data['storage_instructions'] = ""
            product_data['country_of_origin'] = "nl"
            product_data['allergens'] = ""
            product_data['nutritional_score'] = ""
            product_data['organictype'] = ""
            product_data['upc'] = ""
            product_data['ingredients'] = ""
            product_data['servings_per_pack'] = ""

            next_data_script = selector.xpath('//script[@id="__NEXT_DATA__"]/text()').get()
            if next_data_script:
                try:
                    next_data_json = json.loads(next_data_script)
                    product_detail_data = next_data_json.get('props', {}).get('pageProps', {}).get('productDetailData')
                    if product_detail_data:

                        product_data['unique_id'] = product_detail_data.get('variantID', "")
                        product_data['upc'] = product_detail_data.get('variantID', "")

                        # Images
                        if 'images' in product_detail_data and 'nl' in product_detail_data['images']:
                            images_nl = product_detail_data['images']['nl']
                            for image_info in images_nl:
                                if isinstance(image_info, dict) and 'url' in image_info:
                                    all_image_urls.append(image_info['url'])
                            product_data['img_urls'] = ','.join(list(set(all_image_urls)))


                        # Prices and Promotions
                        prices = product_detail_data.get('prices', [])
                        if prices:
                            current_price_info = next((p for p in prices if p.get('validUntil') > int(datetime.now().timestamp() * 1000)), prices[-1] if prices else {})
                            product_data['regular_price'] = str(current_price_info.get('priceValue')) if current_price_info.get('priceValue') is not None else product_data['regular_price']
                            product_data['selling_price'] = product_data['regular_price']
                            product_data['price_was'] = str(current_price_info.get('strikePriceValue')) if current_price_info.get('strikePriceValue') is not None else ""
                            base_price = current_price_info.get('basePriceValue')
                            if base_price is not None:
                                product_data['price_per_unit'] = str(base_price)

                            promotion = product_detail_data.get('promotion')
                            if promotion and promotion.get('validFrom') and promotion.get('validUntil') and promotion.get('priceValue'):
                                product_data['promotion_price'] = str(promotion['priceValue'])
                                product_data['promotion_valid_from'] = datetime.fromtimestamp(promotion['validFrom'] / 1000).strftime("%Y-%m-%d")
                                product_data['promotion_valid_upto'] = datetime.fromtimestamp(promotion['validUntil'] / 1000).strftime("%Y-%m-%d")
                                product_data['promotion_description'] = promotion.get('reduction', {}).get('nl', "")
                                if product_data['price_was'] and product_data['promotion_price']:
                                    try:
                                        discount = ((float(product_data['price_was']) - float(product_data['promotion_price'])) / float(product_data['price_was'])) * 100
                                        product_data['percentage_discount'] = f"{discount:.2f}%"
                                    except (ValueError, TypeError, ZeroDivisionError):
                                        product_data['percentage_discount'] = ""
                                product_data['promotion_type'] = "discount" if product_data['promotion_price'] else ""
                            elif prices and len(prices) > 1 and prices[0].get('reduction') and prices[0].get('validFrom') and prices[0].get('validUntil') and prices[0].get('priceValue'):
                                if prices[0].get('reduction', {}).get('nl'):
                                    product_data['promotion_description'] = prices[0]['reduction']['nl']
                                    product_data['promotion_valid_from'] = datetime.fromtimestamp(prices[0]['validFrom'] / 1000).strftime("%Y-%m-%d")
                                    product_data['promotion_valid_upto'] = datetime.fromtimestamp(prices[0]['validUntil'] / 1000).strftime("%Y-%m-%d")
                                    product_data['promotion_price'] = str(prices[0].get('priceValue'))
                                    product_data['promotion_type'] = "offer"

                        # Attempt to extract product description from longDescription
                        product_data['product_description'] = product_detail_data.get('longDescription', {}).get('nl', "")

                except json.JSONDecodeError as e:
                    logging.error(f"Error decoding __NEXT_DATA__ JSON: {e}")
                except Exception as e:
                    logging.error(f"Error extracting data from __NEXT_DATA__: {e}")

        except Exception as e:
            logging.error(f"Error parsing product information from '{url}': {e}")
            return {}

        return product_data

    def process_url(self, url: str):
        """Fetches and parses the product information from a given URL."""
        html_content = self.fetch_html(url)
        if html_content:
            product_data = self.parse_product(html_content, url)
            return product_data
        else:
            logging.warning(f"Could not fetch HTML for: {url}")
            return ""

if __name__ == "__main__":
    parser = AldiProductParser()

    # Fetch all documents from the 'crawler' collection
    product_documents = parser.collection.find()

    if product_documents:
        print("Processing product URLs from MongoDB:")
        for doc in product_documents:
            url = doc.get('pdp_url')
            if url:
                print(f"Processing URL: {url}")
                product_details = parser.process_url(url)
                if product_details:
                    # Remove the 'file_name_1' key from the dictionary
                    if 'file_name_1' in product_details:
                        del product_details['file_name_1']
                    print("\nExtracted Product Data:")
                    import json
                    print(json.dumps(product_details, indent=2, ensure_ascii=False))
                    print("-" * 20)
                else:
                    print(f"Could not retrieve product information from {url}")
            else:
                logging.warning("Skipping document with missing 'pdp_url'")
    else:
        print("No product URLs found in the MongoDB collection.")

    # Close the MongoDB connection
    parser.client.close()