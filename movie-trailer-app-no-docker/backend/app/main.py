# from fastapi import FastAPI, Depends, HTTPException, status, Query, Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jose import jwt, JWTError
# from passlib.context import CryptContext
# from datetime import datetime, timedelta
# from sqlalchemy.orm import Session
# from typing import List, Optional
# import requests
# from pydantic import BaseModel
# from app.database import engine
# from app import models
# from fastapi import FastAPI, Depends, HTTPException, Body
# from pydantic import BaseModel, constr  # <-- make sure constr is imported



# # ======================
# # Imports
# # ======================
# from app.auth_utils import require_admin
# import app.routes as routes
# from app.database import Base, engine, get_db
# from app.models import SavedMovie, User
# from app.tmdb_client import search_movies, get_trailer, TMDB_API_KEY

# # ======================
# # App setup
# # ======================
# app = FastAPI(title="Movie Trailer App", version="2.0")


# # Create all tables
# models.Base.metadata.create_all(bind=engine)

# # -------------------------------
# # FastAPI App Initialization
# # -------------------------------
# app = FastAPI(title="Movie Trailer App", version="2.0")

# # -------------------------------
# # CORS (Fix for frontend access)
# # -------------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -------------------------------
# # Routers
# # -------------------------------
# app.include_router(routes.router)

# # -------------------------------
# # Root Endpoint
# # -------------------------------
# @app.get("/")
# def root():
#     return {"message": "Backend running successfully 🚀"}






# Base.metadata.create_all(bind=engine)

# # ======================
# # Auth setup
# # ======================
# SECRET_KEY = "supersecretkey"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 120

# pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# # Temporary hardcoded users (optional)
# users_db = {
#     "admin": {
#         "username": "admin",
#         "hashed_password": pwd_context.hash("admin123"),
#         "role": "admin",
#     },
#     "user": {
#         "username": "user",
#         "hashed_password": pwd_context.hash("user123"),
#         "role": "user",
#     },
# }

# # ======================
# # Utility functions
# # ======================
# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)


# def authenticate_user(username: str, password: str):
#     user = users_db.get(username)
#     if not user or not verify_password(password, user["hashed_password"]):
#         return None
#     return user


# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate token",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         user = users_db.get(username)
#         if user is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     return user


# def require_admin(current_user=Depends(get_current_user)):
#     if current_user["role"] != "admin":
#         raise HTTPException(status_code=403, detail="Admins only")
#     return current_user


# def get_user_by_username(db: Session, username: str):
#     return db.query(User).filter(User.username == username).first()


# # ======================
# # Auth routes
# # ======================
# @app.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(form_data.username, form_data.password)
#     if not user:
#         # Try DB users
#         db_user = get_user_by_username(db, form_data.username)
#         if not db_user or not verify_password(form_data.password, db_user.password):
#             raise HTTPException(status_code=401, detail="Invalid credentials")
#         role = db_user.role
#         username = db_user.username
#     else:
#         role = user["role"]
#         username = user["username"]

#     token = create_access_token({"sub": username, "role": role})
#     return {"access_token": token, "token_type": "bearer", "role": role}


# # @app.post("/signup")
# # def signup(
# #     username: str = Form(...),
# #     email: str = Form(...),
# #     password: str = Form(...),
# #     role: str = Form("user"),
# #     db: Session = Depends(get_db),
# # ):
# #     existing_user = db.query(User).filter(
# #         (User.username == username) | (User.email == email)
# #     ).first()
# #     if existing_user:
# #         raise HTTPException(status_code=400, detail="Username or email already exists")

# #     hashed_pw = pwd_context.hash(password)
# #     new_user = User(username=username, email=email, password=hashed_pw, role=role)
# #     db.add(new_user)
# #     db.commit()
# #     db.refresh(new_user)
# #     return {"message": f"User '{username}' registered successfully!"}

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# MAX_BCRYPT_LENGTH = 72  # bcrypt max

# # Request schema
# class SignupModel(BaseModel):
#     email: str
#     password: constr(min_length=6, max_length=72)  # enforce max length

