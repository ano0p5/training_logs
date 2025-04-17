import logging
from datetime import datetime
import pytz

# ─── Logger Setup ─────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# ─── Project Info ─────────────────────────────────────────────────────────────
PROJECT = ""
CLIENT_NAME = ""
PROJECT_NAME = ""
FREQUENCY = ""
BASE_URL = "https://www.dirk.nl/"

# ─── Date Configuration ───────────────────────────────────────────────────────
datetime_obj = datetime.now(pytz.timezone("Europe/Amsterdam"))
ITERATION = datetime_obj.strftime("%Y_%m_%d")
YEAR = datetime_obj.strftime("%Y")
MONTH = datetime_obj.strftime("%m")
DAY = datetime_obj.strftime("%d")

# ─── MongoDB ──────────────────────────────────────────────────────────────────
MONGO_URI = "mongodb://localhost:27017/"
MONGO_DB = "dirk"
MONGO_COLLECTION_DATA = "crawler"

# ─── Headers ──────────────────────────────────────────────────────────────────
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Priority': 'u=0, i',
}
headers = HEADERS  

# ─── Proxy / Queue  ──────────────────────────────────────────────────
PROXY = ""
QUEUE = ""
QUEUE_NAME_URL = f"{PROJECT_NAME}_urls"
