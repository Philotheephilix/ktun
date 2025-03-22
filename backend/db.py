from tinydb import TinyDB, Query

db = TinyDB('db.json')
query_db = Query()
def store_in_db(json):
    try:
        db.insert(json)
        return True
    except:
        return False

def fetch_from_db(cid):
    return db.search(query_db.cid == cid)

def fetch_all():
    return db.all()

import requests

def fetch_from_phone(phone):
    data = [item for item in db.all() if item.get("ph") == phone]
    contents = []

    for item in data:
        ipfs_url = f"https://gateway.pinata.cloud/ipfs/{item['ipfs_hash']}"
        try:
            response = requests.get(ipfs_url)
            contents.append(response.json())
        except Exception as e:
            contents.append({"error": str(e), "hash": item['ipfs_hash']})
    
    return contents
