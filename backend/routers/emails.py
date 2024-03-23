# routers/emails.py
import os
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import BadRequest, Unauthorized, NotFound
import threading
from datetime import datetime
from dotenv import load_dotenv
from config.db import db
from utils.smtp import send_email

from bases import EmailBase, EmailInputBase, EmailFolderBase
from models import User, Email
from utils.elastic_client import get_client, format_emails, format_email_to_doc

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
        doc = format_email_to_doc(new_email)
        es.index(index="search-emails", document=doc, pipeline="ml-inference-search-emails")
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


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox/folder/<int:folder>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self, folder):
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

        user_emails = Email.query.filter_by(recipient_uuid=db_user.uuid, recipient_folder=folder).all()

        return user_emails, 200


@router.route("/inbox/search/<string:search_query>")
class SearchInboxEmailAPI(Resource):
    method_decorators = [jwt_required()]

    @router.marshal_list_with(EmailBase)
    def get(self, search_query):
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        query = {
            "query": {
                "bool": {
                    "must": {
                        "match": {"recipient_uuid": db_user.uuid}
                    },
                    "should": [
                        {
                            "text_expansion": {
                                "ml.inference.email_body_expanded.predicted_value": {
                                    "model_text": search_query,
                                    "model_id": ".elser_model_2_linux-x86_64",
                                    "boost": 1
                                }
                            }
                        }
                    ]
                }
            },
            "min_score": 10
        }
        res = es.search(index="search-emails", body=query, size=10)
        emails = []
        for hit in res["hits"]["hits"]:
            email = hit["_source"]
            sender_uuid = email['sender_uuid']
            db_sender = User.query.get(sender_uuid)
            formatted_email = {
                'uuid': email['email_uuid'],
                'sender': {
                    'uuid': email['sender_uuid'],
                    'full_name': db_sender.full_name,
                    'email': db_sender.email
                },
                'recipient': {
                    'uuid': email['recipient_uuid'],
                    'full_name': db_user.full_name,
                    'email': db_user.email
                },
                'subject': email['email_subject'],
                'body': email['email_body'],
                'sent_date': email['sent_date'],
                'read_date': email['read_date'],
                'recipient_folder': email['folder']
            }
            emails.append(formatted_email)
        return emails, 200


@router.route("/sent/search/<string:search_query>")
class SearchSentEmailAPI(Resource):
    method_decorators = [jwt_required()]

    @router.marshal_list_with(EmailBase)
    def get(self, search_query):
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        query = {
            "query": {
                "bool": {
                    "must": {
                        "match": {"sender_uuid": db_user.uuid}
                    },
                    "should": [
                        {
                            "text_expansion": {
                                "ml.inference.email_body_expanded.predicted_value": {
                                    "model_text": search_query,
                                    "model_id": ".elser_model_2_linux-x86_64",
                                    "boost": 1
                                }
                            }
                        }
                    ]
                }
            },
            "min_score": 10
        }
        res = es.search(index="search-emails", body=query, size=10)
        emails = format_emails(res, db_user)
        return emails, 200


@router.route("/inbox/search/<int:folder>/<string:search_query>")
class SearchFolderEmailAPI(Resource):
    method_decorators = [jwt_required()]

    @router.marshal_list_with(EmailBase)
    def get(self, folder, search_query):
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest("Missing or incorrect Token")

        query = {
            "query": {
                "bool": {
                    "must": [{
                        "match": {"sender_uuid": db_user.uuid}
                    },
                    {
                        "match": {
                            "public_email_recipient_folder": folder
                        }
                    }],
                "should": [
                    {
                        "text_expansion": {
                            "ml.inference.email_body_expanded.predicted_value": {
                                "model_text": search_query,
                                "model_id": ".elser_model_2_linux-x86_64",
                                "boost": 1
                            }
                        }
                    }
                ]
            }
        },
        "min_score": 10
        }
        res = es.search(index="search-emails", body=query, size=10)
        emails = format_emails(res, db_user)
        return emails, 200
