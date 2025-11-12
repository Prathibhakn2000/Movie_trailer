from sqlalchemy.orm import Session
from . import models, schemas

def get_favorite_by_tmdb(db: Session, tmdb_id: int):
    return db.query(models.Favorite).filter(models.Favorite.tmdb_id == tmdb_id).first()

def create_favorite(db: Session, fav: schemas.FavoriteCreate):
    db_fav = models.Favorite(tmdb_id=fav.tmdb_id, title=fav.title, poster_path=fav.poster_path,
                             vote_average=fav.vote_average, vote_count=fav.vote_count)
    db.add(db_fav)
    db.commit()
    db.refresh(db_fav)
    return db_fav

def list_favorites(db: Session):
    return db.query(models.Favorite).order_by(models.Favorite.added_at.desc()).all()

def delete_favorite(db: Session, fav_id: int):
    f = db.query(models.Favorite).filter(models.Favorite.id == fav_id).first()
    if f:
        db.delete(f)
        db.commit()
    return f
