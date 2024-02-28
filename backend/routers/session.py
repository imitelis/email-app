# routers/session.py
import os
from flask_restx import Resource, Namespace
from flask_jwt_extended import create_access_token
from werkzeug.exceptions import Unauthorized, BadRequest, NotFound

from bases import InviteBase, LoginBase, UserBase, UserInputBase
from models import User

import bcrypt
import threading
from dotenv import load_dotenv
from utils.db import db
from utils.smtp import send_email


load_dotenv()
APP_URL = os.getenv("APP_URL")

router = Namespace("api")


def send_email_background(recipient_email, subject, body):
    """
    Function to send email in the background for performance
    """
    send_email(recipient_email, subject, body)


# Starting endpoint
@router.route("/hello")
class InviteAPI(Resource):
    '''
    Route for adding one User to the database
    '''
    # HTTP Get
    def get(self):
        '''
        Greet client side:
        '''
        
        return {"success": "Hello from the Fake Email server"}, 200


# Starting endpoint
@router.route("/invite")
class InviteAPI(Resource):
    '''
    Route for adding one User to the database
    '''
    # what it expects
    @router.expect(InviteBase)
    # HTTP Post
    def post(self):
        '''
        Invite User with:
            email : str
        '''
        user = router.payload

        # SMTP part
        email_thread = threading.Thread(target=send_email_background, args=(user["email"], 'Fake Email: Invitation', f'Hi there! \n\n Someone has invited you to join Fake Email! \n You can create your new account here: {APP_URL}/signup \n\n Best regards, Fake Email Team'))
        email_thread.start()
        
        return {"success": "Invitation email was sent to join Fake Email"}, 200


# Starting endpoint
@router.route("/login")
class LoginAPI(Resource):
    '''
    Route for handling user login and retrieving user token
    '''

    # what it expects
    @router.expect(LoginBase)
    # HTTP Post
    def post(self):
        '''
        Login User with:
            email : str
            password: str
        '''
        user = router.payload

        db_user = User.query.filter_by(email=user["email"]).first()
        if db_user is None:
            raise NotFound('User not found')
        
        if not bcrypt.checkpw(user["password"].encode('utf-8'), db_user.password.encode('utf-8')):
            raise Unauthorized('Wrong credentials')
        
        access_token = create_access_token(user["email"], expires_delta=False)
        return {"access_token": access_token, "email": user["email"], "full_name": db_user.full_name}, 200
    

# Starting endpoint
@router.route("/signup")
class SignUpAPI(Resource):
    '''
    Route for adding one User to the database
    '''
    
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
        email_thread = threading.Thread(target=send_email_background, args=(user["email"], 'Email App: New Account', f'Hi {user["full_name"]}! \n\n Welcome to the Fake Email! We are excited to have you on board. \n Now you can login with your new account credentials here: {APP_URL}/login \n\n Best regards, Fake Email Team'))
        email_thread.start()

        return new_user, 201