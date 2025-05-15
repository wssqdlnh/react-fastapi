
from functools import wraps
from fastapi import Request, Response

def log_response_headers():
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                response = await func(*args, **kwargs)
                # headers = dict(response.headers)
                print(f"Response headers: {response}")
                return response
            except Exception as e:
                print(f"Error occurred: {str(e)}", exc_info=True)
                raise
        return wrapper
    return decorator