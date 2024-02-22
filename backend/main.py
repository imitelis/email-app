# main.py

# os and flask
import os
from flask import Flask
from flask_cors import CORS

# tracemalloc and utils
import tracemalloc
from utils.restxapi import api
from utils.database import db
from utils.jwtmanager import jwt


# api routers
from routers import login_router, users_router,emails_router

# Create the Flask app
app = Flask(__name__)

# Set DataBase URI
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")

# Set JWT Key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# Init API and DB
api.init_app(app)
db.init_app(app)
jwt.init_app(app)

# Register API Routers
api.add_namespace(login_router)
api.add_namespace(users_router)
api.add_namespace(emails_router)

# Start tracemalloc
tracemalloc.start()

# Enable CORS
CORS(app)

# Set TrustedHost
app.config['SERVER_NAME'] = os.getenv("SERVER_NAME")

# Create tables in DB
with app.app_context():
    db.create_all()


# to generate JWT with user and not user.email
"""
@jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id
    
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.filter_by(id=identity).first()
"""