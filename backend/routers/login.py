from flask_restx import Resource, Namespace
from flask_jwt_extended import create_access_token
from werkzeug.exceptions import Unauthorized, NotFound

import bcrypt

from bases import  LoginBase
from models import User


router = Namespace("login")


# Starting endpoint
@router.route("/")
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
        return {"access_token": access_token, "email": user["email"], "full_name": db_user.full_name}