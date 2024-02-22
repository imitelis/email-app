# bases/__init__.py
from .user import UserBase, LoginBase, UserInputBase
from .email import EmailBase, EmailInputBase


""""
These are our bases, somehow similar
to our models, but not all fields are
here, since they consider user input
"""

__all__ = ["LoginBase", "CourseBase", "CourseInputBase", "StudentBase", "StudentInputBase","UserBase","UserInputBase","EmailBase", "EmailInputBase"]