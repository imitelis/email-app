# routers/me.py
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.exceptions import NotFound

from bases import  UserBase
from models import User


authorizations = {
    "JWTBearer": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

router = Namespace("api/me", authorizations=authorizations)


@router.doc(security="JWTBearer")
# Starting endpoint
@router.route("/")
class InboxEmailAPI(Resource):
    method_decorators = [jwt_required()]
    
    # What it returns
    @router.marshal_with(UserBase)
    # http request
    def get(self):
        '''
        Return my User with:
            uuid: uuid
            full_name: str
            email: str
            cellphone: str
        '''
        # print(get_jwt_identity())
        jwt_email = get_jwt_identity()

        db_user = User.query.filter_by(email=jwt_email).first()
        if not db_user:
            raise NotFound('User not found')

        return db_user