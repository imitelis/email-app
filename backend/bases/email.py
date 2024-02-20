from flask_restx import fields
from utils.restxapi import api

#from bases.user import UserBase

EmailBase = api.model('Email', {
    "id" : fields.String,
    #"from_id" : fields.Nested(UserBase),
    #"to_id" : fields.Nested(UserBase),
    "subject" : fields.String,
    "body" : fields.String,
    "sent_date" : fields.DateTime,
    "read_date": fields.DateTime
})

EmailInputBase = api.model('Email', {
    'from_id': fields.String,
    'to_id': fields.String,
    'body': fields.String,
    "subject" : fields.String,
    "sent_date" : fields.DateTime,
    "read_date": fields.DateTime
})
