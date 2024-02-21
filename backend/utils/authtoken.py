
from flask_jwt_extended import create_access_token

# utils
from datetime import timedelta

# Set the expiration time to 1 hour
expires_in = timedelta(hours=1)


"""
Generate token, it receives input string
email_address but without expires_delta
so the token no expires and no refresh
it uses jwt to encode an access token
"""
def gen_access_token(email_name):
    return create_access_token(email_name) # , expires_delta=expires_in