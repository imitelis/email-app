# routers/users.py
from flask_restx import Resource, Namespace
from werkzeug.exceptions import Unauthorized, NotFound
import os
from dotenv import load_dotenv
import threading

from bases import UserBase, UserEditBase
from models import User


from utils.smtp import send_email
import bcrypt
from config.db import db

load_dotenv()
APP_URL = os.getenv("PROD_FRONT_URL")

router = Namespace("api/users")


def send_email_background(recipient_email, subject, body):
    """
    Function to send email in the background for performance
    """
    send_email(recipient_email, subject, body)


# Starting endpoint
@router.route("/")
class UsersAPI(Resource):
    """
    Route for listing all the Users
    """

    # What it returns
    @router.marshal_list_with(UserBase)
    # http request
    def get(self):
        """
        Returns Users with:
            uuid: uuid
            full_name: str
            email: str
            cellphone: str
        """

        return User.query.all(), 200

    # what it expects
    @router.expect(UserEditBase)
    def patch(self):
        """
        Updates User with:
            email : str
            cellphone: str
            password: str
            new_password: str
        """
        updated_user = router.payload

        db_user = User.query.filter_by(email=updated_user["email"]).first()

        if not db_user:
            raise NotFound("User not be found")

        if not bcrypt.checkpw(
            updated_user["password"].encode("utf-8"), db_user.password.encode("utf-8")
        ):
            raise Unauthorized("Wrong credentials")

        if not db_user.cellphone == updated_user["cellphone"]:
            raise Unauthorized("Wrong credentials")

        if not db_user.email == updated_user["email"]:
            raise Unauthorized("Wrong credentials")

        pwhash = bcrypt.hashpw(
            updated_user["new_password"].encode("utf-8"), bcrypt.gensalt()
        )
        password_hash = pwhash.decode("utf8")

        db_user.password = password_hash
        db.session.commit()

        # SMTP part
        email_thread = threading.Thread(
            target=send_email_background,
            args=(
                db_user.email,
                "Fake Email: Password updated",
                f"Hi {db_user.full_name}! \n\n You have updated the password for your Fake Email account. \n Now you can login with your new password credentials here: {APP_URL}/login \n\n Best regards, Fake Email Team",
            ),
        )
        email_thread.start()

        return {"sucess": "Password updated"}, 200


@router.route("/<string:user_uuid>")
class UserAPI(Resource):
    """
    Route for reading, updating or deleting one User information or update its information
    """

    # What it returns
    @router.marshal_with(UserBase)
    # http request
    def get(self, user_uuid):
        """
        Returns User with:
            id: id
            full_name: str
            email: str
            cellphone: str
            emails_sent: [Email]
            emails_received: [Email]
        """

        user = User.query.get(user_uuid)

        # Exception when user is not found
        if not user:
            raise NotFound("User not be found")

        return user, 200

    @router.marshal_with(UserBase)
    def delete(self, user_uuid):
        """
        Removes User:
        """
        user = User.query.get(user_uuid)

        if not user:
            raise NotFound("User not found")

        db.session.delete(user)
        db.session.commit()
        return None, 204
