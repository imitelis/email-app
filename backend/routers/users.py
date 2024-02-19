from flask_restx import Resource, Namespace

from utils.database import db

from bases import CourseBase, CourseInputBase
from models import Course, Student


router = Namespace("users")


@router.route("/hello")
class Hellow(Resource):
    def get(self):
        return { "hello": "Flask RESTX"}


# Starting endpoint
@router.route("/")
class CourseAPI(Resource):
    # What it returns
    @router.marshal_list_with(CourseBase)
    # http request
    def get(self):
        return Course.query.all()
    
    # what it expects
    @router.expect(CourseInputBase)
    # what it returns
    @router.marshal_with(CourseBase)
    def post(self):
        print(router.payload)
        course = Course(name=router.payload["name"])
        db.session.add(course)
        db.session.commit()
        return course, 201
    

'''
@ns.route("/students")
class StudentAPI(Resource):
    def get(self):
        return Student.query.all()
'''