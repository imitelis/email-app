# main.py

# os and flask
import os
from flask import Flask
from flask_cors import CORS

# utils
import tracemalloc
from dotenv import load_dotenv
from utils.api import api
from utils.db import db
from utils.jwt import jwt

# api routers
from routers import session_router, me_router, users_router, emails_router

# Load .env variables
load_dotenv()

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
api.add_namespace(session_router)
api.add_namespace(me_router)
api.add_namespace(users_router)
api.add_namespace(emails_router)

# Start tracemalloc
tracemalloc.start()

#
DEV_FRONT_URL = os.getenv("DEV_FRONT_URL")
PROD_FRONT_URL = os.getenv("PROD_FRONT_URL")

# Enable CORS
CORS(app, allow_headers=['Content-Type'], resources={r"/api/*": {"origins": [PROD_FRONT_URL, DEV_FRONT_URL]}})

# Set TrustedHost
app.config['SERVER_NAME'] = os.getenv("SERVER_NAME")

# Create tables in DB
with app.app_context():
    db.create_all()
