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
from routers import login_router, me_router, users_router,emails_router

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
api.add_namespace(me_router)
api.add_namespace(users_router)
api.add_namespace(emails_router)

# Start tracemalloc
tracemalloc.start()

# Enable CORS
CORS(app) # , , ) # , allow_headers=['Content-Type']

# ,, allow_headers=['Content-Type']

# Set TrustedHost
app.config['SERVER_NAME'] = os.getenv("SERVER_NAME")

# Create tables in DB
with app.app_context():
    db.create_all()