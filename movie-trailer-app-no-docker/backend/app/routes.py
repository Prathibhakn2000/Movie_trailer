# from fastapi import APIRouter, Depends, HTTPException, Body, Form
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta

# from .database import get_db
# from . import models
# from .auth_utils import get_current_user
# from .schemas import MovieSaveSchema

# router = APIRouter()   # <--- CORRECT

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # JWT settings
# SECRET_KEY = "super_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# # -------------------------------------------
# # Utility functions
# # -------------------------------------------
# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)

# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# # -------------------------------------------
# # SIGNUP
# # -------------------------------------------
# @router.post("/signup")
# def signup(
#     username: str = Body(...),
#     email: str = Body(...),
#     password: str = Body(...),
#     role: str = Body("user"),
#     db: Session = Depends(get_db),
# ):
#     existing = db.query(models.User).filter(
#         (models.User.username == username) | (models.User.email == email)
#     ).first()

#     if existing:
#         raise HTTPException(status_code=400, detail="Username or email exists")

#     hashed_pw = pwd_context.hash(password)

#     user = models.User(
#         username=username,
#         email=email,
#         password=hashed_pw,
#         role=role,
#     )

#     db.add(user)
#     db.commit()
#     return {"message": "User registered successfully"}


# # -------------------------------------------
# # LOGIN
# # -------------------------------------------
# @router.post("/login")
# def login(
#     email: str = Form(...),
#     password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not user or not verify_password(password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid login")

#     token = create_access_token({"sub": user.email, "role": user.role})
#     return {"access_token": token, "role": user.role, "username": user.username}


# @router.post("/movies/save")
# def save_movie(
#     movie: MovieSaveSchema,
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     # Check if movie already saved by this user
#     exists = db.query(models.SavedMovie).filter(
#         models.SavedMovie.movie_id == movie.movie_id,
#         models.SavedMovie.user_id == current_user.id
#     ).first()

#     if exists:
#         return {"message": "Already saved", "status": "exists"}

#     new_movie = models.SavedMovie(
#         movie_id=movie.movie_id,
#         title=movie.title,
#         overview=movie.overview,
#         poster_path=movie.poster_path,
#         vote_average=movie.vote_average,
#         user_id=current_user.id
#     )

#     db.add(new_movie)
#     db.commit()
#     db.refresh(new_movie)

#     return {
#         "message": "Movie saved successfully",
#         "saved_movie_id": new_movie.id,
#         "saved_by": current_user.username,
#         "role": current_user.role,
#     }

# # -------------------------------------------
# # ADMIN ROUTES
# # -------------------------------------------
# @router.get("/admin/saved-movies")
# def admin_saved_movies(db: Session = Depends(get_db)):
#     movies = db.query(models.SavedMovie).all()
#     return {"results": movies}


# @router.delete("/admin/movies/{movie_id}")
# def delete_movie(movie_id: int, db: Session = Depends(get_db)):
#     movie = db.query(models.SavedMovie).filter_by(id=movie_id).first()

#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")

#     db.delete(movie)
#     db.commit()

#     return {"message": "Movie deleted successfully"}





# from fastapi import APIRouter, Depends, HTTPException, Body, Form
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta
# import requests

# from .database import get_db
# from . import models
# from .auth_utils import get_current_user
# from .schemas import MovieSaveSchema

# router = APIRouter()

# # ----------------------------
# # PASSWORD + JWT SETTINGS
# # ----------------------------
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# SECRET_KEY = "super_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# TMDB_API_KEY = "YOUR_TMDB_KEY_HERE"   # <--- PUT YOUR TMDB KEY


# # ----------------------------
# # UTILS
# # ----------------------------
# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)

# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# # ----------------------------
# # SIGNUP
# # ----------------------------
# @router.post("/signup")
# def signup(
#     username: str = Body(...),
#     email: str = Body(...),
#     password: str = Body(...),
#     role: str = Body("user"),
#     db: Session = Depends(get_db),
# ):
#     existing = db.query(models.User).filter(
#         (models.User.username == username) | (models.User.email == email)
#     ).first()

