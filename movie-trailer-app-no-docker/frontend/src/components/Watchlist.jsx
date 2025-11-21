// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { FaStar, FaPlay } from "react-icons/fa";
// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineLike,
//   AiOutlineDislike,
//   AiFillLike,
//   AiFillDislike,
// } from "react-icons/ai";
// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import { useAuth } from "../AuthContext";

// Modal.setAppElement("#root");

// const API_BASE = "http://localhost:8000";

// export default function Watchlist() {
//   const { token } = useAuth();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);

//   // ⭐ Fetch watchlist
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       if (!token) return;
//       try {
//         const res = await axios.get(`${API_BASE}/watchlist`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Normalize response to array
//         const moviesArray = Array.isArray(res.data) ? res.data : [];
//         const normalized = moviesArray.map((m, idx) => ({
//           ...m,
//           id: m.id || m.movie_id || idx, // ensure unique id
//         }));
//         setMovies(normalized);
//       } catch (err) {
//         console.error("Failed to fetch watchlist:", err);
//         setMovies([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWatchlist();
//   }, [token]);

//   // ⭐ Fetch user likes and favorites
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!token) return;
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
//         console.error("Failed to fetch user data:", err);
//       }
//     };
//     fetchUserData();
//   }, [token]);

//   // ⭐ Open trailer modal
//   const openTrailer = async (movieId) => {
//     try {
//       setLoadingTrailer(true);
//       const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
//       if (res.data?.youtube_url) {
//         setTrailerUrl(res.data.youtube_url);
//         setModalIsOpen(true);
//       } else {
//         alert("Trailer not available");
//       }
//     } catch {
//       alert("Trailer not available");
//     } finally {
//       setLoadingTrailer(false);
//     }
//   };

//   // ⭐ Add/remove favorite
//   const addFavorite = async (movie) => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/movies/favorite`,
//       {
//         movie_id: movie.id,
//         title: movie.title || "",
//         poster_path: movie.poster_path || "",
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setFavorites((prev) =>
//       prev.includes(movie.id)
//         ? prev.filter((id) => id !== movie.id)
//         : [...prev, movie.id]
//     );

//     // update favorite count if backend returns
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movie.id
//           ? { ...m, favorite_count: res.data.favorite_count }
//           : m
//       )
//     );
//   } catch (err) {
//     console.error("Favorite error:", err.response?.data || err);
//   }
// };

//   // ⭐ Like/Dislike
//   const likeMovie = async (movieId, isLike) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/movies/like`,
//         { movie_id: movieId, is_like: isLike },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setLikes((prev) => ({ ...prev, [movieId]: isLike }));

//       setMovies((prev) =>
//         prev.map((m) =>
//           m.id === movieId ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes } : m
//         )
//       );
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };

//   // ⭐ Star Rating Component
//   const StarRating = ({ movieId, initialRating, onRate }) => {
//     const [hover, setHover] = useState(null);
//     const [rating, setRating] = useState(initialRating || 0);

//     useEffect(() => setRating(initialRating || 0), [initialRating]);

//     const handleRate = (value) => {
//       setRating(value);
//       onRate(movieId, value);
//     };

//     return (
//       <div style={{ display: "flex", gap: "4px", marginTop: 4 }}>
//         {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
//           <FaStar
//             key={val}
//             size={18}
//             color={val <= (hover || rating) ? "#f5c518" : "#aaa"}
//             style={{ cursor: "pointer" }}
//             onMouseEnter={() => setHover(val)}
//             onMouseLeave={() => setHover(null)}
//             onClick={() => handleRate(val)}
//           />
//         ))}
//       </div>
//     );
//   };

//   const rateMovie = async (movieId, rating) => {
//     try {
//       await axios.put(
//         `${API_BASE}/movies/${movieId}/rating`,
//         { rating },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMovies((prev) =>
//         prev.map((m) => (m.id === movieId ? { ...m, user_rating: rating } : m))
//       );
//     } catch (err) {
//       console.error("Rating error:", err);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "#fff", padding: 20 }}>
//       <h1 style={{ textAlign: "center", marginBottom: 20 }}>📺 Your Watchlist</h1>

