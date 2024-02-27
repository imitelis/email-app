# routers/users.py
from flask_restx import Resource, Namespace
from werkzeug.exceptions import Unauthorized, NotFound

from bases import  UserBase, UserEditBase
from models import User

import bcrypt
from utils.db import db


router = Namespace("api/users")


# Starting endpoint
@router.route("/")
class UsersAPI(Resource):
    '''
    Route for listing all the Users
    '''
    # What it returns
    @router.marshal_list_with(UserBase)
    # http request
    def get(self):
        '''
        Returns Users with:
            uuid: uuid
            full_name: str
            email: str
            cellphone: str
            emails_sent: [Email]
            emails_received: [Email]
        '''

        return User.query.all(), 200


@router.route("/<string:user_uuid>")
class UserAPI(Resource):
    '''
    Route for reading, updating or deleting one User information or update its information
    '''
    # What it returns
    @router.marshal_with(UserBase)
    # http request
    def get(self, uuid):
        '''
        Returns uuid User with:
            id: id
            full_name: str
            email: str
            cellphone: str
            emails_sent: [Email]
            emails_received: [Email]
        '''

        user = User.query.get(uuid)

        #Exception when user is not found
        if not user:
            raise NotFound('User not be found')

        return user, 200
    
    # what it expects
    @router.expect(UserEditBase)
    # what it returns
    @router.marshal_with(UserBase)
    def patch(self, uuid):
        '''
        Updates User with:
            email : str
            cellphone: str
            password: str
            new_password: str
        '''
        updated_user=router.payload

        db_user = User.query.filter_by(uuid).first()
        
        if not db_user:
            raise NotFound('User not be found')
        
        if not bcrypt.checkpw(updated_user["password"].encode('utf-8'), db_user.password.encode('utf-8')):
            raise Unauthorized('Wrong credentials')
        
        if not db_user.cellphone == updated_user["cellphone"]:
            raise Unauthorized('Wrong credentials')
        
        if not db_user.email == updated_user["email"]:
            raise Unauthorized('Wrong credentials')

        pwhash = bcrypt.hashpw(updated_user["new_password"].encode('utf-8'), bcrypt.gensalt())
        password_hash = pwhash.decode('utf8')
        
        db_user.password=password_hash
        db.session.commit()
        return db_user, 200
    
    @router.marshal_with(UserBase)
    def delete(self, uuid):
        '''
        Removes User:
        '''
        user= User.query.get(uuid)

        if not user:
            raise NotFound('User not found')

        db.session.delete(user)
        db.session.commit()
        return None, 204