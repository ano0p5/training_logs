import requests
from parsel import Selector
from settings import db
import logging

logging.basicConfig(level=logging.INFO)

response = requests.get("https://mmlafleur.com/pages/nc-hp", headers={"User-Agent": "Mozilla/5.0"})
sel = Selector(text=response.text)

xpath = '(//div[contains(@class, "Collapsible__Inner")]//ul[contains(@class, "Linklist")])[1]/li/a'
for tag in sel.xpath(xpath):
    href = tag.xpath('./@href').get()
    if href:
        url = f"https://mmlafleur.com{href}" if href.startswith("/") else href
        try:
            db["category_urls"].insert_one({"url": url})
            logging.info(url)
        except Exception:
            pass
