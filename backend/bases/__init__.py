# bases/__init__.py
# from .user import User
# from .email import Email

# fake
from .course import CourseBase, CourseInputBase
from .student import StudentBase, StudentInputBase


""""
These are our bases, somehow similar
to our models, but not all fields are
here, since they consider user input
"""

__all__ = ["CourseBase", "CourseInputBase", "StudentBase", "StudentInputBase"]