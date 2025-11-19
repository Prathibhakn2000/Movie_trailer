# from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
# from sqlalchemy.orm import relationship

# from app.database import Base 

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(100), unique=True, nullable=False)
#     email = Column(String(150), unique=True, nullable=False)
#     password = Column(String(255), nullable=False)
#     role = Column(String(20), default="user")  # user or admin

#     saved_movies = relationship("SavedMovie", back_populates="user")


# class SavedMovie(Base):
#     __tablename__ = "saved_movies"

#     id = Column(Integer, primary_key=True, index=True)
#     movie_id = Column(Integer)
#     title = Column(String(255))
#     overview = Column(Text)
#     poster_path = Column(String(255))
#     vote_average = Column(Float)
#     user_rating = Column(Float, nullable=True)
#     user_id = Column(Integer, ForeignKey("users.id"))

#     user = relationship("User", back_populates="saved_movies")


from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy import Boolean

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(20), default="user")  # user or admin

    saved_movies = relationship("SavedMovie", back_populates="user")
    ratings = relationship("Rating", back_populates="user")


class SavedMovie(Base):
    __tablename__ = "saved_movies"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer)
    title = Column(String(255))
    overview = Column(Text)
    poster_path = Column(String(255))
    vote_average = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="saved_movies")
    ratings = relationship("Rating", back_populates="movie")


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    saved_movie_id = Column(Integer, ForeignKey("saved_movies.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Float)

    movie = relationship("SavedMovie", back_populates="ratings")
    user = relationship("User", back_populates="ratings")

class FavoriteMovie(Base):
    __tablename__ = "favorite_movies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    movie_id = Column(Integer)
    title = Column(String(255))
    poster_path = Column(String(255))

class LikeMovie(Base):
    __tablename__ = "like_movies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    movie_id = Column(Integer)
    is_like = Column(Boolean)   # True = Like 👍, False = Dislike 👎


