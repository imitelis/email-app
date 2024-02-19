from flask_restx import fields
from utils.restxapi import api
# from bases.course import CourseBase

StudentBase = api.model('Student', {
    'id': fields.Integer,
    'name': fields.String,
    # 'course': fields.Nested(CourseBase)
})

StudentInputBase = api.model('Student', {
    'name': fields.String
})
