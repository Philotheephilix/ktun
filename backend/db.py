from tinydb import TinyDB, Query

db = TinyDB('db.json')
query_db = Query()
def store_in_db(json):
    db.insert(json)

def fetch_from_db(cid):
    query_db.search(query_db.cid == cid)

def fetch_all():
    return db.all()