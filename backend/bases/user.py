from flask_restx import fields
from utils.restxapi import api
from bases.email import EmailBase

UserBase = api.model('User', {
    'id': fields.String(description='User ID'),
    'email': fields.String(description='User Email', min_length=16, max_length=256),
    'cellphone': fields.String(description='User Cellphone', min_length=8, max_length=16),
    'emails_sent': fields.List(fields.Nested(EmailBase)),
    'emails_received': fields.List(fields.Nested(EmailBase))
})

UserInputBase = api.model('User', {
    'email': fields.String(description='User Email', min_length=16, max_length=256),
    'cellphone': fields.String(description='User Cellphone', min_length=8, max_length=16),
    'password': fields.String(description='User Password', min_length=8, max_length=64)
})

LoginBase = api.model('LoginBase', {
    'email': fields.String(description='User Email', min_length=16, max_length=256),
    'password': fields.String(description='User Password', min_length=8, max_length=64)
})