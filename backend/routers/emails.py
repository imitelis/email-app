import os
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import BadRequest, NotFound

import threading
from utils.database import db
from utils.emailsend import send_email

from bases import  EmailBase, EmailInputBase
from models import User, Email


authorizations = {
    "JWTBearer": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

router = Namespace("emails", authorizations=authorizations)


FRONTEND_LINK = os.getenv("FRONTEND_LINK")

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
        '''
        Creates an Email with:
            to: str
            subject: str
            body: str
        '''
        email = router.payload

        jwt_email = get_jwt_identity()
        
        db_sender = User.query.filter_by(email=jwt_email).first()
        if not db_sender:
            raise BadRequest('Missing or incorrect Token')
        
        db_recipient = User.query.filter_by(email=email["to"]).first()
        if not db_recipient:
            raise NotFound('Recipient not found')
        
        new_email = Email(sender_uuid=db_sender.uuid, recipient_uuid=db_recipient.uuid, subject=email["subject"], body=email["body"])

        db.session.add(new_email)
        db.session.commit()

        # SMTP part
        email_thread = threading.Thread(target=send_email_background, args=(db_recipient.email, 'Email App New Message', f'Hi {db_recipient.full_name}! \n\n Welcome to our Email App! You have received a new message \n Now you can login with your account here {FRONTEND_LINK}/login \n\n Best regards, Email App Team'))
        email_thread.start()

        return new_email
    
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        '''
        Return all Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        '''
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest('Missing or incorrect Token')
        
        user_emails = Email.query.all()
        return user_emails
    

@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]
    
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        '''
        Return all Received Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        '''
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest('Missing or incorrect Token')
        
        user_emails = Email.query.filter_by(recipient_uuid=db_user.uuid).all()
        return user_emails
    

@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/inbox/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]
    
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self, email_uuid):
        '''
        Return a Received Email with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        '''
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest('Missing or incorrect Token')
        
        db_email = Email.query.get(email_uuid)
        if not db_email:
            raise NotFound('Email not found')
        
        if db_email.recipient_uuid != db_user.uuid:
            raise BadRequest('User not authorized')
        
        return db_email, 201
    

@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/sent")
class SentEmailAPI(Resource):
    method_decorators = [jwt_required()]
    
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        '''
        Return all Sent Emails with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        '''
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest('Missing or incorrect Token')
        
        user_emails = Email.query.filter_by(sender_uuid=db_user.uuid).all()
        return user_emails
    

@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/sent/<string:email_uuid>")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]
    
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self, email_uuid):
        '''
        Return a Sent Email with:
            uuid: uuid
            sender: { uuid: uuid, full_name: str, email: str }
            recipient: { uuid: uuid, full_name: str, email: str }
            subject: str
            body: str
            sent_date: date
            read_date: date
            recipient_folder: int
        '''
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise BadRequest('Missing or incorrect Token')
        
        db_email = Email.query.get(email_uuid)
        if not db_email:
            raise NotFound('Email not found')
        
        if db_email.sender_uuid != db_user.uuid:
            raise BadRequest('User not authorized')
        
        return db_email, 201