#     if existing:
#         raise HTTPException(status_code=400, detail="Username or email exists")

#     hashed_pw = pwd_context.hash(password)

#     user = models.User(
#         username=username,
#         email=email,
#         password=hashed_pw,
#         role=role,
#     )

#     db.add(user)
#     db.commit()
#     return {"message": "User registered successfully"}


# # ----------------------------
# # LOGIN
# # ----------------------------
# # @router.post("/login")
# # def login(
# #     email: str = Form(...),
# #     password: str = Form(...),
# #     db: Session = Depends(get_db)
# # ):
# #     user = db.query(models.User).filter(models.User.email == email).first()
# #     if not user or not verify_password(password, user.password):
# #         raise HTTPException(status_code=401, detail="Invalid login")

# #     token = create_access_token({"sub": user.email, "role": user.role})
# #     return {"access_token": token, "role": user.role, "username": user.username}


# # ----------------------------
# # SAVE MOVIE
# # ----------------------------
# @router.post("/movies/save")
# def save_movie(
#     movie: MovieSaveSchema,
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     exists = db.query(models.SavedMovie).filter(
#         models.SavedMovie.movie_id == movie.movie_id,
#         models.SavedMovie.user_id == current_user.id
#     ).first()

#     if exists:
#         return {"message": "Already saved", "status": "exists"}

#     new_movie = models.SavedMovie(
#         movie_id=movie.movie_id,
#         title=movie.title,
#         overview=movie.overview,
#         poster_path=movie.poster_path,
#         vote_average=movie.vote_average,
#         user_id=current_user.id
#     )

#     db.add(new_movie)
#     db.commit()
#     db.refresh(new_movie)

#     return {
#         "message": "Movie saved successfully",
#         "saved_movie_id": new_movie.id,
#         "saved_by": current_user.username,
#         "role": current_user.role,
#     }


# # ----------------------------
# # ADMIN
# # ----------------------------
# @router.get("/admin/saved-movies")
# def admin_saved_movies(db: Session = Depends(get_db)):
#     movies = db.query(models.SavedMovie).all()
#     return {"results": movies}


# @router.delete("/admin/movies/{movie_id}")
# def delete_movie(movie_id: int, db: Session = Depends(get_db)):
#     movie = db.query(models.SavedMovie).filter_by(id=movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")

#     db.delete(movie)
#     db.commit()
#     return {"message": "Movie deleted successfully"}


# # ----------------------------
# # TMDB MOVIE ROUTES
# # ----------------------------

# # GET POPULAR MOVIES
# @router.get("/movies")
# def get_movies(lang: str = "en"):
#     url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language={lang}-IN&page=1"
#     res = requests.get(url)

#     if res.status_code != 200:
#         raise HTTPException(status_code=500, detail="TMDB request failed")

#     return {"results": res.json().get("results", [])}

# # SEARCH MOVIES
# @router.get("/movies/search")
# def search_movies(q: str):
#     url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={q}"
#     res = requests.get(url)

#     if res.status_code != 200:
#         raise HTTPException(status_code=500, detail="TMDB search failed")

#     return {"results": res.json().get("results", [])}

# # GET TRAILER
# @router.get("/movies/{movie_id}/trailer")
# def get_trailer(movie_id: int):
#     url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key={TMDB_API_KEY}"
#     res = requests.get(url)

#     data = res.json()
#     results = data.get("results", [])

#     trailer = next(
#         (v for v in results if v["type"] == "Trailer" and v["site"] == "YouTube"),
#         None
#     )

#     if not trailer:
#         raise HTTPException(status_code=404, detail="Trailer not found")

#     youtube_url = f"https://www.youtube.com/watch?v={trailer['key']}"

#     return {"youtube_url": youtube_url}

from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth_utils import get_current_user
from app.models import SavedMovie

router = APIRouter()

@router.get("/movies/saved")
def get_saved_movies(db: Session = Depends(get_db), user=Depends(get_current_user)):
    saved = db.query(SavedMovie.movie_id).filter(SavedMovie.user_id == user.id).all()
    movie_ids = [m.movie_id for m in saved]
    return {"saved_movies": movie_ids}
