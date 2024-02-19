from flask_restx import fields
from utils.restxapi import api
from bases.student import StudentBase

CourseBase = api.model('Course', {
    'id': fields.Integer,
    'name': fields.String,
    'students': fields.List(fields.Nested(StudentBase))
})

CourseInputBase = api.model('Course', {
    'name': fields.String
})