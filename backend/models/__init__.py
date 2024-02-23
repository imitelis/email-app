'''
For the moment the foreign key capability is beign 
implemented with the db.models in the same file: user_and_mail 
I'll try later to fix it so the files can mantain the planned hierarchy


'''

# models/__init__.py
#from .user import User # -> Try later
#from .email import Email # -> Try later

from .user_and_mail import User,Email



""""
These are our models, as they say in OOP;
A class is an abstract way to think of
a factual object, the rest is just SQL
There is also the Base for session dependency
"""

__all__ = ["User", "Email"]