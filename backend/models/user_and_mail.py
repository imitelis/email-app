import uuid
from utils.database import db
from datetime import datetime

class User(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    full_name = db.Column(db.String(128), unique=True)
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(16), unique=True)
    password = db.Column(db.String(64))

    #emails_sent = db.relationship("Email", back_populates="email_sent")
    #emails_received = db.relationship("Email", back_populates="email_received")
    


class Email(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    sender_uuid = db.Column(db.ForeignKey("user.uuid"))
    recipient_uuid = db.Column(db.ForeignKey("user.uuid"))
    subject = db.Column(db.String(1028))
    body = db.Column(db.String(1028))
    sent_date = db.Column(db.DateTime, default=datetime.utcnow)
    read_date = db.Column(db.DateTime, nullable=True)
    sender_delete = db.Column(db.Boolean, default=False)
    recipient_delete = db.Column(db.Boolean, default=False)

    
    email_sent = db.relationship("User", backref="emails_sent",foreign_keys=[sender_uuid])
    email_received = db.relationship("User", backref="emails_received",foreign_keys=[recipient_uuid])
    


