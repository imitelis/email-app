import uuid
from utils.db import db


class User(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    full_name = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(16))
    password = db.Column(db.String(64))


    def __init__(self, full_name, email, cellphone, password):
        if len(full_name) < 8:
            raise ValueError("Full name must be at least 8 characters long.")
        
        if len(full_name) > 128:
            raise ValueError("Full name must be at most 128 characters long.")
        
        if len(email) < 8:
            raise ValueError("Email must be at least 8 characters long.")
        
        if len(email) > 128:
            raise ValueError("Email must be at most 128 characters long.")
        
        if len(cellphone) < 8:
            raise ValueError("Cellphone must be at least 8 characters long.")
        
        if len(cellphone) > 16:
            raise ValueError("Cellphone must be at most 16 characters long.")
        
        super().__init__(full_name=full_name, email=email, cellphone=cellphone, password=password)