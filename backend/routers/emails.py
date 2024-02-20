from flask_restx import Resource, Namespace

from utils.database import db

from bases import  EmailBase, EmailInputBase
from models import Email

router = Namespace("email")


@router.route("/hello")
class Hellow(Resource):
    def get(self):
        return { "hello": "Flask RESTX"}
    
# Starting endpoint
@router.route("/")
class EmailAPI(Resource):
    # What it returns
    @router.marshal_list_with(EmailBase)
    # http request
    def get(self):
        '''
        Return all the emails with their:
            id: primary key
            subject : the subject mail
            body: the mail body
            sent_date: the date when it was sent
            read_date: the date when it was read
        '''

        return Email.query.all()
    
    # what it expects
    @router.expect(EmailInputBase)
    # what it returns
    @router.marshal_with(EmailBase)
    def post(self):
        '''
        Creates an email with:
            from_id: The id of the User sending the email
            to_id: The id of the User receiving the email
            subject : the subject mail
            body: the mail body
            sent_date: the date when it was sent
            read_date: the date when it was read
        '''
        print(router.payload)
        
        email = Email(
            from_id=router.payload["from_id"],
            to_id=router.payload["to_id"],
            subject=router.payload["subject"],
            body=router.payload["body"],
            sent_date=router.payload["sent_date"],
            read_date=router.payload["sent_date"],)
        db.session.add(email)
        db.session.commit()
        
        return email, 201