//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading watchlist...</p>
//       ) : movies.length === 0 ? (
//         <p style={{ textAlign: "center" }}>No movies saved yet.</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//             gap: 20,
//           }}
//         >
//           {movies.map((movie) => (
//             <div key={movie.id} style={{ backgroundColor: "#222", borderRadius: 10, overflow: "hidden", textAlign: "center", cursor: "pointer" }}>
//               <div style={{ position: "relative" }}>
//                 <img
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith("http")
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
//                       : "/no-poster.png"
//                   }
//                   alt={movie.title}
//                   style={{ width: "100%", height: 270, objectFit: "cover" }}
//                 />
//                 <button
//                   onClick={() => openTrailer(movie.id)}
//                   style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     background: "rgba(0,0,0,0.6)",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "50%",
//                     padding: 10,
//                     cursor: "pointer",
//                   }}
//                 >
//                   <FaPlay />
//                 </button>
//               </div>
//               <h3 style={{ margin: "10px 0 5px" }}>{movie.title}</h3>
//               <StarRating movieId={movie.id} initialRating={movie.user_rating || 0} onRate={rateMovie} />

//               <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10, marginBottom: 10 }}>
//                 {/* Favorite */}
//                 <button onClick={() => addFavorite(movie)}>
//                   {favorites.includes(movie.id) ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
//                   <span style={{ marginLeft: 4 }}>{movie.favorite_count || 0}</span>
//                 </button>

//                 {/* Like */}
//                 <button onClick={() => likeMovie(movie.id, true)}>
//                   {likes[movie.id] === true ? <AiFillLike color="green" /> : <AiOutlineLike />}
//                   <span style={{ marginLeft: 4 }}>{movie.likes || 0}</span>
//                 </button>

//                 {/* Dislike */}
//                 <button onClick={() => likeMovie(movie.id, false)}>
//                   {likes[movie.id] === false ? <AiFillDislike color="red" /> : <AiOutlineDislike />}
//                   <span style={{ marginLeft: 4 }}>{movie.dislikes || 0}</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Trailer Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)}
//         style={{
//           overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 },
//           content: {
//             background: "#000",
//             border: "none",
//             borderRadius: 12,
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "90%",
//             maxWidth: 1000,
//             height: "70vh",
//             padding: 0,
//           },
//         }}
//       >
//         {loadingTrailer ? (
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>Loading trailer...</p>
//         ) : trailerUrl ? (
//           <iframe
//             width="100%"
//             height="100%"
//             src={trailerUrl.replace("watch?v=", "embed/")}
//             title="Trailer"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           />
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
// import { FaPlay } from "react-icons/fa";
// import {
//   AiOutlineHeart, AiFillHeart,
//   AiOutlineLike, AiFillLike,
//   AiOutlineDislike, AiFillDislike
// } from "react-icons/ai";
// import "./Watchlist.css";
// import { useAuth } from "../AuthContext";

// Modal.setAppElement("#root");

// const API_BASE = "http://localhost:8000";

// export default function Watchlist() {
//   const { token } = useAuth();
//   const [movies, setMovies] = useState([]);
//   const [favorites, setFavorites] = useState([]); 
//   const [likes, setLikes] = useState({}); 
//   const [loading, setLoading] = useState(true);

//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);

//   // 🟡 Load Watchlist
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/watchlist`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const arr = Array.isArray(res.data) ? res.data : [];

//         // Load counts for each movie
//         const moviesWithCounts = await Promise.all(
//           arr.map(async (m, idx) => {
//             const id = m.movie_id || m.id || idx;

//             const likeCount = await axios.get(`${API_BASE}/movies/${id}/likes-count`);
//             const favCount = await axios.get(`${API_BASE}/movies/${id}/favorite-count`);

//             return {
//               ...m,
//               id,
//               likes: likeCount.data.likes,
//               dislikes: likeCount.data.dislikes,
//               favorite_count: favCount.data.favorite_count
//             };
//           })
//         );
//         setMovies(moviesWithCounts);

//       } catch (err) {
//         console.error("WATCHLIST FETCH ERROR:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchWatchlist();
//   }, [token]);

//   // 🟡 Load user like & favorites
//   useEffect(() => {
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
//         console.error("User data load error:", err);
//       }
//     };

//     if (token) fetchUserData();
//   }, [token]);

//   // ❤️ Favorite Toggle
//   const addFavorite = async (movie) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/movies/favorite`,
//         { movie_id: movie.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFavorites(prev =>
//         prev.includes(movie.id)
//           ? prev.filter(id => id !== movie.id)
//           : [...prev, movie.id]
//       );

