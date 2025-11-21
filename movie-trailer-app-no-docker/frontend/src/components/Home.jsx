// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";

// const API_BASE = "http://localhost:8000"; // backend URL

// export default function Home() {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch movies
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/movies`);
//         setMovies(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch movies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "#fff" }}>
//       {/* Header */}
//       <header style={headerStyle}>
//         <button
//           style={headerBtnStyle}
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           Popular Movies
//         </button>

//         {!token && (
//           <button style={loginBtnStyle} onClick={() => navigate("/login")}>
//             🔑 Sign In
//           </button>
//         )}
//       </header>

//       {/* Main */}
//       <main style={{ padding: "20px" }}>
//         <h2>Popular Movies</h2>
//         {loading ? (
//           <p>Loading movies...</p>
//         ) : movies.length === 0 ? (
//           <p>No movies available.</p>
//         ) : (
//           <div style={gridStyle}>
//             {movies.map((movie) => (
//               <div
//                 key={movie.id}
//                 style={cardStyle}
//                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//               >
//                 <img
//                   src={movie.poster_path}
//                   alt={movie.title}
//                   style={{ width: "100%", borderRadius: "8px" }}
//                 />
//                 <h3 style={{ margin: "10px 0 5px" }}>{movie.title}</h3>
//                 <button
//                   style={trailerBtnStyle}
//                   onClick={() =>
//                     window.open(movie.trailer_url, "_blank", "noopener noreferrer")
//                   }
//                 >
//                   ▶ Play Trailer
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// // Header styles
// const headerStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 20px",
//   backgroundColor: "#111",
//   color: "#fff",
//   position: "sticky",
//   top: 0,
//   zIndex: 1000,
// };

// const headerBtnStyle = {
//   backgroundColor: "#0984e3",
//   color: "#fff",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };

// const loginBtnStyle = {
//   backgroundColor: "#00b894",
//   color: "#fff",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };

// // Movie grid styles
// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//   gap: "20px",
//   marginTop: "20px",
// };

// const cardStyle = {
//   backgroundColor: "#222",
//   padding: "10px",
//   borderRadius: "10px",
//   color: "#fff",
//   textAlign: "center",
//   transition: "transform 0.2s",
//   cursor: "pointer",
// };

// const trailerBtnStyle = {
//   marginTop: "8px",
//   backgroundColor: "#e50914",
//   color: "#fff",
//   border: "none",
//   padding: "6px 10px",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };






// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://localhost:8000";

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/movies`);
//         setMovies(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch movies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, []);

//   return (
//     <div style={homeStyle}>
//       <div style={overlayStyle}>
//         <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
//           🎬 Welcome to Movie Trailer App.
//         </h1>

//         {/* Popular Movies Grid */}
//         {loading ? (
//           <p style={{ textAlign: "center" }}>Loading movies...</p>
//         ) : movies.length === 0 ? (
//           <p style={{ textAlign: "center" }}>No movies available.</p>
//         ) : (
//           <div style={gridStyle}>
//             {movies.map((movie) => (
//               <div key={movie.id} style={cardStyle}>
//                 <img
//                   src={movie.poster_path}
//                   alt={movie.title}
//                   style={posterStyle}
//                 />
//                 <h3 style={titleStyle}>{movie.title}</h3>
//                 <button
//                   style={trailerBtnStyle}
//                   onClick={() =>
//                     window.open(movie.trailer_url, "_blank", "noopener noreferrer")
//                   }
//                 >
//                   ▶ Play Trailer
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Styles
// const homeStyle = {
//   minHeight: "100vh",
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1606761561903-8e349be5d177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   color: "#fff",
//   padding: "20px",
// };

// const overlayStyle = {
//   backgroundColor: "rgba(0,0,0,0.6)",
//   minHeight: "100vh",
//   padding: "20px",
// };

// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//   gap: "20px",
// };

