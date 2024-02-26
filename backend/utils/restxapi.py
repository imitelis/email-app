# from flask import Blueprint

from flask_restx import Api

# blueprint = Blueprint('api', __name__, url_prefix='/api')

api = Api(version='0.8.0', title='Email API', description='Email API for Email App from ver+ home assignment')