//       setMovies(prev =>
//         prev.map(m =>
//           m.id === movie.id
//             ? { ...m, favorite_count: res.data.favorite_count }
//             : m
//         )
//       );

//     } catch (err) {
//       console.error("Favorite Error:", err);
//     }
//   };

//   // 👍 Like / 👎 Dislike
//   const likeMovie = async (movieId, isLike) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/movies/like`,
//         { movie_id: movieId, is_like: isLike },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setLikes(prev => ({
//         ...prev,
//         [movieId]: prev[movieId] === isLike ? null : isLike,
//       }));

//       setMovies(prev =>
//         prev.map(m =>
//           m.id === movieId
//             ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes }
//             : m
//         )
//       );
//     } catch (err) {
//       console.error("Like Error:", err);
//     }
//   };

//   // ▶️ Trailer Modal
//   const openTrailer = async (movieId) => {
//     try {
//       setLoadingTrailer(true);
//       const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
//       setTrailerUrl(res.data.youtube_url || "");
//       setModalIsOpen(true);
//     } finally {
//       setLoadingTrailer(false);
//     }
//   };

//   return (
//     <div className="watchlist-page">
//       <h1 className="watchlist-title">📺 Your Watchlist</h1>

//       {loading ? (
//         <p className="loading-text">Loading...</p>
//       ) : movies.length === 0 ? (
//         <p className="empty-text">No movies saved yet.</p>
//       ) : (
//         <div className="movie-grid">
//           {movies.map(movie => (
//             <div key={movie.id} className="movie-card">
//               <div className="poster-container" onClick={() => openTrailer(movie.id)}>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
//                   className="poster"
//                   alt={movie.title}
//                 />
//                 <div className="overlay"><FaPlay className="play-btn" /></div>
//               </div>

//               <h3>{movie.title}</h3>
//               <div className="action-row">
//                 <button onClick={() => addFavorite(movie)} className="icon-btn">
//                   {favorites.includes(movie.id)
//                     ? <AiFillHeart className="icon red" />
//                     : <AiOutlineHeart className="icon" />}
//                   <span>{movie.favorite_count}</span>
//                 </button>

//                 <button onClick={() => likeMovie(movie.id, true)} className="icon-btn">
//                   {likes[movie.id] === true
//                     ? <AiFillLike className="icon green" />
//                     : <AiOutlineLike className="icon" />}
//                   <span>{movie.likes}</span>
//                 </button>

//                 <button onClick={() => likeMovie(movie.id, false)} className="icon-btn">
//                   {likes[movie.id] === false
//                     ? <AiFillDislike className="icon red" />
//                     : <AiOutlineDislike className="icon" />}
//                   <span>{movie.dislikes}</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
//         className="modal-content" overlayClassName="modal-overlay">
//         {loadingTrailer ? <p>Loading...</p> : (
//           <iframe width="100%" height="100%" src={trailerUrl?.replace("watch?v=", "embed/")} allowFullScreen />
//         )}
//       </Modal>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { FaPlay } from "react-icons/fa";
// import {
//   AiOutlineHeart, AiFillHeart,
//   AiOutlineLike, AiFillLike,
//   AiOutlineDislike, AiFillDislike
// } from "react-icons/ai";
// import "./Watchlist.css";
// import { useAuth } from "../AuthContext";

// Modal.setAppElement("#root");

// const API_BASE = "http://localhost:8000";

