from sqlalchemy import Column, Integer, String, Float
from .database import Base

class SavedMovie(Base):
    __tablename__ = "saved_movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    overview = Column(String(1000))
    release_date = Column(String(50))
    poster_path = Column(String(255))
    vote_average = Column(Float)
    trailer_url = Column(String(500), nullable=True)
    user_rating = Column(Float, nullable=True)
    