// const cardStyle = {
//   backgroundColor: "rgba(34, 34, 34, 0.8)",
//   borderRadius: "10px",
//   overflow: "hidden",
//   textAlign: "center",
//   transition: "transform 0.2s",
//   cursor: "pointer",
// };

// const posterStyle = {
//   width: "100%",
//   height: "270px",
//   objectFit: "cover",
// };

// const titleStyle = {
//   margin: "10px 0 5px",
//   fontSize: "16px",
//   color: "#fff",
// };

// const trailerBtnStyle = {
//   marginBottom: "10px",
//   backgroundColor: "#e50914",
//   color: "#fff",
//   border: "none",
//   padding: "6px 10px",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
// import {
//   AiFillHeart,
//   AiFillLike,
//   AiFillDislike,
// } from "react-icons/ai";
// import { BsBookmarkFill } from "react-icons/bs";

// const API_BASE = "http://127.0.0.1:8000";
// const TMDB_API_KEY = "d3074219a1b1d2781dd2a2b101a208ce";
// const TMDB_BASE = "https://api.themoviedb.org/3";

// Modal.setAppElement("#root");

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [likedMovies, setLikedMovies] = useState({});
//   const [favoritedMovies, setFavoritedMovies] = useState({});
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/movies`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         setMovies(res.data.slice(0, 20));
//       } catch {
//         // fallback to TMDB popular
//         try {
//           const tmdbRes = await axios.get(`${TMDB_BASE}/movie/popular`, {
//             params: { api_key: TMDB_API_KEY, language: "en-US", page: 1 },
//           });
//           const data = tmdbRes.data.results.slice(0, 20).map((m) => ({
//             ...m,
//             likes: Math.floor(Math.random() * 100),
//             dislikes: Math.floor(Math.random() * 50),
//             favorite_count: Math.floor(Math.random() * 30),
//           }));
//           setMovies(data);
//         } catch (err) {
//           console.error("Failed to fetch movies from TMDB:", err.message);
//           setMovies([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [token]);

//   const handleAuthAction = (movieId, type) => {
//     if (!token) {
//       alert("Please sign in first!");
//       navigate("/login");
//       return;
//     }

//     if (type === "like") {
//       setLikedMovies((prev) => ({
//         ...prev,
//         [movieId]: prev[movieId] === "like" ? null : "like",
//       }));
//     } else if (type === "dislike") {
//       setLikedMovies((prev) => ({
//         ...prev,
//         [movieId]: prev[movieId] === "dislike" ? null : "dislike",
//       }));
//     } else if (type === "favorite") {
//       setFavoritedMovies((prev) => ({
//         ...prev,
//         [movieId]: !prev[movieId],
//       }));
//     } else if (type === "save") {
//       alert("Save clicked! (Implement save API)");
//     } else if (type === "trailer") {
//       setTrailerUrl(
//         `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`
//       );
//       setModalOpen(true);
//     }
//   };

//   return (
//     <div style={homeStyle}>
//       <div style={overlayStyle}>
//         <h1 style={{ textAlign: "center", marginBottom: 20 }}>
//           🎬 Welcome to Movie Trailer App
//         </h1>

//         {loading ? (
//           <p style={{ textAlign: "center" }}>Loading movies...</p>
//         ) : movies.length === 0 ? (
//           <p style={{ textAlign: "center" }}>No movies available.</p>
//         ) : (
//           <div style={gridStyle}>
//             {movies.map((movie) => (
//               <div key={movie.id} style={cardStyle}>
//                 <img
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith("http")
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//                       : ""
//                   }
//                   alt={movie.title}
//                   style={posterStyle}
//                 />
//                 <h3 style={titleStyle}>{movie.title}</h3>

//                 <div style={actionRow}>
//                   {/* Like */}
//                   <button
//                     style={{ ...actionBtn, color: "blue" }}
//                     onClick={() => handleAuthAction(movie.id, "like")}
//                   >
//                     <AiFillLike />
//                     <span style={{ marginLeft: 4 }}>{movie.likes || 0}</span>
//                   </button>

//                   {/* Dislike */}
//                   <button
//                     style={{ ...actionBtn, color: "red" }}
//                     onClick={() => handleAuthAction(movie.id, "dislike")}
//                   >
//                     <AiFillDislike />
//                     <span style={{ marginLeft: 4 }}>{movie.dislikes || 0}</span>
//                   </button>

//                   {/* Favorite */}
//                   <button
//                     style={{ ...actionBtn, color: "pink" }}
//                     onClick={() => handleAuthAction(movie.id, "favorite")}
//                   >
//                     <AiFillHeart />
//                     <span style={{ marginLeft: 4 }}>
//                       {movie.favorite_count || 0}
//                     </span>
//                   </button>

//                   {/* Save */}
//                   <button
//                     style={{ ...actionBtn, color: "white" }}
//                     onClick={() => handleAuthAction(movie.id, "save")}
//                   >
//                     <BsBookmarkFill />
//                   </button>

//                   {/* Trailer */}
//                   <button
//                     style={{ ...actionBtn, color: "white" }}
//                     onClick={() => handleAuthAction(movie.id, "trailer")}
//                   >
//                     ▶
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Trailer Modal */}
//       <Modal
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         style={modalStyles}
//       >
//         <iframe
//           width="100%"
//           height="100%"
//           src={trailerUrl}
//           title="Trailer"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         />
//       </Modal>
//     </div>
//   );
// }

// // Styles
// const homeStyle = {
//   minHeight: "100vh",
//   backgroundImage:
//     "url('https://images.unsplash.com/photo-1606761561903-8e349be5d177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   color: "#fff",
//   padding: 20,
// };

// const overlayStyle = {
//   backgroundColor: "rgba(0,0,0,0.6)",
//   minHeight: "100vh",
//   padding: 20,
// };

// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//   gap: 20,
//   justifyItems: "center",
// };

// const cardStyle = {
//   backgroundColor: "rgba(34,34,34,0.8)",
//   borderRadius: 10,
//   overflow: "hidden",
//   textAlign: "center",
//   width: 220,
//   minHeight: 360,
//   padding: 10,
// };

// const posterStyle = {
//   width: "100%",
//   height: 300,
//   objectFit: "cover",
//   borderRadius: 6,
// };

// const titleStyle = {
//   margin: "10px 0 5px",
//   fontSize: 16,
//   color: "#fff",
// };

// const actionRow = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginTop: 10,
// };

// const actionBtn = {
//   border: "none",
//   background: "transparent",
//   cursor: "pointer",
//   display: "flex",
//   alignItems: "center",
//   fontWeight: "bold",
//   fontSize: 16,
// };

// const modalStyles = {
//   overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 },
//   content: {
//     background: "#000",
//     border: "none",
//     borderRadius: 12,
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "90%",
//     maxWidth: 1000,
//     height: "70vh",
//     padding: 0,
//   },
// };


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import {
//   FaPlay,
//   FaStar
// } from "react-icons/fa";
// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineLike,
//   AiOutlineDislike,
//   AiFillLike,
//   AiFillDislike
// } from "react-icons/ai";
// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import "./MovieGrid.css"; // Keep your CSS for styling

// const API_BASE = "http://127.0.0.1:8000";
// const TMDB_API_KEY = "d3074219a1b1d2781dd2a2b101a208ce";
// const TMDB_BASE = "https://api.themoviedb.org/3";

// Modal.setAppElement("#root");

// const LANGUAGES = [
//   { code: "en", label: "ENGLISH" },
//   { code: "hi", label: "HINDI" },
//   { code: "ta", label: "TAMIL" },
//   { code: "te", label: "TELUGU" },
//   { code: "ml", label: "MALAYALAM" },
//   { code: "kn", label: "KANNADA" },
// ];

// export default function Home({ role }) {
//   const token = localStorage.getItem("token");

//   const [movies, setMovies] = useState([]);
//   const [language, setLanguage] = useState("en");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);

//   const [favorites, setFavorites] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [error, setError] = useState("");

//   // STAR RATING COMPONENT
//   const StarRating = ({ movieId, initialRating = 0, onRate }) => {
//     const [hoverRating, setHoverRating] = useState(null);
//     const [currentRating, setCurrentRating] = useState(initialRating);

//     useEffect(() => {
//       setCurrentRating(initialRating);
//     }, [initialRating]);

//     return (
//       <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
//         {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
//           <FaStar
//             key={value}
//             size={20}
//             color={(hoverRating || currentRating) >= value ? "#f5c518" : "#aaa"}
//             style={{ cursor: "pointer" }}
//             onMouseEnter={() => setHoverRating(value)}
//             onMouseLeave={() => setHoverRating(null)}
//             onClick={() => {
//               setCurrentRating(value);
//               onRate(movieId, value);
//             }}
//           />
//         ))}
//       </div>
//     );
//   };

//   const rateMovie = async (movieId, rating) => {
//     try {
//       if (!token) return;
//       setMovies((prev) =>
//         prev.map((m) =>
//           m.id === movieId ? { ...m, user_rating: rating } : m
//         )
//       );
//       await axios.put(
//         `${API_BASE}/movies/${movieId}/rating`,
//         { rating: Number(rating) },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("Rating error:", err);
//     }
//   };

//   const fetchMovies = async (lang) => {
//     try {
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       // Backend fetch
//       const res = await axios.get(`${API_BASE}/movies`, { params: { lang }, headers });
//       const data = res.data;

//       // fallback counts
//       const moviesWithCounts = await Promise.all(
//         data.map(async (movie) => {
//           try {
//             const countRes = await axios.get(`${API_BASE}/movies/${movie.id}/likes-count`, { headers });
//             const favRes = await axios.get(`${API_BASE}/movies/${movie.id}/favorite-count`, { headers });
//             return {
//               ...movie,
//               likes: countRes.data.likes,
//               dislikes: countRes.data.dislikes,
//               favorite_count: favRes.data.count,
//             };
//           } catch {
//             return { ...movie, likes: 0, dislikes: 0, favorite_count: 0 };
//           }
//         })
//       );

//       setMovies(moviesWithCounts);
//       setError("");
//     } catch (err) {
//       console.log("Backend fetch failed, using TMDB:", err.message);

//       // fallback to TMDB
//       try {
//         const tmdbRes = await axios.get(`${TMDB_BASE}/movie/popular`, {
//           params: { api_key: TMDB_API_KEY, language: lang, page: 1 },
//         });
//         const tmdbMovies = tmdbRes.data.results.slice(0, 20).map((m) => ({
//           ...m,
//           likes: Math.floor(Math.random() * 100),
//           dislikes: Math.floor(Math.random() * 50),
//           favorite_count: Math.floor(Math.random() * 30),
//         }));
//         setMovies(tmdbMovies);
//       } catch (err) {
//         console.error("TMDB fetch failed:", err.message);
//         setMovies([]);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchMovies(language);
//   }, [language]);

//   useEffect(() => {
//     // fetch user favorites
//     if (!token) return;
//     const fetchUserData = async () => {
//       try {
//         const favRes = await axios.get(`${API_BASE}/user/favorites`, { headers: { Authorization: `Bearer ${token}` } });
//         setFavorites(favRes.data.favorites || []);
//         const likeRes = await axios.get(`${API_BASE}/user/likes`, { headers: { Authorization: `Bearer ${token}` } });
//         setLikes(likeRes.data.likes || {});
//       } catch (err) {
//         console.error("User data fetch failed:", err);
//       }
//     };
//     fetchUserData();
//   }, [token]);

//   const searchMovies = async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const res = await axios.get(`${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`);
//       setMovies(res.data);
//     } catch {
//       setMovies([]);
//       setError("Search failed");
//     }
//   };

//   const openTrailer = async (movieId) => {
//     try {
//       setLoadingTrailer(true);
//       const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
//       if (res.data.youtube_url) {
//         setTrailerUrl(res.data.youtube_url);
//         setModalIsOpen(true);
//       } else {
//         alert("Trailer not found");
//       }
//     } catch {
//       alert("Trailer not found");
//     } finally {
//       setLoadingTrailer(false);
//     }
//   };

//   const addFavorite = async (movie) => {
//     if (!token) return alert("Login required!");
//     try {
//       const res = await axios.post(`${API_BASE}/movies/favorite`, { movie_id: movie.id }, { headers: { Authorization: `Bearer ${token}` } });
//       setFavorites((prev) =>
//         prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
//       );
//       setMovies((prev) =>
//         prev.map((m) => (m.id === movie.id ? { ...m, favorite_count: res.data.favorite_count } : m))
//       );
//     } catch (err) {
//       console.error("Favorite error:", err);
//     }
//   };

//   const likeMovie = async (movieId, isLike) => {
//     if (!token) return alert("Login required!");
//     try {
//       const res = await axios.post(`${API_BASE}/movies/like`, { movie_id: movieId, is_like: isLike }, { headers: { Authorization: `Bearer ${token}` } });
//       setLikes((prev) => ({ ...prev, [movieId]: isLike }));
//       setMovies((prev) => prev.map((m) => (m.id === movieId ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes } : m)));
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };

//   const saveMovie = async (movie) => {
//     if (!token) return alert("Login required!");
//     try {
//       await axios.post(`${API_BASE}/movies/save`, { movie_id: movie.id }, { headers: { Authorization: `Bearer ${token}` } });
//       setSavedMovies((prev) => [...prev, movie.id]);
//     } catch (err) {
//       console.error("Save error:", err);
//     }
//   };

//   return (
//     <div className="movie-page">
//       {role !== "admin" && (
//         <div className="sticky-header">
//           <div className="language-tabs">
//             {LANGUAGES.map((lang) => (
//               <button key={lang.code} className={language === lang.code ? "active" : ""} onClick={() => setLanguage(lang.code)}>
//                 {lang.label}
//               </button>
//             ))}
//           </div>
//           <div className="search-bar">
//             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search movies..." />
//             <button onClick={searchMovies}>Search</button>
//           </div>
//         </div>
//       )}

//       {error && <p className="error">{error}</p>}

//       <div className="movie-grid">
//         {movies.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
//         ) : (
//           movies.map((movie) => (
//             <div key={movie.id} className="movie-card">
//               <div className="poster-container">
//                 <img src={movie.poster_path ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w342${movie.poster_path}`) : "/no-poster.png"} alt={movie.title} className="poster" />
//                 <div className="overlay">
//                   <button className="play-btn" onClick={() => openTrailer(movie.id)}>
//                     <FaPlay />
//                   </button>
//                 </div>
//               </div>
//               <div className="movie-info">
//                 <h3>{movie.title}</h3>
//                 {role !== "admin" && <StarRating movieId={movie.id} initialRating={movie.user_rating || 0} onRate={rateMovie} />}
//                 <div className="action-row">
//                   <button className={favorites.includes(movie.id) ? "favorite-btn active" : "favorite-btn"} onClick={() => addFavorite(movie)}>
//                     {favorites.includes(movie.id) ? <AiFillHeart /> : <AiOutlineHeart />}
//                     <span className="count">{movie.favorite_count || 0}</span>
//                   </button>
//                   <button className={likes[movie.id] === true ? "like active" : "like"} onClick={() => likeMovie(movie.id, true)}>
//                     {likes[movie.id] === true ? <AiFillLike /> : <AiOutlineLike />}
//                     <span className="count">{movie.likes}</span>
//                   </button>
//                   <button className={likes[movie.id] === false ? "dislike active" : "dislike"} onClick={() => likeMovie(movie.id, false)}>
//                     {likes[movie.id] === false ? <AiFillDislike /> : <AiOutlineDislike />}
//                     <span className="count">{movie.dislikes}</span>
//                   </button>
//                   {role !== "admin" && (
//                     <button className={savedMovies.includes(movie.id) ? "save-btn active" : "save-btn"} onClick={() => saveMovie(movie)} disabled={savedMovies.includes(movie.id)}>
//                       {savedMovies.includes(movie.id) ? <BsBookmarkFill /> : <BsBookmark />}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{ overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 }, content: { background: "#000", border: "none", borderRadius: "12px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: "1000px", height: "70vh", padding: 0 } }}>
//         {loadingTrailer ? (
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>Loading trailer...</p>
//         ) : trailerUrl ? (
//           <iframe width="100%" height="100%" src={trailerUrl.replace("watch?v=", "embed/")} title="Trailer" allow="autoplay; encrypted-media" allowFullScreen />
//         ) : (
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>🚫 Trailer not available</p>
//         )}
//       </Modal>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import { FaPlay } from "react-icons/fa";
// import { AiFillHeart, AiFillLike, AiFillDislike } from "react-icons/ai";
// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import "./MovieGrid.css";

