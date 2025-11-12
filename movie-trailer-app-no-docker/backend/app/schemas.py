from pydantic import BaseModel
from typing import Optional

class MovieBase(BaseModel):
    tmdb_id: int
    title: str
    poster_path: Optional[str] = None
    vote_average: Optional[str] = None
    vote_count: Optional[int] = None

class FavoriteCreate(MovieBase):
    pass

class Favorite(MovieBase):
    id: int

    class Config:
        orm_mode = True
