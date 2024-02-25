import uuid
from utils.database import db


class User(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    full_name = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(16))
    password = db.Column(db.String(64))