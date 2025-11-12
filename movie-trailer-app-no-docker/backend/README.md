Backend (FastAPI) - Manual (No Docker)
-------------------------------------

1. Create a Python virtualenv
   python -m venv .venv
2. Activate it
   Windows: .\.venv\Scripts\activate
   mac/Linux: source .venv/bin/activate
3. Install:
   pip install -r requirements.txt
4. Copy .env.example to .env and set TMDB_API_KEY and DATABASE_URL
5. Start the API:
   uvicorn app.main:app --reload --port 8000

API endpoints:
- GET /api/popular
- GET /api/search?q=...
- GET /api/trailer/{tmdb_id}
- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/{id}
