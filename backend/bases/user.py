from flask_restx import fields
from utils.restxapi import api
from bases.email import EmailBase

UserBase = api.model('User', {
    'id': fields.String,
    'email': fields.String,
    'cellphone': fields.String,
    'emails_sent': fields.List(fields.Nested(EmailBase)),
    'emails_received': fields.List(fields.Nested(EmailBase))
})

UserInputBase = api.model('User', {
    'email': fields.String,
    'cellphone': fields.String,
    'password': fields.String,
})

LoginBase = api.model('LoginBase', {
    'email': fields.String,
    'password': fields.String
})