from fastapi import FastAPI, Depends, HTTPException, status, Query, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from typing import List, Optional
import requests

from app.database import Base, engine, get_db
from app.models import SavedMovie
from app.tmdb_client import search_movies, get_trailer, get_popular, TMDB_API_KEY

# ======================
# Basic Setup
# ======================

app = FastAPI(title="Movie Trailer App", version="2.0")

origins = ["http://127.0.0.1:5173", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ======================
# Auth Setup
# ======================

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Demo users (can be from DB later)
users_db = {
    "admin": {
        "username": "admin",
        "hashed_password": pwd_context.hash("admin123"),
        "role": "admin",
    },
    "user": {
        "username": "user",
        "hashed_password": pwd_context.hash("user123"),
        "role": "user",
    },
}


# ======================
# Utility Functions
# ======================

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = users_db.get(username)
        if user is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user


def require_admin(current_user=Depends(get_current_user)):
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return current_user


# ======================
# Auth Routes
# ======================

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user["username"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer", "role": user["role"]}


# ======================
# Movie Schemas
# ======================

from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    overview: Optional[str] = None
    release_date: Optional[str] = None
    poster_path: Optional[str] = None
    vote_average: Optional[float] = None


# ======================
# Public Endpoints (User + Admin)
# ======================

@app.get("/")
def home():
    return {"message": "Welcome to Movie Trailer API!"}


@app.get("/movies/popular", response_model=List[Movie])
def get_popular_movies(pages: int = 2, language: str = "en"):
    TMDB_BASE_URL = "https://api.themoviedb.org/3"
    all_movies = []

    for page in range(1, pages + 1):
        url = f"{TMDB_BASE_URL}/discover/movie"
        params = {
            "api_key": TMDB_API_KEY,
            "sort_by": "popularity.desc",
            "with_original_language": language,
            "page": page,
        }
        res = requests.get(url, params=params)
        if res.status_code != 200:
            continue
        data = res.json()

        for movie in data.get("results", []):
            all_movies.append(
                Movie(
                    id=movie["id"],
                    title=movie["title"],
                    overview=movie.get("overview", ""),
                    release_date=movie.get("release_date", ""),
                    poster_path=f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    if movie.get("poster_path")
                    else None,
                    vote_average=movie.get("vote_average", 0.0),
                )
            )

    return all_movies


@app.get("/movies/search", response_model=List[Movie])
def search_movies_endpoint(q: str = Query(..., min_length=1)):
    return search_movies(q)


# Get movie trailer
@app.get("/movies/{movie_id}/trailer")
def trailer_endpoint(movie_id: int, db: Session = Depends(get_db)):
    # 1️⃣ Try TMDB first
    # Fetch movie details from TMDB to get the title
    tmdb_url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {"api_key": TMDB_API_KEY, "language": "en-US"}
    res = requests.get(tmdb_url, params=params)
    if res.status_code != 200:
        raise HTTPException(status_code=404, detail="Movie not found in TMDB")
    tmdb_data = res.json()
    tmdb_title = tmdb_data.get("title", "")

    # 2️⃣ Use get_trailer function (TMDB + YouTube fallback)
    key = get_trailer(movie_id, tmdb_title)

    # 3️⃣ Check DB fallback
    if not key:
        movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
        if movie and movie.trailer_url:
            key = movie.trailer_url

    # 4️⃣ Not found
    if not key:
        raise HTTPException(status_code=404, detail="Trailer not found")

    # 5️⃣ Return YouTube URL
    return {"youtube_url": f"https://www.youtube.com/watch?v={key}"}




# ======================
# Protected Endpoints (User + Admin)
# ======================

@app.post("/movies/save")
def save_movie(
    movie: Movie,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users can save movies")

    existing = db.query(SavedMovie).filter(SavedMovie.id == movie.id).first()
    trailer_key = get_trailer(movie.id, movie.title)
    trailer_url = f"https://www.youtube.com/watch?v={trailer_key}" if trailer_key else None

    if existing:
        existing.title = movie.title
        existing.overview = movie.overview
        existing.release_date = movie.release_date
        existing.poster_path = movie.poster_path
        existing.vote_average = movie.vote_average
        if trailer_url:
            existing.trailer_url = trailer_url
    else:
        new_movie = SavedMovie(
            id=movie.id,
            title=movie.title,
            overview=movie.overview,
            release_date=movie.release_date,
            poster_path=movie.poster_path,
            vote_average=movie.vote_average,
            trailer_url=trailer_url,
        )
        db.add(new_movie)

    db.commit()
    return {"message": f"Movie '{movie.title}' saved successfully."}


@app.get("/movies/saved", response_model=List[Movie])
def get_saved_movies(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # ✅ Only admin can view saved movies
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admin can view saved movies")

    saved_movies = db.query(SavedMovie).all()
    return saved_movies


@app.put("/movies/{movie_id}/rating")
def update_rating(
    movie_id: int,
    rating: float,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user["role"] != "user":
        raise HTTPException(status_code=403, detail="Only users can rate movies")

    if rating < 0 or rating > 10:
        raise HTTPException(status_code=400, detail="Rating must be between 0 and 10")

    movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
    if not movie:
        movie = SavedMovie(id=movie_id, title=f"Movie #{movie_id}", user_rating=rating)
        db.add(movie)
    else:
        movie.user_rating = rating

    db.commit()
    return {"message": f"Rating updated to {rating} for movie {movie_id}"}


# ======================
# Admin-only Routes
# ======================

@app.delete("/admin/movies/{movie_id}")
def delete_movie_admin(
    movie_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_admin)
):
    movie = db.query(SavedMovie).filter(SavedMovie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    db.delete(movie)
    db.commit()
    return {"message": f"Movie {movie_id} deleted successfully"}
