from flask_restx import fields
from utils.restxapi import api

from bases.user import UserBase

EmailBase = api.model('Email', {
    "uuid" : fields.String(description='Email UUID'),
    "sender_uuid" : fields.Nested(UserBase, description='Sender User'),
    "recipient_uuid" : fields.Nested(UserBase, description='Recipient User'),
    "subject" : fields.String(description='Email subject', max_length=128),
    "body" : fields.String(description='Email body', max_length=1028),
    "sent_date" : fields.DateTime,
    "read_date": fields.DateTime,
    "sender_delete": fields.Boolean,
    "recipient_delete": fields.Boolean,
    "recipient_folder": fields.Integer,
})

EmailInputBase = api.model('Email', {
    "subject" : fields.String(description='Email subject', max_length=128),
    "body" : fields.String(description='Email body', max_length=1028),
})
