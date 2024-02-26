from flask_restx import fields
from utils.api import api


InviteBase = api.model('InviteBase', {
    "email": fields.String(description='Invite Email', min_length=8, max_length=256),
})

LoginBase = api.model('LoginBase', {
    "email": fields.String(description='User Email', min_length=8, max_length=256),
    "password": fields.String(description='User Password', min_length=8, max_length=64)
})

UserBase = api.model('UserBase', {
    "uuid": fields.String(description='User UUID'),
    "full_name": fields.String(description='User Full name', min_length=8, max_length=128),
    "email": fields.String(description='User Email', min_length=8, max_length=256),
    "cellphone": fields.String(description='User Cellphone', min_length=8, max_length=16),
})

UserInputBase = api.model('UserInputBase', {
    "full_name": fields.String(description='User Full name', min_length=8, max_length=128),
    "email": fields.String(description='User Email', min_length=8, max_length=256),
    "cellphone": fields.String(description='User Cellphone', min_length=8, max_length=16),
    "password": fields.String(description='User Password', min_length=8, max_length=64)
})