// export default function Watchlist() {
//   const { token } = useAuth();
//   const [movies, setMovies] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);

//   // 🔹 Load Watchlist
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/watchlist`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const moviesArray = Array.isArray(res.data) ? res.data : [];

//         // Load counts for each movie (likes, dislikes, favorites)
//         const moviesWithCounts = await Promise.all(
//           moviesArray.map(async (movie, index) => {
//             const id = movie.movie_id || movie.id || index;

//             const likeRes = await axios.get(`${API_BASE}/movies/${id}/likes-count`);
//             const favRes = await axios.get(`${API_BASE}/movies/${id}/favorite-count`);

//             return {
//               ...movie,
//               id,
//               likes: likeRes.data.likes || 0,
//               dislikes: likeRes.data.dislikes || 0,
//               favorite_count: favRes.data.count || 0,
//             };
//           })
//         );

//         setMovies(moviesWithCounts);
//       } catch (err) {
//         console.error("WATCHLIST FETCH ERROR:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchWatchlist();
//   }, [token]);

//   // 🔹 Load user favorites & like statuses
//   useEffect(() => {
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
//         console.error("USER DATA ERROR:", err);
//       }
//     };

//     if (token) fetchUserData();
//   }, [token]);

//   // ❤️ Toggle Favorite
//   const addFavorite = async (movieId) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/movies/favorite`,
//         { movie_id: movieId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setFavorites(prev =>
//         prev.includes(movieId)
//           ? prev.filter(id => id !== movieId)
//           : [...prev, movieId]
//       );

//       setMovies(prev =>
//         prev.map(m =>
//           m.id === movieId ? { ...m, favorite_count: res.data.favorite_count ?? res.data.count } : m
//         )
//       );
//     } catch (err) {
//       console.error("FAVORITE ERROR:", err);
//     }
//   };

//   // 👍 Like / 👎 Dislike Toggle
//   const likeMovie = async (movieId, isLike) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/movies/like`,
//         { movie_id: movieId, is_like: isLike },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setLikes(prev => ({
//         ...prev,
//         [movieId]: prev[movieId] === isLike ? null : isLike,
//       }));

//       setMovies(prev =>
//         prev.map(m =>
//           m.id === movieId
//             ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes }
//             : m
//         )
//       );
//     } catch (err) {
//       console.error("LIKE ERROR:", err);
//     }
//   };

//   // ▶️ Trailer Modal
//   const openTrailer = async (movieId) => {
//     try {
//       setLoadingTrailer(true);
//       const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
//       setTrailerUrl(res.data.youtube_url || "");
//       setModalIsOpen(true);
//     } finally {
//       setLoadingTrailer(false);
//     }
//   };

//   return (
//     <div className="watchlist-page">
//       <h1 className="watchlist-title">📺 Your Watchlist</h1>

//       {loading ? (
//         <p className="loading-text">Loading...</p>
//       ) : movies.length === 0 ? (
//         <p className="empty-text">No movies saved yet.</p>
//       ) : (
//         <div className="movie-grid">
//           {movies.map(movie => (
//             <div key={movie.id} className="movie-card">
//               <div className="poster-container" onClick={() => openTrailer(movie.id)}>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
//                   className="poster"
//                   alt={movie.title}
//                 />
//                 <div className="overlay"><FaPlay className="play-btn" /></div>
//               </div>

//               <h3>{movie.title}</h3>

//               <div className="action-row">
//                 <button onClick={() => addFavorite(movie.id)} className="icon-btn">
//                   {favorites.includes(movie.id)
//                     ? <AiFillHeart className="icon red" />
//                     : <AiOutlineHeart className="icon" />}
//                   <span>{movie.favorite_count || 0}</span>
//                 </button>

//                 <button onClick={() => likeMovie(movie.id, true)} className="icon-btn">
//                   {likes[movie.id] === true
//                     ? <AiFillLike className="icon green" />
//                     : <AiOutlineLike className="icon" />}
//                   <span>{movie.likes || 0}</span>
//                 </button>