# @app.post("/signup")
# def signup(user: SignupModel, db: Session = Depends(get_db)):
#     existing_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Truncate password to 72 chars to prevent bcrypt error
#     safe_password = user.password[:MAX_BCRYPT_LENGTH]

#     hashed_pw = pwd_context.hash(safe_password)

#     new_user = models.User(
#         email=user.email,
#         password=hashed_pw,
#         role="user"  # default role
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return {"message": "User registered successfully", "user_id": new_user.id}




# @app.put("/movies/{movie_id}/rating")
# async def update_movie_rating(
#     movie_id: int,
#     rating: float = Body(...),
#     db: Session = Depends(get_db),
#     token: str = Depends(oauth2_scheme)
# ):
#     # Verify movie exists
#     movie = db.query(SavedMovie).filter(SavedMovie.movie_id == movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")

#     # Update user rating
#     movie.user_rating = rating
#     db.commit()
#     db.refresh(movie)

#     return {"message": "Rating updated successfully", "rating": rating}


# # ======================
# # Movie schema
# # ======================
# class Movie(BaseModel):
#     id: int
#     title: str
#     overview: Optional[str] = None
#     release_date: Optional[str] = None
#     poster_path: Optional[str] = None
#     vote_average: Optional[float] = None


# # ======================
# # Public routes
# # ======================
# @app.get("/")
# def home():
#     return {"message": "Welcome to Movie Trailer API!"}


# @app.get("/movies/popular", response_model=List[Movie])
# def get_popular_movies(pages: int = 2, language: str = "en"):
#     TMDB_BASE_URL = "https://api.themoviedb.org/3"
#     all_movies = []

#     for page in range(1, pages + 1):
#         url = f"{TMDB_BASE_URL}/discover/movie"
#         params = {
#             "api_key": TMDB_API_KEY,
#             "sort_by": "popularity.desc",
#             "with_original_language": language,
#             "page": page,
#         }
#         res = requests.get(url, params=params)
#         if res.status_code != 200:
#             continue
#         data = res.json()
#         for movie in data.get("results", []):
#             all_movies.append(
#                 Movie(
#                     id=movie["id"],
#                     title=movie["title"],
#                     overview=movie.get("overview", ""),
#                     release_date=movie.get("release_date", ""),
#                     poster_path=f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
#                     if movie.get("poster_path")
#                     else None,
#                     vote_average=movie.get("vote_average", 0.0),
#                 )
#             )
#     return all_movies


# @app.get("/movies/search", response_model=List[Movie])
# def search_movies_endpoint(q: str = Query(..., min_length=1)):
#     return search_movies(q)


# @app.get("/movies/{movie_id}/trailer")
# def trailer_endpoint(movie_id: int, db: Session = Depends(get_db)):
#     tmdb_url = f"https://api.themoviedb.org/3/movie/{movie_id}"
#     params = {"api_key": TMDB_API_KEY, "language": "en-US"}
#     res = requests.get(tmdb_url, params=params)
#     if res.status_code != 200:
#         raise HTTPException(status_code=404, detail="Movie not found in TMDB")
#     tmdb_data = res.json()
#     tmdb_title = tmdb_data.get("title", "")

#     key = get_trailer(movie_id, tmdb_title)
#     if not key:
#         movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
#         if movie and movie.trailer_url:
#             key = movie.trailer_url

#     if not key:
#         raise HTTPException(status_code=404, detail="Trailer not found")
#     return {"youtube_url": f"https://www.youtube.com/watch?v={key}"}


# # ======================
# # Protected user routes
# # ======================
# @app.post("/movies/save")
# def save_movie(movie: Movie, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
#     if current_user["role"] != "user":
#         raise HTTPException(status_code=403, detail="Only users can save movies")

#     existing = db.query(SavedMovie).filter(SavedMovie.id == movie.id).first()
#     trailer_key = get_trailer(movie.id, movie.title)
#     trailer_url = f"https://www.youtube.com/watch?v={trailer_key}" if trailer_key else None

