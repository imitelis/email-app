from flask_restx import Resource, Namespace
from werkzeug.exceptions import BadRequest
# from werkzeug.security import generate_password_hash, check_password_hash

from utils.database import db

from bases import  UserBase, UserInputBase
from models import User

import bcrypt


router = Namespace("users")


# Starting endpoint
@router.route("/")
class UserAPI(Resource):
    '''
    Route for listing all the Users and adding one user to the database
    '''
    # What it returns
    @router.marshal_list_with(UserBase)
    # http request
    def get(self):
        '''
        Returns Users with:
            id: id
            email: str
            cellphone: str
            emails_sent: [email]
            emails_received: [email]
        '''
        return User.query.all()
    
    # what it expects
    @router.expect(UserInputBase)
    # what it returns
    @router.marshal_with(UserBase)
    def post(self):
        '''
        Creates User with:
            email : str
            cellphone: str
            password: str
        '''
        user = router.payload
        
        db_user = User.query.filter_by(email=user["email"]).first()
        if db_user:
            raise BadRequest('User already exists')
        
        pwhash = bcrypt.hashpw(user["password"].encode('utf-8'), bcrypt.gensalt())
        password_hash = pwhash.decode('utf8')

        new_user = User(email=user["email"], cellphone=user["cellphone"], password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201


@router.route("/<string:id>")
class OneUserAPI(Resource):
    '''
    Route for reading one User information or update its information
    '''
    # What it returns
    @router.marshal_with(UserBase)
    # http request
    def get(self,id):
        '''
        Given an ID return an user with its:
            id: primary key
            email : the user's mail
            cellphone: the user's body
            emails_sent: a list of the sent emails
            emails_received: a list of the received emails
        '''

        user= User.query.get(id)

        #Exception when user is not found
        if not user:
            raise BadRequest('User could not be found')


        return user
    
    # what it expects
    @router.expect(UserInputBase)
    # what it returns
    @router.marshal_with(UserBase)
    def patch(self, id):
        '''
        Given an ID ppdates an User with its:
            email : the user's mail
            cellphone: the user's body
            password: the user's password -> should be hashed(?)

        when an empty string is passed the atribute won't be changed
        '''
        user= User.query.get(id)
        #Exception when user is not found
        if not user:
            raise BadRequest('User could not be found')
        
        print(router.payload)

        if router.payload["email"] != "":
            user.email=router.payload["email"]
        if router.payload["cellphone"] != "":
            user.cellphone=router.payload["cellphone"]
        if router.payload["password"] != "":
            user.password=router.payload["password"]

        db.session.commit()
        return user, 201
    
    @router.marshal_with(UserBase)
    def delete(self, id):
        '''
        Given an ID deletes an User 
        '''
        user= User.query.get(id)
        #Exception when user is not found
        
        if not user:
            raise BadRequest('User could not be found')
        
        print(router.payload)

        db.session.delete(user)
        db.session.commit()
        return user, 204