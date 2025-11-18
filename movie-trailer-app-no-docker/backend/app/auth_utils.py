# from fastapi import Depends, HTTPException
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# from sqlalchemy.orm import Session
# from .database import get_db
# from .models import User

# SECRET_KEY = "super_secret_key"
# ALGORITHM = "HS256"

# # CREATE TOKEN READER
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email = payload.get("sub")

#         if email is None:
#             raise HTTPException(status_code=401, detail="Invalid token")

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")

#     user = db.query(User).filter(User.email == email).first()

#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     return user



# # ------------------------------
# #   REQUIRE ADMIN MIDDLEWARE
# # ------------------------------
# def require_admin(user=Depends(get_current_user)):
#     if user.role != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required",
#         )
#     return user


from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime
from app.database import get_db
from app.models import User

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

oauth2 = OAuth2PasswordBearer(tokenUrl="/login")

def get_current_user(token: str = Depends(oauth2), db=Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="User does not exist")

    return user


def get_current_admin_user(token: str = Depends(oauth2), db=Depends(get_db)):
    """
    Returns the current user only if they are an admin.
    Raises HTTPException if token is invalid or user is not admin.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized as admin")
    
    return user