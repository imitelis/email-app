import uuid
from utils.database import db
from models.email import Email


class User(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    full_name = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(16), unique=True)
    password = db.Column(db.String(64))

    sent_emails = db.relationship(Email, backref="sender_user", foreign_keys=[Email.sender_uuid])
    received_emails = db.relationship(Email, backref="recipient_user", foreign_keys=[Email.recipient_uuid])