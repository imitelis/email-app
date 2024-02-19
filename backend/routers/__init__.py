from .users import router as users_router

"""
Our actual routers being exported
based on the resource they manage
but completely ready for production
"""
__all__ = ["users_router"]