#     if existing:
#         existing.title = movie.title
#         existing.overview = movie.overview
#         existing.release_date = movie.release_date
#         existing.poster_path = movie.poster_path
#         existing.vote_average = movie.vote_average
#         if trailer_url:
#             existing.trailer_url = trailer_url
#     else:
#         new_movie = SavedMovie(
#             id=movie.id,
#             title=movie.title,
#             overview=movie.overview,
#             release_date=movie.release_date,
#             poster_path=movie.poster_path,
#             vote_average=movie.vote_average,
#             trailer_url=trailer_url,
#         )
#         db.add(new_movie)
#     db.commit()
#     return {"message": f"Movie '{movie.title}' saved successfully."}


# @app.put("/movies/{movie_id}/rating")
# def update_rating(
#     movie_id: int,
#     rating: float,
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user),
# ):
#     if current_user["role"] != "user":
#         raise HTTPException(status_code=403, detail="Only users can rate movies")
#     if rating < 0 or rating > 10:
#         raise HTTPException(status_code=400, detail="Rating must be between 0 and 10")

#     movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
#     if not movie:
#         movie = SavedMovie(id=movie_id, title=f"Movie #{movie_id}", user_rating=rating)
#         db.add(movie)
#     else:
#         movie.user_rating = rating
#     db.commit()
#     return {"message": f"Rating updated to {rating} for movie {movie_id}"}


# # ======================
# # Admin routes
# # ======================
# @app.delete("/admin/movies/{movie_id}")
# def delete_movie_admin(movie_id: int, db: Session = Depends(get_db), _: dict = Depends(require_admin)):
#     movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
#     if not movie:
#         raise HTTPException(status_code=404, detail="Movie not found")
#     db.delete(movie)
#     db.commit()
#     return {"message": f"Movie {movie_id} deleted successfully"}


# # ======================
# # Include external routes
# # ======================
# app.include_router(routes.router)

# main.py
# main.py
# from fastapi import FastAPI, Depends, HTTPException, Body
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from pydantic import BaseModel, EmailStr
# from datetime import datetime, timedelta
# from jose import jwt
# import requests
# import os

# from app.database import Base, engine, get_db
# from app.models import User
# from app.schemas import SignupModel   # schema for signup

# from app.models import SavedMovie
# from app.schemas import MovieSaveSchema
# from app.auth_utils import get_current_user


# # ---------------------------------------
# # FastAPI App
# # ---------------------------------------
# app = FastAPI(title="Movie Trailer App")

# # ---------------------------------------
# # CORS SETUP
# # ---------------------------------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # React frontend
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------------------------------
# # DATABASE
# # ---------------------------------------
# Base.metadata.create_all(bind=engine)

# # ---------------------------------------
# # AUTH CONFIG
# # ---------------------------------------
# SECRET_KEY = "supersecretkey"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 120

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# MAX_BCRYPT_LENGTH = 72


# # ---------------------------------------
# # MODELS
# # ---------------------------------------
# class LoginModel(BaseModel):
#     email: EmailStr
#     password: str


# # ---------------------------------------
# # UTILS
# # ---------------------------------------
# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)


# def create_access_token(data: dict, expires_minutes=ACCESS_TOKEN_EXPIRE_MINUTES):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# # ---------------------------------------
# # ROOT ROUTE
# # ---------------------------------------
# @app.get("/")
# def root():
#     return {"message": "Backend running!"}


# # ---------------------------------------
# # SIGNUP ROUTE
# # ---------------------------------------
# @app.post("/signup")
# def signup(user: SignupModel, db: Session = Depends(get_db)):

#     existing_user = db.query(User).filter(
#         (User.email == user.email) | (User.username == user.username)
#     ).first()

#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email or username already registered")

#     hashed_pw = pwd_context.hash(user.password[:MAX_BCRYPT_LENGTH])

#     new_user = User(
#         username=user.username,
#         email=user.email,
#         password=hashed_pw,
#         role=user.role
#     )

#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return {"message": "User registered successfully", "user_id": new_user.id}


# # ---------------------------------------
# # LOGIN ROUTE
# # ---------------------------------------
# @app.post("/login")
# def login(user: LoginModel, db: Session = Depends(get_db)):

