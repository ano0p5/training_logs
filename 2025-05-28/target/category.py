import requests
from parsel import Selector
import re
from settings import category_collection, sub_category_collection, logger

def categories(category_id, title):
    api_url = (
        "https://redoak.target.com/content-publish/pages/v1"f"?url=%2Fc%2F-%2F{category_id}""&visitor_id=0196F7E091610201A9DF8DB51BD38EEB""&children=true""&breadcrumbs=true"f"&pageId=%2Fc%2F{category_id[2:]}""&platform=desktop""&key=9f36aeafbe60771e321a7cc95a78140772ab3e96"
    )
    try:
        response = requests.get(api_url)
        data = response.json()

        children = data.get('metadata', {}).get('children', [])
        logger.info(f"Found {len(children)} subcategories for main category '{title}'")

        for child in children:
            name = child.get('name', '').strip()
            canonical_url = child.get('canonical_url', '').strip()
            if canonical_url and not canonical_url.startswith('http'):
                canonical_url = "https://www.target.com" + canonical_url
            
            category_id_extracted = ""
            if "/-/" in canonical_url:
                cat_id = canonical_url.split("/-/")[-1].split("/")[0]
                category_id_extracted = cat_id[2:] if cat_id.startswith("N-") else cat_id

            if name and canonical_url and category_id_extracted:
                sub_doc = {
                    "name": name,
                    "url": canonical_url,
                    "category_id": category_id_extracted,
                    "main_category_name": title
                }
                try:
                    result = sub_category_collection.insert_one(sub_doc)
                    logger.info(f"Inserted subcategory '{name}' with id {result.inserted_id}")
                except Exception as e:
                    logger.error(f"Failed to insert subcategory '{name}': {e}")

    except Exception as e:
        logger.error(f"Failed to fetch/store subcategories for {category_id}: {e}")

def main():
    url = "https://www.target.com/c/shop-all-categories/-/N-5xsxf?tag=ShopAll_CN"
    response = requests.get(url)
    selector = Selector(text=response.text)

    for item in selector.css('div.sc-47f4c2a7-2'):
        title = item.css('div.sc-47f4c2a7-0::text').get(default='').replace('\u2019', "'").strip()
        href = item.css('a::attr(href)').get(default='').strip()
        if not (title and href):
            continue

        full_url = f"https://www.target.com{href}"
        match = re.search(r'/N-[\w-]+', href)
        category_id = match.group(0).strip('/') if match else ''

        doc = {
            "category_id": category_id,
            "title": title,
            "url": full_url
        }
        try:
            result = category_collection.insert_one(doc)
            logger.info(f"Inserted main category '{title}' with id {result.inserted_id}")
        except Exception as e:
            logger.error(f"Failed to insert main category '{title}': {e}")

        categories(category_id, title)

if __name__ == "__main__":
    main()
