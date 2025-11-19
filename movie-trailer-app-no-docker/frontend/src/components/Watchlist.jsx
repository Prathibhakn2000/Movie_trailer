import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaStar, FaPlay } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAuth } from "../AuthContext";

Modal.setAppElement("#root");

const API_BASE = "http://localhost:8000";

export default function Watchlist() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // ⭐ Fetch watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}/watchlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Normalize response to array
        const moviesArray = Array.isArray(res.data) ? res.data : [];
        const normalized = moviesArray.map((m, idx) => ({
          ...m,
          id: m.id || m.movie_id || idx, // ensure unique id
        }));
        setMovies(normalized);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [token]);

  // ⭐ Fetch user likes and favorites
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const favRes = await axios.get(`${API_BASE}/user/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favRes.data.favorites || []);

        const likeRes = await axios.get(`${API_BASE}/user/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(likeRes.data.likes || {});
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, [token]);

  // ⭐ Open trailer modal
  const openTrailer = async (movieId) => {
    try {
      setLoadingTrailer(true);
      const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
      if (res.data?.youtube_url) {
        setTrailerUrl(res.data.youtube_url);
        setModalIsOpen(true);
      } else {
        alert("Trailer not available");
      }
    } catch {
      alert("Trailer not available");
    } finally {
      setLoadingTrailer(false);
    }
  };

  // ⭐ Add/remove favorite
  const addFavorite = async (movie) => {
  try {
    const res = await axios.post(
      `${API_BASE}/movies/favorite`,
      {
        movie_id: movie.id,
        title: movie.title || "",
        poster_path: movie.poster_path || "",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );

    // update favorite count if backend returns
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movie.id
          ? { ...m, favorite_count: res.data.favorite_count }
          : m
      )
    );
  } catch (err) {
    console.error("Favorite error:", err.response?.data || err);
  }
};

  // ⭐ Like/Dislike
  const likeMovie = async (movieId, isLike) => {
    try {
      const res = await axios.post(
        `${API_BASE}/movies/like`,
        { movie_id: movieId, is_like: isLike },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikes((prev) => ({ ...prev, [movieId]: isLike }));

      setMovies((prev) =>
        prev.map((m) =>
          m.id === movieId ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes } : m
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // ⭐ Star Rating Component
  const StarRating = ({ movieId, initialRating, onRate }) => {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(initialRating || 0);

    useEffect(() => setRating(initialRating || 0), [initialRating]);

    const handleRate = (value) => {
      setRating(value);
      onRate(movieId, value);
    };

    return (
      <div style={{ display: "flex", gap: "4px", marginTop: 4 }}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
          <FaStar
            key={val}
            size={18}
            color={val <= (hover || rating) ? "#f5c518" : "#aaa"}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHover(val)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRate(val)}
          />
        ))}
      </div>
    );
  };

  const rateMovie = async (movieId, rating) => {
    try {
      await axios.put(
        `${API_BASE}/movies/${movieId}/rating`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMovies((prev) =>
        prev.map((m) => (m.id === movieId ? { ...m, user_rating: rating } : m))
      );
    } catch (err) {
      console.error("Rating error:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "#fff", padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>📺 Your Watchlist</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading watchlist...</p>
      ) : movies.length === 0 ? (
        <p style={{ textAlign: "center" }}>No movies saved yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} style={{ backgroundColor: "#222", borderRadius: 10, overflow: "hidden", textAlign: "center", cursor: "pointer" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={
                    movie.poster_path
                      ? movie.poster_path.startsWith("http")
                        ? movie.poster_path
                        : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  style={{ width: "100%", height: 270, objectFit: "cover" }}
                />
                <button
                  onClick={() => openTrailer(movie.id)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: 10,
                    cursor: "pointer",
                  }}
                >
                  <FaPlay />
                </button>
              </div>
              <h3 style={{ margin: "10px 0 5px" }}>{movie.title}</h3>
              <StarRating movieId={movie.id} initialRating={movie.user_rating || 0} onRate={rateMovie} />

              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10, marginBottom: 10 }}>
                {/* Favorite */}
                <button onClick={() => addFavorite(movie)}>
                  {favorites.includes(movie.id) ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                  <span style={{ marginLeft: 4 }}>{movie.favorite_count || 0}</span>
                </button>

                {/* Like */}
                <button onClick={() => likeMovie(movie.id, true)}>
                  {likes[movie.id] === true ? <AiFillLike color="green" /> : <AiOutlineLike />}
                  <span style={{ marginLeft: 4 }}>{movie.likes || 0}</span>
                </button>

                {/* Dislike */}
                <button onClick={() => likeMovie(movie.id, false)}>
                  {likes[movie.id] === false ? <AiFillDislike color="red" /> : <AiOutlineDislike />}
                  <span style={{ marginLeft: 4 }}>{movie.dislikes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trailer Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 },
          content: {
            background: "#000",
            border: "none",
            borderRadius: 12,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 1000,
            height: "70vh",
            padding: 0,
          },
        }}
      >
        {loadingTrailer ? (
          <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>Loading trailer...</p>
        ) : trailerUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={trailerUrl.replace("watch?v=", "embed/")}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>🚫 Trailer not available</p>
        )}
      </Modal>
    </div>
  );
}
