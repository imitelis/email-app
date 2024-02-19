# app.py

# os and flask
import os
from flask import Flask
from flask_cors import CORS

# tracemalloc and utils
import tracemalloc
from utils.restxapi import api
from utils.database import db

# api routers
from routers import users_router

# not sure if necc for creating models here
from models import Student, Course

# Create the Flask app
def create_app():
    app = Flask(__name__)

    # Set DataBase URI
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")

    # Init API and DB
    api.init_app(app)
    db.init_app(app)

    # API Routers
    api.add_namespace(users_router)
    
    # tracemalloc
    tracemalloc.start()

    # CORS
    CORS(app)

    # TrustedHost
    app.config['SERVER_NAME'] = os.getenv("SERVER_NAME")

    # Create tables in DB
    with app.app_context():
        db.create_all()

    return app