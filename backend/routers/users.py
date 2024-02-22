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
    Route for reading, updating or deleting one User information or update its information
    '''
    # What it returns
    @router.marshal_with(UserBase)
    # http request
    def get(self,id):
        '''
        Given an id return its associated user with its:
            id: id
            email: str
            cellphone: str
            emails_sent: [email]
            emails_received: [email]
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
        Given an id updates its associated user with its:
            email : str
            cellphone: str
            password: str

        when an empty string is passed the atribute won't be changed
        '''
        user = User.query.get(id)
        
        #Exception when user is not found
        if not user:
            raise BadRequest('User could not be found')
        
        changed_user=router.payload

        if changed_user["email"] != "":
            
            db_user = User.query.filter_by(email=changed_user["email"]).first()
            if db_user:
                raise BadRequest('User already exists')
            
            user.email=changed_user["email"]
        
        if changed_user["cellphone"] != "":
            
            user.cellphone=changed_user["cellphone"]
        
        if changed_user["password"] != "":

            pwhash = bcrypt.hashpw(changed_user["password"].encode('utf-8'), bcrypt.gensalt())
            password_hash = pwhash.decode('utf8')

            user.password=password_hash

        db.session.commit()
        return user, 201
    
    @router.marshal_with(UserBase)
    def delete(self, id):
        '''
        Given an id deletes its associated user with its
        '''
        user= User.query.get(id)

        #Exception when user is not found
        if not user:
            raise BadRequest('User could not be found')
        

        db.session.delete(user)
        db.session.commit()
        return user, 204