// const API_BASE = "http://127.0.0.1:8000";
// const TMDB_API_KEY = "d3074219a1b1d2781dd2a2b101a208ce";
// const TMDB_BASE = "https://api.themoviedb.org/3";

// Modal.setAppElement("#root");

// export default function Home() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [savedMovies, setSavedMovies] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     if (!token) return;
//     const fetchUserData = async () => {
//       try {
//         const favRes = await axios.get(`${API_BASE}/user/favorites`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFavorites(favRes.data.favorites || []);

//         const likeRes = await axios.get(`${API_BASE}/user/likes`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLikes(likeRes.data.likes || {});
//       } catch (err) {
//         console.error("User data fetch failed:", err);
//       }
//     };
//     fetchUserData();
//   }, [token]);

//   const fetchMovies = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/movies`);
//       setMovies(res.data);
//     } catch {
//       try {
//         const tmdbRes = await axios.get(`${TMDB_BASE}/movie/popular`, {
//           params: { api_key: TMDB_API_KEY, language: "en-US", page: 1 },
//         });
//         const tmdbMovies = tmdbRes.data.results.slice(0, 20).map((m) => ({
//           ...m,
//           likes: Math.floor(Math.random() * 100),
//           dislikes: Math.floor(Math.random() * 50),
//           favorite_count: Math.floor(Math.random() * 30),
//         }));
//         setMovies(tmdbMovies);
//       } catch (err) {
//         console.error("TMDB fetch failed:", err.message);
//         setMovies([]);
//       }
//     }
//   };

