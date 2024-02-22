from .login import router as login_router
from .users import router as users_router
from .emails import router as emails_router

"""
Our actual routers being exported
based on the resource they manage
but completely ready for production
"""
__all__ = ["login_router", "users_router","emails_router"]