#     db_user = db.query(User).filter(User.email == user.email).first()

#     if not db_user or not verify_password(user.password, db_user.password):
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     token = create_access_token({"sub": db_user.email, "role": db_user.role})

#     return {
#         "access_token": token,
#         "token_type": "bearer",
#         "role": db_user.role,
#         "username": db_user.username
#     }


# # ---------------------------------------
# # MOVIES ROUTE (TMDB)
# # ---------------------------------------

# # Get TMDB key from .env OR hardcode here if needed
# TMDB_API_KEY = os.getenv("TMDB_API_KEY") or "YOUR_TMDB_API_KEY_HERE"

# @app.get("/movies")
# def get_movies(lang: str = "en"):
#     if not TMDB_API_KEY:
#         raise HTTPException(status_code=500, detail="TMDB API key missing")

#     url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language={lang}"

#     response = requests.get(url)

#     if response.status_code != 200:
#         raise HTTPException(status_code=500, detail="Failed to fetch movies")

#     return response.json()


# @app.post("/movies/save")
# def save_movie(
#     movie: MovieSaveSchema,
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):

#     # Check if already saved by this user
#     exists = db.query(SavedMovie).filter(
#         SavedMovie.movie_id == movie.movie_id,
#         SavedMovie.user_id == current_user.id
#     ).first()

#     if exists:
#         return {"message": "Already saved", "status": "exists"}

#     new_movie = SavedMovie(
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

#     return {"message": "Movie saved", "saved_movie": new_movie.id}


# @app.get("/user/saved-movies")
# def get_saved_movies(
#     db: Session = Depends(get_db),
#     current_user=Depends(get_current_user)
# ):
#     movies = db.query(SavedMovie).filter(
#         SavedMovie.user_id == current_user.id
#     ).all()

#     return movies


from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import requests
import os
from dotenv import load_dotenv
from fastapi import Path,Body,Query



from app.database import Base, engine, get_db
from app.models import User, SavedMovie
from app.schemas import SignupModel, LoginModel, MovieSaveSchema
from app.auth_utils import get_current_user
from fastapi import FastAPI, Depends, HTTPException
from app.models import User, SavedMovie, Rating, FavoriteMovie, LikeMovie
from .schemas import MovieFavModel, MovieLikeModel
from app.auth_utils import get_current_admin_user  # admin auth
from app.auth_utils import get_current_user  # your user dependency

# Load .env
load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")  # <- load from .env
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

app = FastAPI(title="Movie Trailer App")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Auth
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ==========================
# SIGNUP
# ==========================
@app.post("/signup")
def signup(user: SignupModel, db: Session = Depends(get_db)):
    exists = db.query(User).filter(
        (User.email == user.email) | (User.username == user.username)
    ).first()
    if exists:
        raise HTTPException(400, "Email or username taken")
    hashed_pw = pwd.hash(user.password)
    new_user = User(email=user.email, username=user.username, password=hashed_pw, role=user.role)
    db.add(new_user)
    db.commit()
    return {"message": "Signup success"}


# ==========================
# LOGIN
# ==========================
# @app.post("/login")
# def login(data: LoginModel, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == data.email).first()
#     if not user or not pwd.verify(data.password, user.password):
#         raise HTTPException(401, "Invalid credentials")
#     token = jwt.encode(
#         {"sub": user.email, "role": user.role, "exp": datetime.utcnow() + timedelta(hours=2)},
#         SECRET_KEY,
#         algorithm=ALGORITHM
#     )
#     return {"access_token": token, "role": user.role, "username": user.username}

