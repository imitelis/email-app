import os
from flask_restx import Resource, Namespace
from werkzeug.exceptions import BadRequest, NotFound

from bases import  UserBase, UserInputBase
from models import User

import bcrypt
import threading
from utils.database import db
from utils.emailsend import send_email


router = Namespace("users")


FRONTEND_LINK = os.getenv("FRONTEND_LINK")

def send_email_background(recipient_email, subject, body):
    """
    Function to send email in the background for performance
    """
    send_email(recipient_email, subject, body)

# Starting endpoint
@router.route("/")
class UsersAPI(Resource):
    '''
    Route for listing all the Users and adding one user to the database
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

        return User.query.all(), 201
    
    # what it expects
    @router.expect(UserInputBase)
    # what it returns
    @router.marshal_with(UserBase)
    def post(self):
        '''
        Creates User with:
            full_name: str
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
        # print(user["full_name"])

        new_user = User(full_name=user["full_name"], email=user["email"], cellphone=user["cellphone"], password=password_hash)
        db.session.add(new_user)
        db.session.commit()

        # SMTP part
        email_thread = threading.Thread(target=send_email_background, args=(user["email"], 'Email App account succesfully created', f'Hi {user["full_name"]}! \n\n Welcome to our Email App! We are excited to have you on board. \n Now you can login with your account here {FRONTEND_LINK} \n\n Best regards, Email App Team'))
        email_thread.start()

        return new_user, 200


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

        return user, 201
    
    # what it expects
    @router.expect(UserInputBase)
    # what it returns
    @router.marshal_with(UserBase)
    def patch(self, uuid):
        '''
        Updates User with:
            full_name: str
            email : str
            cellphone: str
            password: str

        when an empty string is passed the atribute won't be changed
        '''
        user = User.query.get(uuid)
        
        #Exception when user is not found
        if not user:
            raise NotFound('User could not be found')
        
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
    def delete(self, uuid):
        '''
        Removes User:
        '''
        user= User.query.get(uuid)

        #Exception when user is not found
        if not user:
            raise NotFound('User not found')

        db.session.delete(user)
        db.session.commit()
        return None, 204