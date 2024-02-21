from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.database import db

from bases import  EmailBase, EmailInputBase
from models import Email

authorizations = {
    "JWTBearer": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

router = Namespace("email", authorizations=authorizations)


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/")
class EmailAPI(Resource):
    method_decorators = [jwt_required()]
    
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
        print(get_jwt_identity())

        return Email.query.all() # to filter with JWT Course.query.filter_by(instructor=current_user).all()
    
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