@app.post("/login")
def login(data: LoginModel, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    
    if not user or not pwd.verify(data.password, user.password):
        raise HTTPException(401, "Invalid credentials")

    token_data = {
        "sub": user.email,
        "role": user.role,
        "user_id": user.id,          # <<< IMPORTANT
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "access_token": token,
        "role": user.role,
        "username": user.username
    }


# ==========================
# FETCH MOVIES
# ==========================
@app.get("/movies")
def get_movies(lang: str = "en"):
    # TMDB Discover API
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "with_original_language": lang,  # lang should be ISO 639-1 code: en, hi, ta, te, ml, kn
        "sort_by": "popularity.desc",
        "page": 1
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("results", [])
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==========================
# SAVE MOVIE
# ==========================
@app.post("/movies/save")
def save_movie(data: MovieSaveSchema, db=Depends(get_db), user=Depends(get_current_user)):
    exists = db.query(SavedMovie).filter(SavedMovie.movie_id == data.movie_id, SavedMovie.user_id == user.id).first()
    if exists:
        return {"message": "Already saved"}
    movie = SavedMovie(
        movie_id=data.movie_id,
        title=data.title,
        overview=data.overview,
        poster_path=data.poster_path,
        vote_average=data.vote_average,
        user_id=user.id
    )
    db.add(movie)
    db.commit()
    return {"message": "Movie saved"}


# ==========================
# GET SAVED MOVIES (USER)
# ==========================
@app.get("/user/saved-movies")
def get_saved_movies(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    saved = db.query(SavedMovie).filter(SavedMovie.user_id == user.id).all()
    return {
        "saved_movie_ids": [m.movie_id for m in saved]
    }


# ==========================
# ADMIN: DELETE ANY SAVED MOVIE
# ==========================
@app.delete("/admin/delete/{movie_id}")
def delete_movie(movie_id: int, db=Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(403, "Admins only")
    movie = db.query(SavedMovie).filter_by(id=movie_id).first()
    if not movie:
        raise HTTPException(404, "Movie not found")
    db.delete(movie)
    db.commit()
    return {"message": "Movie deleted"}


# ==========================
# UPDATE MOVIE RATING (USER ONLY)
# ==========================
@app.put("/movies/{movie_id}/rating")
def update_movie_rating(
    movie_id: int,
    rating: float = Body(..., embed=True),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 1️⃣ Check if movie exists in saved_movies for this user
    movie = db.query(SavedMovie).filter(
        SavedMovie.movie_id == movie_id,
        SavedMovie.user_id == user.id
    ).first()

    if not movie:
        # If movie not saved yet, create a placeholder in saved_movies
        movie = SavedMovie(
            movie_id=movie_id,
            user_id=user.id,
            title="Unknown",
            overview="",
            poster_path="",
            vote_average=0
        )
        db.add(movie)
        db.commit()
        db.refresh(movie)

    # 2️⃣ Check if a rating already exists for this user and movie
    existing_rating = db.query(Rating).filter(
        Rating.user_id == user.id,
        Rating.saved_movie_id == movie.id
    ).first()

    if existing_rating:
        # Update existing rating
        existing_rating.rating = rating
    else:
        # Create a new rating
        new_rating = Rating(
            saved_movie_id=movie.id,
            user_id=user.id,
            rating=rating
        )
        db.add(new_rating)

    # 3️⃣ Commit all changes
    db.commit()

    return {
        "movie_id": movie.movie_id,
        "user_id": user.id,
        "rating": rating
    }


# ==========================
# WATCH TRAILER
# ==========================
@app.get("/movies/{movie_id}/trailer")
def get_trailer(movie_id: int = Path(..., description="TMDB movie ID")):
    # 1️⃣ Fetch movie title from TMDB
    tmdb_movie_url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
    movie_res = requests.get(tmdb_movie_url).json()
    movie_title = movie_res.get("title", "")

    if not movie_title:
        raise HTTPException(status_code=404, detail="Movie not found in TMDB")

    # 2️⃣ Try TMDB trailer first
    tmdb_videos_url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key={TMDB_API_KEY}"
    tmdb_videos = requests.get(tmdb_videos_url).json().get("results", [])

    for video in tmdb_videos:
        if video.get("site", "").lower() == "youtube" and video.get("type", "").lower() == "trailer":
            return {"youtube_url": f"https://www.youtube.com/watch?v={video['key']}"}

    # 3️⃣ Always fallback to YouTube search
    yt_search_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "key": YOUTUBE_API_KEY,
        "q": f"{movie_title} trailer",
        "part": "snippet",
        "maxResults": 1,
        "type": "video",
    }
    yt_res = requests.get(yt_search_url, params=params).json()
    items = yt_res.get("items")

    if items:
        video_id = items[0]["id"]["videoId"]
        return {"youtube_url": f"https://www.youtube.com/watch?v={video_id}"}

    # 4️⃣ If YouTube search fails (very rare)
    return {"youtube_url": None}


# ==========================
# SEARCH MOVIES
# ==========================
@app.get("/movies/search")
def search_movies(q: str = Query(..., description="Movie search query")):
    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={q}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="TMDB API error")
    
    data = response.json()
    return data.get("results", [])

# ==========================
# ADMIN: GET ALL SAVED MOVIES
# ==========================
@app.get("/admin/movies")
def get_all_saved_movies(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    """
    Admin endpoint to return all saved movies with their ratings.
    """
    saved_movies = db.query(SavedMovie).all()
    
    response = []
    for movie in saved_movies:
        movie_data = {
            "id": movie.id,
            "title": movie.title,
            "overview": movie.overview,
            "poster_path": movie.poster_path,
            "vote_average": movie.vote_average,
            "user": movie.user.username,
            "ratings": [{"username": r.user.username, "rating": r.rating} for r in movie.ratings]
        }
        response.append(movie_data)

    return response


# ==========================
# ADMIN: GET ALL users
# ==========================
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    """
    Admin endpoint to return all normal users (exclude admins)
    """
    users = db.query(User).filter(User.role != "admin").all()
    
    return [
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "role": u.role,
            "saved_movies_count": len(u.saved_movies)
        }
        for u in users
    ]

# ==================================
# ADMIN: GET ALL SAVED MOVIES RATINGS
# ===================================
@app.get("/admin/ratings")
def get_all_ratings(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin_user)):
    """
    Admin endpoint to return all ratings given by normal users
    """
    ratings = db.query(Rating).join(User).filter(User.role != "admin").all()

    return [
        {
            "rating_id": r.id,
            "movie_id": r.movie.id,
            "movie_title": r.movie.title,
            "username": r.user.username,
            "rating": r.rating
        }
        for r in ratings
    ]


@app.post("/movies/favorite")
def favorite_movie(data: MovieFavModel,
               db: Session = Depends(get_db),
               current_user: User = Depends(get_current_user)):

    existing = db.query(FavoriteMovie).filter(
        FavoriteMovie.user_id == current_user.id,
        FavoriteMovie.movie_id == data.movie_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"message": "removed from favorite"}

    new_fav = FavoriteMovie(user_id=current_user.id, movie_id=data.movie_id)
    db.add(new_fav)
    db.commit()
    return {"message": "favorited"}


# Get user's favorite movies
@app.get("/user/favorites")
def get_user_favorites(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    favorites = db.query(FavoriteMovie).filter(FavoriteMovie.user_id == current_user.id).all()
    return {"favorites": [f.movie_id for f in favorites]}

@app.post("/movies/like")
def like_movie(
    data: MovieLikeModel,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(LikeMovie).filter(
        LikeMovie.user_id == current_user.id,
        LikeMovie.movie_id == data.movie_id
    ).first()

    if existing:
        # update like/dislike instead of deleting
        existing.is_like = data.is_like
        db.commit()
        return {"message": "updated"}

    new_like = LikeMovie(
        user_id=current_user.id,
        movie_id=data.movie_id,
        is_like=data.is_like
    )
    db.add(new_like)
    db.commit()
    return {"message": "created"}


@app.get("/movies/{movie_id}/like-status")
def like_status(
    movie_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    status = db.query(LikeMovie).filter(
        LikeMovie.user_id == user.id,
        LikeMovie.movie_id == movie_id
    ).first()

    return {"status": status.is_like if status else None}


# Get user's likes/dislikes
@app.get("/user/likes")
def get_user_likes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    likes = db.query(LikeMovie).filter(LikeMovie.user_id == current_user.id).all()
    return {"likes": {l.movie_id: l.is_like for l in likes}}
