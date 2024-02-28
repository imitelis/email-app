import uuid
from datetime import datetime
from config.db import db
from sqlalchemy.orm import relationship


class Email(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    sender_uuid = db.Column(db.ForeignKey("user.uuid"))
    recipient_uuid = db.Column(db.ForeignKey("user.uuid"))
    subject = db.Column(db.String(128))
    body = db.Column(db.String(1028))
    sent_date = db.Column(db.DateTime, default=datetime.utcnow)
    read_date = db.Column(db.DateTime, default=None, nullable=True)
    # sender_delete = db.Column(db.Boolean, default=False)
    # recipient_delete = db.Column(db.Boolean, default=False)
    recipient_folder = db.Column(db.Integer, default=0)
    sender = relationship('User', foreign_keys=[sender_uuid])
    recipient = relationship('User', foreign_keys=[recipient_uuid])
    

    def __init__(self, subject, body, recipient_folder):
        if len(subject) > 128:
            raise ValueError("Subject must be at most 128 characters long.")
        
        if len(body) > 1028:
            raise ValueError("Body must be at most 1028 characters long.")
        
        if recipient_folder > 4:
            raise ValueError("Recipient folder must be at most 4.")
        
        super().__init__(subject=subject, body=body, recipient_folder=recipient_folder)
