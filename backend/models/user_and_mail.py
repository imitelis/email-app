import uuid
from utils.database import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    email = db.Column(db.String(128), unique=True)
    cellphone = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(256))

    #emails_sent = db.relationship("Email", back_populates="email_sent")
    #emails_received = db.relationship("Email", back_populates="email_received")
    


class Email(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    from_id = db.Column(db.ForeignKey("user.id"))
    to_id = db.Column(db.ForeignKey("user.id"))
    subject = db.Column(db.String(1028))
    body = db.Column(db.String(1028))
    sent_date = db.Column(db.DateTime, default=datetime.utcnow)
    read_date = db.Column(db.DateTime, nullable=True)

    
    email_sent = db.relationship("User", backref="emails_sent",foreign_keys=[from_id])
    email_received = db.relationship("User", backref="emails_received",foreign_keys=[to_id])
    


