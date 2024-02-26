# bases/__init__.py
from .user import InviteBase, LoginBase, UserBase, UserInputBase
from .email import EmailBase, EmailInputBase, EmailFolderBase


""""
These are our bases, somehow similar
to our models, but not all fields are
here, since they consider user input
"""

__all__ = ["InviteBase", "LoginBase", "UserBase","UserInputBase", "EmailBase", "EmailInputBase", "EmailFolderBase"]