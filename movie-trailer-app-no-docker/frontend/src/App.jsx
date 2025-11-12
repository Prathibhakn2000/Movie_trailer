import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaStar } from "react-icons/fa";

Modal.setAppElement("#root");

const API_BASE = "http://127.0.0.1:8000";

const LANGUAGES = [
  { code: "en", label: "ENGLISH" },
  { code: "hi", label: "HINDI" },
  { code: "ta", label: "TAMIL" },
  { code: "te", label: "TELUGU" },
  { code: "ml", label: "MALAYALAM" },
  { code: "kn", label: "KANNADA" },
];

function App() {
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [userRatings, setUserRatings] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMovies(language);
  }, [language]);

  // ==========================
  // 🔐 Login
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/login`,
        new URLSearchParams({ username, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setToken(res.data.access_token);
      setRole(res.data.role);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      setMessage(`Welcome, ${res.data.role}!`);
    } catch {
      setMessage("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setToken("");
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setMessage("Logged out successfully.");
  };

  // ==========================
  // 🎞 Fetch Movies
  // ==========================
  const fetchMovies = async (langCode) => {
    try {
      const res = await axios.get(`${API_BASE}/movies/popular?language=${langCode}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch popular movies. Is backend running?");
    }
  };

  // ==========================
  // 🔍 Search
  // ==========================
  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(`${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`);
      setMovies(res.data.results || res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  // ==========================
  // 🎥 Trailer
  // ==========================
  const openTrailer = async (movieId) => {
    try {
      setLoadingTrailer(true);
      const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
      if (res.data.youtube_url) {
        setTrailerUrl(res.data.youtube_url);
        setModalIsOpen(true);
      } else {
        alert("Trailer not found");
      }
    } catch (err) {
      console.error(err);
      alert("Trailer not found");
    } finally {
      setLoadingTrailer(false);
    }
  };

  // ==========================
  // 💾 Save Movie
  // ==========================
  const saveMovie = async (movie) => {
    if (savedMovies.includes(movie.id)) return;
    try {
      await axios.post(`${API_BASE}/movies/save`, movie, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`🎬 "${movie.title}" saved successfully!`);
      setSavedMovies([...savedMovies, movie.id]);
    } catch (err) {
      console.error(err);
      alert("Error saving movie. Please login first.");
    }
  };

  // ==========================
  // ❌ Delete Movie (Admin)
  // ==========================
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API_BASE}/admin/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(movies.filter((m) => m.id !== id));
      alert(`Deleted movie ID ${id}`);
    } catch {
      alert("Error deleting movie (Admin only)");
    }
  };

  // ==========================
  // ⭐ Rate
  // ==========================
  const handleRating = (movie, ratingValue) => {
    setUserRatings({ ...userRatings, [movie.id]: ratingValue });
    alert(`You rated "${movie.title}" ${ratingValue}/10`);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#e50914" }}>🎬 Movie Trailer App</h1>

      {/* 🔐 Login Section */}
      {!token ? (
        <form onSubmit={handleLogin} style={{ textAlign: "center", marginBottom: 20 }}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button}>Login</button>
        </form>
      ) : (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p>
            Logged in as <b>{role}</b>
          </p>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      )}

      {/* 🌐 Language Tabs */}
      <div style={styles.languageTabs}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={{
              ...styles.langBtn,
              backgroundColor: language === lang.code ? "#e50914" : "#333",
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* 🔍 Search Bar */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={searchMovies} style={styles.button}>
          Search
        </button>
      </div>

      {message && <p style={{ textAlign: "center", color: "#ccc" }}>{message}</p>}

      {/* 🎞 Movies Grid */}
      <div style={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} style={styles.movieCard}>
            <img src={movie.poster_path} alt={movie.title} style={styles.poster} />
            <h4 style={{ margin: "8px 0" }}>{movie.title}</h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FaStar color="gold" style={{ marginRight: 5 }} />
              <span>{movie.vote_average?.toFixed(1) || "N/A"}/10</span>
            </div>
            <div style={{ marginTop: 10 }}>
              {[...Array(10)].map((_, i) => (
                <FaStar
                  key={i}
                  size={18}
                  color={i + 1 <= (userRatings[movie.id] || 0) ? "#ffc107" : "#444"}
                  onClick={() => handleRating(movie, i + 1)}
                  style={{ cursor: "pointer", marginRight: 2 }}
                />
              ))}
            </div>
            <div style={styles.cardBtns}>
              <button onClick={() => openTrailer(movie.id)} style={styles.trailerBtn}>
                🎥 Trailer
              </button>
              {token && (
                <button
                  onClick={() => saveMovie(movie)}
                  style={{
                    ...styles.saveBtn,
                    backgroundColor: savedMovies.includes(movie.id) ? "green" : "#007bff",
                  }}
                  disabled={savedMovies.includes(movie.id)}
                >
                  {savedMovies.includes(movie.id) ? "✅ Saved" : "💾 Save"}
                </button>
              )}
              {role === "admin" && (
                <button onClick={() => deleteMovie(movie.id)} style={styles.deleteBtn}>
                  🗑 Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🎥 Trailer Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Trailer"
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#111",
      border: "none",
      borderRadius: "16px",
      padding: "0",
      width: "90%",
      maxWidth: "850px",
      boxShadow: "0 0 40px rgba(0,0,0,0.5)",
      overflow: "hidden",
      animation: "fadeIn 0.3s ease-in-out",
    },
  }}
>
  {/* ✖️ Close Button */}
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      backgroundColor: "#000",
      padding: "10px",
    }}
  >
    <button
      onClick={() => setModalIsOpen(false)}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      ✖
    </button>
  </div>

  {/* 🎬 Trailer Content */}
  <div style={{ background: "#000", textAlign: "center" }}>
    {loadingTrailer ? (
      <p style={{ color: "#ccc", padding: "20px", fontSize: "18px" }}>
        Loading trailer...
      </p>
    ) : trailerUrl ? (
      <iframe
        width="100%"
        height="480"
        src={trailerUrl.replace("watch?v=", "embed/")}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <p style={{ color: "#ccc", padding: "20px", fontSize: "18px" }}>
        🚫 Trailer not available
      </p>
    )}
  </div>
</Modal>

    </div>
  );
}

const styles = {
  input: {
    padding: 8,
    margin: "5px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    marginLeft: 5,
  },
  logoutBtn: {
    backgroundColor: "tomato",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  languageTabs: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  langBtn: {
    padding: "8px 15px",
    borderRadius: 20,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  searchInput: {
    padding: 10,
    width: "70%",
    maxWidth: 400,
    borderRadius: 5,
    border: "1px solid #555",
    backgroundColor: "#222",
    color: "#fff",
  },
  movieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  movieCard: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    transition: "transform 0.2s",
  },
  poster: {
    width: "100%",
    height: 280,
    borderRadius: 10,
    objectFit: "cover",
  },
  cardBtns: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  trailerBtn: {
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 5,
    cursor: "pointer",
  },
  saveBtn: {
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 5,
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: 5,
    cursor: "pointer",
  },
  modal: {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: 800,
      backgroundColor: "#000",
      border: "none",
      borderRadius: "10px",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
  },
};

export default App;
