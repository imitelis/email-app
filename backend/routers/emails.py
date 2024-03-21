# routers/emails.py
import os
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import BadRequest, Unauthorized, NotFound
from elasticsearch import helpers
import threading
from datetime import datetime
from dotenv import load_dotenv
from config.db import db
from utils.smtp import send_email
import json

from bases import EmailBase, EmailInputBase, EmailFolderBase
from models import User, Email
from utils.elastic_client import get_client

es = get_client()

load_dotenv()
APP_URL = os.getenv("PROD_FRONT_URL")

authorizations = {
    "JWTBearer": {"type": "apiKey", "in": "header", "name": "Authorization"}
}

router = Namespace("api/emails", authorizations=authorizations)


def send_email_background(recipient_email, subject, body):
    """
    Function to send email in the background for performance
    """
    send_email(recipient_email, subject, body)


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/")
class EmailAPI(Resource):
    method_decorators = [jwt_required()]

    # what it expects
    @router.expect(EmailInputBase)
    # what it returns
    @router.marshal_with(EmailBase)
    def post(self):
        """
        Creates an Email with:
            to: str
            subject: str
            body: str
        """
        email = router.payload

        jwt_email = get_jwt_identity()

        db_sender = User.query.filter_by(email=jwt_email).first()
        if not db_sender:
            raise BadRequest("Missing or incorrect Token")

        db_recipient = User.query.filter_by(email=email["to"]).first()
        if not db_recipient:
            raise NotFound("Recipient not found")

        new_email = Email(
            sender_uuid=db_sender.uuid,
            recipient_uuid=db_recipient.uuid,
            subject=email["subject"],
            body=email["body"],
        )

        db.session.add(new_email)
        db.session.commit()

        # SMTP part
        email_thread = threading.Thread(
            target=send_email_background,
            args=(
                db_recipient.email,
                "Fake Email: New Email",
                f"Hi {db_recipient.full_name}! \n\n You have received a new email in your Fake Email inbox! \n You can continue to read it here: {APP_URL}/emails \n\n Best regards, Fake Email Team",
            ),
        )
        email_thread.start()

        return new_email, 201

    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        """
        Return all Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        user_emails = Email.query.all()
        return user_emails, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        """
        Return all Received Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        print(db_user.uuid)
        user_emails = Email.query.filter_by(recipient_uuid=db_user.uuid).all()

        return user_emails, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_with(EmailBase)
    # http request
    def get(self, email_uuid):
        """
        Return a Received Email with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        db_email = Email.query.filter_by(uuid=email_uuid).first()
        if not db_email:
            raise NotFound("Email not found")

        if db_email.recipient_uuid != db_user.uuid:
            raise Unauthorized("User not authorized")

        return db_email, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/sent")
class SentEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        """
        Return all Sent Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        user_emails = Email.query.filter_by(sender_uuid=db_user.uuid).all()

        return user_emails, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/sent/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_with(EmailBase)
    # http request
    def get(self, email_uuid):
        """
        Return a Sent Email with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        db_email = Email.query.filter_by(uuid=email_uuid).first()
        if not db_email:
            raise NotFound("Email not found")

        if db_email.sender_uuid != db_user.uuid:
            raise Unauthorized("User not authorized")

        return db_email, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox/open/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_with(EmailBase)
    # http request
    def patch(self, email_uuid):
        """
        Updates Email read date:
        """
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        db_email = Email.query.filter_by(uuid=email_uuid).first()
        if not db_email:
            raise NotFound("Email not found")

        if db_email.recipient_uuid != db_user.uuid:
            raise Unauthorized("User not authorized")

        if db_email.read_date == None:
            db_email.read_date = datetime.utcnow()
            db.session.commit()

        return db_email, 200


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox/folder/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # what it expects
    @router.expect(EmailFolderBase)
    # What it returns
    @router.marshal_with(EmailBase)
    # http request
    def patch(self, email_uuid):
        """
        Updates Email recipient folder with:
            recipient_folder: int
        """
        email = router.payload

        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        db_email = Email.query.filter_by(uuid=email_uuid).first()
        if not db_email:
            raise NotFound("Email not found")

        if db_email.recipient_uuid != db_user.uuid:
            raise Unauthorized("User not authorized")

        db_email.recipient_folder = email["recipient_folder"]
        db.session.commit()

        return db_email, 200


@router.route("/inbox/search")
class SearchInboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    @router.marshal_list_with(EmailBase)
    def get(self):
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        query = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "public_email_recipient_uuid": db_user.uuid
                            }
                        },
                        {
                            "multi_match": {
                                "query": "here-goes-the-search",#Cambiar esto con los datos del front
                                "fields": ["public_email_subject", "public_email_body"],
                                "fuzziness": "AUTO"
                            }
                        }
                    ]
                }
            }
        }
        res = es.search(index="search-emails", body=query, size=10)
        emails = []
        for hit in res["hits"]["hits"]:
            email = hit["_source"]
            email["uuid"] = hit["_id"]
            emails.append(email)

        return emails, 200