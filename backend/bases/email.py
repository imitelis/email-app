from flask_restx import fields
from utils.restxapi import api

from bases.user import UserBase

EmailUserBase = api.model('EmailUser', {
    "uuid": fields.String(description='User UUID'),
    'full_name': fields.String(description='User Full name', min_length=16, max_length=128),
    'email': fields.String(description='User Email', min_length=8, max_length=256),
})

EmailBase = api.model('Email', {
    "uuid": fields.String(description='Email UUID'),
    "sender": fields.Nested(EmailUserBase, description='Sender User'),
    "recipient": fields.Nested(EmailUserBase, description='Recipient User'),
    "subject": fields.String(description='Email subject', max_length=128),
    "body": fields.String(description='Email body', max_length=1028),
    "sent_date": fields.DateTime,
    "read_date": fields.DateTime,
    # "sender_delete": fields.Boolean,
    # "recipient_delete": fields.Boolean,
    "recipient_folder": fields.Integer,
})

EmailInputBase = api.model('Email', {
    "to" : fields.String(description='Recipient email', min_length=8, max_length=128),
    "subject" : fields.String(description='Email subject', min_length=8, max_length=128),
    "body" : fields.String(description='Email body', min_length=8, max_length=1028),
})