//                 <button onClick={() => likeMovie(movie.id, false)} className="icon-btn">
//                   {likes[movie.id] === false
//                     ? <AiFillDislike className="icon red" />
//                     : <AiOutlineDislike className="icon" />}
//                   <span>{movie.dislikes || 0}</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
//         className="modal-content" overlayClassName="modal-overlay">
//         {loadingTrailer ? <p>Loading...</p> : (
//           <iframe width="100%" height="100%" src={trailerUrl?.replace("watch?v=", "embed/")} allowFullScreen />
//         )}
//       </Modal>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaPlay } from "react-icons/fa";
import {
  AiOutlineLike, AiFillLike,
  AiOutlineDislike, AiFillDislike
} from "react-icons/ai";
import "./Watchlist.css";
import { useAuth } from "../AuthContext";

Modal.setAppElement("#root");

const API_BASE = "http://localhost:8000";

export default function Watchlist() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);

  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // 🔹 Load Watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`${API_BASE}/watchlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const moviesArray = Array.isArray(res.data) ? res.data : [];

        // Load counts for each movie (likes, dislikes)
        const moviesWithCounts = await Promise.all(
          moviesArray.map(async (movie, index) => {
            const id = movie.movie_id || movie.id || index;

            const likeRes = await axios.get(`${API_BASE}/movies/${id}/likes-count`);

            return {
              ...movie,
              id,
              likes: likeRes.data.likes || 0,
              dislikes: likeRes.data.dislikes || 0,
            };
          })
        );

        setMovies(moviesWithCounts);
      } catch (err) {
        console.error("WATCHLIST FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchWatchlist();
  }, [token]);

  // 🔹 Load user like statuses
  useEffect(() => {
    const fetchUserLikes = async () => {
      try {
        const likeRes = await axios.get(`${API_BASE}/user/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(likeRes.data.likes || {});
      } catch (err) {
        console.error("USER LIKES ERROR:", err);
      }
    };

    if (token) fetchUserLikes();
  }, [token]);

  // 👍 Like / 👎 Dislike Toggle
  const likeMovie = async (movieId, isLike) => {
    try {
      const res = await axios.post(
        `${API_BASE}/movies/like`,
        { movie_id: movieId, is_like: isLike },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikes(prev => ({
        ...prev,
        [movieId]: prev[movieId] === isLike ? null : isLike,
      }));

      setMovies(prev =>
        prev.map(m =>
          m.id === movieId
            ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes }
            : m
        )
      );
    } catch (err) {
      console.error("LIKE ERROR:", err);
    }
  };

  // ▶️ Trailer Modal
 const openTrailer = async (movieId) => {
  try {
    setLoadingTrailer(true);
    const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);

    if (res.data?.youtube_url) {
      setTrailerUrl(res.data.youtube_url);
      setModalIsOpen(true);
    } else {
      alert("Trailer not found");
    }
  } catch {
    alert("Trailer not found");
  } finally {
    setLoadingTrailer(false);
  }
};

  return (
    <div className="watchlist-page">
      <h1 className="watchlist-title">📺 Your Watchlist</h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="empty-text">No movies saved yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="poster-container" onClick={() => openTrailer(movie.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  className="poster"
                  alt={movie.title}
                />
                <div className="overlay"><FaPlay className="play-btn" /></div>
              </div>

              <h3>{movie.title}</h3>

              <div className="action-row">
                {/* LIKE */}
                <button onClick={() => likeMovie(movie.id, true)} className="icon-btn">
                  {likes[movie.id] === true
                    ? <AiFillLike className="icon green" />
                    : <AiOutlineLike className="icon" />}
                  <span>{movie.likes || 0}</span>
                </button>

                {/* DISLIKE */}
                <button onClick={() => likeMovie(movie.id, false)} className="icon-btn">
                  {likes[movie.id] === false
                    ? <AiFillDislike className="icon red" />
                    : <AiOutlineDislike className="icon" />}
                  <span>{movie.dislikes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              {loadingTrailer ? (
                <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
                  Loading trailer...
                </p>
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
                <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
                  🚫 Trailer not available
                </p>
              )}
            </Modal>
    </div>
  );
}
