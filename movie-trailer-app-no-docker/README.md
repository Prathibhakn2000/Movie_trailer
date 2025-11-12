Movie Trailer App (No Docker)
============================

This archive contains a full Movie Trailer App designed to run locally without Docker.

Structure:
  - backend/: FastAPI app (MySQL only)
  - frontend/: React + Vite app (dev server)

Quick start (backend):
  cd backend
  python -m venv .venv
  # Windows
  .\.venv\Scripts\activate
  # mac/Linux
  source .venv/bin/activate
  pip install -r requirements.txt
  copy .env.example .env   # or cp .env.example .env
  # edit .env with TMDB_API_KEY and DATABASE_URL
  uvicorn app.main:app --reload --port 8000

Quick start (frontend):
  cd frontend
  npm install
  npm run dev

Notes:
  - DATABASE_URL example: mysql+pymysql://movieuser:moviepass@localhost:3306/movie_trailer_db
  - Create the MySQL database and user before running the backend.
  - Backend will auto-create the `favorites` table on startup.

If you want, I can provide SQL commands to create the DB and user for your OS.
