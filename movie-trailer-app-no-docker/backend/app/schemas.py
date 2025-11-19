# from pydantic import BaseModel
# from typing import Optional

# class MovieBase(BaseModel):
#     tmdb_id: int
#     title: str
#     poster_path: Optional[str] = None
#     vote_average: Optional[str] = None
#     vote_count: Optional[int] = None

# class FavoriteCreate(MovieBase):
#     pass

# class Favorite(MovieBase):
#     id: int

#     class Config:
#         orm_mode = True


# from pydantic import BaseModel
# from typing import Optional

# # ===============================
# # Movie schema used for saving
# # ===============================
# class MovieSaveSchema(BaseModel):
#     movie_id: int
#     title: str
#     overview: Optional[str] = None
#     poster_path: Optional[str] = None
#     vote_average: Optional[float] = None
#     user_rating: Optional[float] = None

#     class Config:
#         from_attributes = True


# # ===============================
# # Response schema when reading
# # ===============================
# class MovieResponse(BaseModel):
#     id: int
#     user_id: int
#     movie_id: int
#     title: str
#     overview: Optional[str]
#     poster_path: Optional[str]
#     vote_average: Optional[float]
#     user_rating: Optional[float]

#     class Config:
#         from_attributes = True


# # ===============================
# # User Schemas
# # ===============================
# class UserBase(BaseModel):
#     username: str


# class UserResponse(UserBase):
#     id: int
#     role: str

#     class Config:
#         from_attributes = True

from pydantic import BaseModel, EmailStr, constr

class SignupModel(BaseModel):
    username: str
    email: EmailStr
    password: constr(min_length=6, max_length=72)
    role: str = "user"  # default

class LoginModel(BaseModel):
    email: str
    password: str

class MovieSaveSchema(BaseModel):
    movie_id: int
    title: str
    overview: str | None = None
    poster_path: str | None = None
    vote_average: float | None = None


class MovieLikeModel(BaseModel):
    movie_id: int
    is_like: bool


class MovieFavModel(BaseModel):
    movie_id: int
    title: str
    poster_path: str | None = None



class Movie(BaseModel):
    id: int
    title: str
    poster_path: str
    trailer_url: str
