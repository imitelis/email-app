
import os

# utils
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta

"""
Let's import those secrety things
by using python-dotenv and os
"""
load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')


"""
Generate token, it receives input string
user_username and by enforced algorithm
and expiration time of 90 minutes,
it uses jwt to encode an access token
"""
def generate_token(user_username):
    access_token_expires = timedelta(minutes=90)
    access_token = jwt.encode(
        {"sub": user_username, "exp": datetime.utcnow() + access_token_expires},
        SECRET_KEY,
        algorithm='HS256'
    )
    return access_token


"""
Decode authorization, it receives input string
of the string form "Bearer ey..." with the token
following after the Bearer, it exports to all crud
endpoints, it uses jwt for the decoding and exceptions
"""
def decode_authorization(authorization: str) -> dict:  
    token = authorization.replace("Bearer ", "")
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except:
        return { "error": "Invalid token" }
#        raise HTTPException(status_code=401, detail="Invalid token")

    return decoded_token