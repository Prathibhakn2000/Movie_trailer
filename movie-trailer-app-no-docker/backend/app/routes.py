from fastapi import APIRouter, Depends, HTTPException, Query
from .tmdb_client import search_movies, popular_movies, movie_details, get_genres, get_youtube_trailer_key
from .database import get_db
from sqlalchemy.orm import Session
from . import crud, schemas



from fastapi import APIRouter, Query
from .tmdb_client import search_movies

router = APIRouter()

@router.get("/movies/search")
def api_search(q: str = Query(..., min_length=1), page: int = 1):
    movies = search_movies(q, page)
    if not movies:
        return {"message": f"No movies found for '{q}'", "results": []}
    return movies


@router.get('/popular')
def api_popular(page: int = 1):
    return popular_movies(page)

@router.get('/movie/{tmdb_id}')
def api_movie(tmdb_id: int):
    return movie_details(tmdb_id)

@router.get('/genres')
def api_genres():
    return get_genres()

@router.get('/trailer/{tmdb_id}')
def api_trailer(tmdb_id: int):
    data = movie_details(tmdb_id)
    key = get_youtube_trailer_key(data.get('videos', {}))
    return {"youtube_key": key}

@router.post('/favorites', response_model=schemas.Favorite)
def add_favorite(fav: schemas.FavoriteCreate, db: Session = Depends(get_db)):
    existing = crud.get_favorite_by_tmdb(db, fav.tmdb_id)
    if existing:
        raise HTTPException(status_code=400, detail='Already favorited')
    return crud.create_favorite(db, fav)

@router.get('/favorites', response_model=list[schemas.Favorite])
def list_favs(db: Session = Depends(get_db)):
    return crud.list_favorites(db)

@router.delete('/favorites/{fav_id}')
def remove_fav(fav_id: int, db: Session = Depends(get_db)):
    f = crud.delete_favorite(db, fav_id)
    if not f:
        raise HTTPException(status_code=404, detail='Not found')
    return {"ok": True}
