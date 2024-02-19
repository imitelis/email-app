import uuid
from utils.database import db

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(256))