//   const requireLogin = () => {
//     alert("Please login first!");
//     navigate("/login");
//   };

//   const openTrailer = (movieId) => {
//     if (!token) return requireLogin();
//     setTrailerUrl(`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`);
//     setModalIsOpen(true);
//   };

//   const addFavorite = (movie) => {
//     if (!token) return requireLogin();
//     setFavorites((prev) =>
//       prev.includes(movie.id)
//         ? prev.filter((id) => id !== movie.id)
//         : [...prev, movie.id]
//     );
//   };

//   const likeMovie = (movieId) => {
//     if (!token) return requireLogin();
//     setLikes((prev) => ({ ...prev, [movieId]: true }));
//   };

//   const dislikeMovie = (movieId) => {
//     if (!token) return requireLogin();
//     setLikes((prev) => ({ ...prev, [movieId]: false }));
//   };

//   const saveMovie = (movie) => {
//     if (!token) return requireLogin();
//     setSavedMovies((prev) => [...prev, movie.id]);
//   };

//   return (
//     <div className="movie-page" style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "20px" }}>
//       <div
//         className="movie-grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", // increased card size
//           gap: "20px",
//         }}
//       >
//         {movies.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
//         ) : (
//           movies.map((movie) => (
//             <div
//               key={movie.id}
//               className="movie-card"
//               style={{
//                 backgroundColor: "#1e1e1e",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 color: "#fff",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 paddingBottom: "10px",
//               }}
//             >
//               <div
//                 className="poster-container"
//                 onClick={() => openTrailer(movie.id)}
//                 style={{ position: "relative", cursor: "pointer" }}
//               >
//                 <img
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith("http")
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
//                       : "/no-poster.png"
//                   }
//                   alt={movie.title}
//                   style={{
//                     width: "100%",
//                     display: "block",
//                     borderTopLeftRadius: "12px",
//                     borderTopRightRadius: "12px",
//                   }}
//                 />
//                 <div
//                   className="overlay"
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     backgroundColor: "rgba(0,0,0,0.4)",
//                   }}
//                 >
//                   <button
//                     className="play-btn"
//                     style={{ background: "none", border: "none", cursor: "pointer" }}
//                   >
//                     <FaPlay size={28} color="#fff" />
//                   </button>
//                 </div>
//               </div>
//               <h3 style={{ margin: "10px 0 5px 0", fontSize: "16px", textAlign: "center" }}>{movie.title}</h3>
//               <div className="action-row" style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center" }}>
//                 {/* FAVORITE */}
//                 <button
//                   className={favorites.includes(movie.id) ? "favorite-btn active" : "favorite-btn"}
//                   onClick={() => addFavorite(movie)}
//                   style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer" }}
//                 >
//                   <AiFillHeart style={{ color: "pink", fontSize: "22px" }} />
//                   {movie.favorite_count > 0 && <span style={{ color: "#fff" }}>{movie.favorite_count}</span>}
//                 </button>

