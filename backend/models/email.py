import uuid
from datetime import datetime
from utils.database import db
from sqlalchemy.orm import relationship


class Email(db.Model):
    uuid = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
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