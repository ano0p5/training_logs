import os
import re
import json
import logging
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Crawler:
    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["dirk"]
        self.collection = self.db["crawler"]
        self.collection.create_index("sku", unique=True)

        self.file_paths = [
            "/home/anoop/training_log/2025-04-10/biologisch-zuivel-kaas.html",
            "/home/anoop/training_log/2025-04-10/eieren.html",
            "/home/anoop/training_log/2025-04-10/kaas-gesneden.html",
            "/home/anoop/training_log/2025-04-10/kaas-stuk.html",
            "/home/anoop/training_log/2025-04-10/lactosevrije-zuivel.html",
            "/home/anoop/training_log/2025-04-10/melk-karnemelk.html",
            "/home/anoop/training_log/2025-04-10/overige-kazen.html",
            "/home/anoop/training_log/2025-04-10/slagroom-kookroom.html",
            "/home/anoop/training_log/2025-04-10/toetjes.html",
            "/home/anoop/training_log/2025-04-10/vla.html",
            "/home/anoop/training_log/2025-04-10/yoghurt-kwark-pap.html",
            "/home/anoop/training_log/2025-04-10/zuiveldranken.html",
            "/home/anoop/training_log/2025-04-10/boter-margarine.html"
        ]

    def start(self):
        for file_path in self.file_paths:
            if not os.path.exists(file_path):
                logging.warning(f"File not found: {file_path}")
                continue

            with open(file_path, "r", encoding="utf-8") as f:
                html = f.read()
            self.parse_html(html, file_path)

    def parse_html(self, html, file_path):
        matches = re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', html, re.DOTALL)
        if not matches:
            logging.warning(f"No JSON-LD found in: {file_path}")
            return

        data = json.loads(matches[0])
        item_list = data["@graph"][0]["itemListElement"]

        for product in item_list:
            prod = product["item"]
            doc = {
                "name": prod.get("name", ""),
                "sku": str(prod.get("sku", "")),
                "image": prod.get("image", [""])[0] if isinstance(prod.get("image", ""), list) else "",
                "url": prod.get("url", ""),
                "source_file": os.path.basename(file_path)
            }

            self.collection.update_one(
                {"sku": doc["sku"]},
                {"$set": doc},
                upsert=True
            )
            logging.info(f"Saved SKU {doc['sku']} from {doc['source_file']}")

    def close(self):
        self.client.close()


if __name__ == "__main__":
    parser = Crawler()  
    parser.start()
    parser.close()
