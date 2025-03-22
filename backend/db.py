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

def fetch_from_phone(phone):
    return [item for item in db.all() if item.get("ph") == phone]
