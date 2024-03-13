# models/__init__.py
from .user import User
from .email import Email


""""
These are our models, as they say in OOP;
A class is an abstract way to think of
a factual object, the rest is just SQL
There is also the Base for session dependency
"""

__all__ = ["User", "Email"]