//                 {/* LIKE */}
//                 <button
//                   onClick={() => likeMovie(movie.id)}
//                   style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer" }}
//                 >
//                   <AiFillLike style={{ color: "blue", fontSize: "22px" }} />
//                   {movie.likes > 0 && <span style={{ color: "#fff" }}>{movie.likes}</span>}
//                 </button>

//                 {/* DISLIKE */}
//                 <button
//                   onClick={() => dislikeMovie(movie.id)}
//                   style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer" }}
//                 >
//                   <AiFillDislike style={{ color: "red", fontSize: "22px" }} />
//                   {movie.dislikes > 0 && <span style={{ color: "#fff" }}>{movie.dislikes}</span>}
//                 </button>

//                 {/* SAVE */}
//                 <button
//                   className={savedMovies.includes(movie.id) ? "save-btn active" : "save-btn"}
//                   onClick={() => saveMovie(movie)}
//                   style={{ display: "inline-flex", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
//                 >
//                   {savedMovies.includes(movie.id) ? <BsBookmarkFill size={22} /> : <BsBookmark size={22} />}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={{
//           overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 },
//           content: {
//             background: "#000",
//             border: "none",
//             borderRadius: "12px",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: "1000px",
//             height: "70vh",
//             padding: 0,
//           },
//         }}
//       >
//         {trailerUrl && (
//           <iframe
//             width="100%"
//             height="100%"
//             src={trailerUrl}
//             title="Trailer"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           />
//         )}
//       </Modal>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiFillHeart, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./MovieGrid.css";

