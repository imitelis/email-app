from flask_restx import Resource, Namespace

from utils.database import db

from bases import  UserBase, UserInputBase
from models import User


router = Namespace("users")


@router.route("/hello")
class Hellow(Resource):
    def get(self):
        return { "hello": "Flask RESTX"}


# Starting endpoint
@router.route("/")
class UserAPI(Resource):
    # What it returns
    @router.marshal_list_with(UserBase)
    # http request
    def get(self):
        '''
        Return all the Users with their:
            id: primary key
            email : the user's mail
            cellphone: the user's body
            emails_sent: a list of the sent emails
            emails_received: a list of the received emails
        '''
        return User.query.all()
    
    # what it expects
    @router.expect(UserInputBase)
    # what it returns
    @router.marshal_with(UserBase)
    def post(self):
        '''
        Creates an User with its:
            email : the user's mail
            cellphone: the user's body
            password: the user's password -> should be hashed(?)
        '''
        print(router.payload)
        user = User(email=router.payload["email"],cellphone=router.payload["cellphone"],password=router.payload["password"],)
        db.session.add(user)
        db.session.commit()
        return user, 201
    

'''
@ns.route("/students")
class StudentAPI(Resource):
    def get(self):
        return Student.query.all()
'''