import uuid
from utils.database import db
from models.email import Email

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(256))

    emails_sent = db.relationship(Email, foreign_keys=[Email.from_id], backref='from_id')
    emails_received = db.relationship(Email,foreign_keys=[Email.to_id], backref='to_id')