const API_BASE = "http://127.0.0.1:8000";
const TMDB_API_KEY = "d3074219a1b1d2781dd2a2b101a208ce";
const TMDB_BASE = "https://api.themoviedb.org/3";

Modal.setAppElement("#root");

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
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
        console.error("User data fetch failed:", err);
      }
    };
    fetchUserData();
  }, [token]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_BASE}/movies`);
      setMovies(res.data);
    } catch {
      try {
        const tmdbRes = await axios.get(`${TMDB_BASE}/movie/popular`, {
          params: { api_key: TMDB_API_KEY, language: "en-US", page: 1 },
        });
        const tmdbMovies = tmdbRes.data.results.slice(0, 20).map((m) => ({
          ...m,
          likes: Math.floor(Math.random() * 100),
          dislikes: Math.floor(Math.random() * 50),
          favorite_count: Math.floor(Math.random() * 30),
        }));
        setMovies(tmdbMovies);
      } catch (err) {
        console.error("TMDB fetch failed:", err.message);
        setMovies([]);
      }
    }
  };

  const requireLogin = () => {
    alert("Please login first!");
    navigate("/login");
  };

  const openTrailer = (movieId) => {
    if (!token) return requireLogin();
    setTrailerUrl(`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`);
    setModalIsOpen(true);
  };

  const addFavorite = (movie) => {
    if (!token) return requireLogin();
    setFavorites((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
  };

  const likeMovie = (movieId) => {
    if (!token) return requireLogin();
    setLikes((prev) => ({ ...prev, [movieId]: true }));
  };

  const dislikeMovie = (movieId) => {
    if (!token) return requireLogin();
    setLikes((prev) => ({ ...prev, [movieId]: false }));
  };

  const saveMovie = (movie) => {
    if (!token) return requireLogin();
    setSavedMovies((prev) => [...prev, movie.id]);
  };

  return (
    <div
      className="movie-page"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* 🎬 New Welcome Heading */}
      <h1
        style={{
          textAlign: "center",
          color: "#f5c518",
          fontSize: "32px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Welcome to Movie Trailer App 🎬
      </h1>

      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
                overflow: "hidden",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <div
                className="poster-container"
                onClick={() => openTrailer(movie.id)}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <img
                  src={
                    movie.poster_path
                      ? movie.poster_path.startsWith("http")
                        ? movie.poster_path
                        : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    display: "block",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  <button
                    className="play-btn"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaPlay size={28} color="#fff" />
                  </button>
                </div>
              </div>

              <h3
                style={{
                  margin: "10px 0 5px 0",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {movie.title}
              </h3>

              <div
                className="action-row"
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* FAVORITE */}
                <button
                  className={
                    favorites.includes(movie.id)
                      ? "favorite-btn active"
                      : "favorite-btn"
                  }
                  onClick={() => addFavorite(movie)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <AiFillHeart style={{ color: "pink", fontSize: "22px" }} />
                  {movie.favorite_count > 0 && (
                    <span style={{ color: "#fff" }}>
                      {movie.favorite_count}
                    </span>
                  )}
                </button>

                {/* LIKE */}
                <button
                  onClick={() => likeMovie(movie.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <AiFillLike style={{ color: "blue", fontSize: "22px" }} />
                  {movie.likes > 0 && (
                    <span style={{ color: "#fff" }}>{movie.likes}</span>
                  )}
                </button>

                {/* DISLIKE */}
                <button
                  onClick={() => dislikeMovie(movie.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <AiFillDislike style={{ color: "red", fontSize: "22px" }} />
                  {movie.dislikes > 0 && (
                    <span style={{ color: "#fff" }}>{movie.dislikes}</span>
                  )}
                </button>

                {/* SAVE */}
                <button
                  className={
                    savedMovies.includes(movie.id)
                      ? "save-btn active"
                      : "save-btn"
                  }
                  onClick={() => saveMovie(movie)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {savedMovies.includes(movie.id) ? (
                    <BsBookmarkFill size={22} />
                  ) : (
                    <BsBookmark size={22} />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 },
          content: {
            background: "#000",
            border: "none",
            borderRadius: "12px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "1000px",
            height: "70vh",
            padding: 0,
          },
        }}
      >
        {trailerUrl && (
          <iframe
            width="100%"
            height="100%"
            src={trailerUrl}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </Modal>
    </div>
  );
}
