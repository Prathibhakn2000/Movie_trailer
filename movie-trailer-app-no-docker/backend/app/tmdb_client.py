# backend/app/tmdb_client.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE = "https://api.themoviedb.org/3"
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")  # You need to get this key


print("TMDB_API_KEY:", TMDB_API_KEY)
print("YOUTUBE_API_KEY:", YOUTUBE_API_KEY)

def get_popular(page: int = 1):
    url = f"{TMDB_BASE}/movie/popular"
    params = {"api_key": TMDB_API_KEY, "language": "en-US", "page": page}
    res = requests.get(url, params=params).json()
    movies = []
    for m in res.get("results", []):
        movies.append({
            "id": m["id"],
            "title": m["title"],
            "overview": m.get("overview", ""),
            "release_date": m.get("release_date", ""),
            "poster_path": f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else None,
            "vote_average": m.get("vote_average", 0.0)
        })
    return movies

def search_movies(query: str, page: int = 1):
    if not query:
        return []
    url = f"{TMDB_BASE}/search/movie"
    params = {"api_key": TMDB_API_KEY, "query": query, "page": page, "language": "en-US"}
    res = requests.get(url, params=params).json()
    movies = []
    for m in res.get("results", []):
        movies.append({
            "id": m["id"],
            "title": m["title"],
            "overview": m.get("overview", ""),
            "release_date": m.get("release_date", ""),
            "poster_path": f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else None,
            "vote_average": m.get("vote_average", 0.0)
        })
    return movies

def get_trailer(movie_id: int, movie_title: str = ""):
    # TMDB videos
    url = f"{TMDB_BASE}/movie/{movie_id}/videos"
    params = {"api_key": TMDB_API_KEY, "language": "en-US"}
    res = requests.get(url, params=params).json()
    results = res.get("results", [])

    # 1️⃣ Official Trailer
    for v in results:
        if v.get("type") == "Trailer" and v.get("site") == "YouTube":
            return v.get("key")

    # 2️⃣ Teaser
    for v in results:
        if v.get("type") == "Teaser" and v.get("site") == "YouTube":
            return v.get("key")

    # 3️⃣ Any YouTube video from TMDB
    for v in results:
        if v.get("site") == "YouTube":
            return v.get("key")

    # 4️⃣ Fallback: YouTube API search
    if movie_title:
        youtube_search_url = "https://www.googleapis.com/youtube/v3/search"
        youtube_params = {
            "part": "snippet",
            "q": f"{movie_title} trailer",
            "key": YOUTUBE_API_KEY,
            "maxResults": 1,
            "type": "video",
        }
        r = requests.get(youtube_search_url, params=youtube_params).json()
        items = r.get("items", [])
        if items:
            return items[0]["id"]["videoId"]

    return None
