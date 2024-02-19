import uuid
from utils.database import db

from datetime import datetime

class Email(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    from_id = db.Column(db.ForeignKey("user.id"))
    to_id = db.Column(db.ForeignKey("user.id"))
    body = db.Column(db.String(1028))
    sent_date = db.Column(db.DateTime, default=datetime.utcnow)
    read_date = db.Column(db.DateTime, nullable=True)