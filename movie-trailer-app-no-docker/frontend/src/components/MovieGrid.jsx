// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { FaPlay, FaStar, FaHeart } from "react-icons/fa";
// import "./MovieGrid.css";

// Modal.setAppElement("#root");

// const API_BASE = "http://127.0.0.1:8000";

// const LANGUAGES = [
//   { code: "en", label: "ENGLISH" },
//   { code: "hi", label: "HINDI" },
//   { code: "ta", label: "TAMIL" },
//   { code: "te", label: "TELUGU" },
//   { code: "ml", label: "MALAYALAM" },
//   { code: "kn", label: "KANNADA" },
// ];

// function MovieGrid({ token, role, onLogout }) {
//   const [movies, setMovies] = useState([]);   // ALWAYS an array
//   const [language, setLanguage] = useState("en");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [error, setError] = useState("");

//   // Normalize API response to array
//   const normalize = (data) => {
//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.results)) return data.results;
//     return [];
//   };

//   useEffect(() => {
//     role === "admin" ? fetchAdminMovies() : fetchMovies(language);
//   }, [language, role]);

//   // ⭐ STAR COMPONENT
//   const StarRating = ({ movieId, initialRating = 0, onRate }) => {
//     const [hoverRating, setHoverRating] = useState(null);
//     const [currentRating, setCurrentRating] = useState(initialRating);

//     return (
//       <div style={{ display: "flex", gap: "5px", marginTop: "6px" }}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
//           <FaStar
//             key={value}
//             size={22}
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

//   // ⭐ RATE MOVIE
//   const rateMovie = async (movieId, rating) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.put(
//       `${API_BASE}/movies/${movieId}/rating`,
//       { rating: Number(rating) },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Update movies state
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movieId ? { ...m, user_rating: res.data.user_rating } : m
//       )
//     );

//     alert("🎉 Rating saved!");
//   } catch (err) {
//     console.error("RATE ERROR:", err.response?.data || err);
//     alert("❌ Rating failed!");
//   }
// };


//   // 👑 ADMIN FETCH
//   const fetchAdminMovies = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/admin/saved-movies`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMovies(normalize(res.data));
//       setError("");
//     } catch (err) {
//       console.log(err);
//       setError("Failed to load admin movies.");
//       setMovies([]);
//     }
//   };

//   // 🌐 FETCH MOVIES BY LANGUAGE
// const fetchMovies = async (lang) => {
//   try {
//     const res = await axios.get(`${API_BASE}/movies`, { params: { lang } });
//     setMovies(res.data); // movies array
//     setError("");
//   } catch (err) {
//     setMovies([]);
//     setError("Failed to load movies.");
//   }
// };

// // Language buttons
// {LANGUAGES.map((lang) => (
//   <button
//     key={lang.code}
//     className={language === lang.code ? "active" : ""}
//     onClick={() => setLanguage(lang.code)} // will be 'te', 'hi', etc.
//   >
//     {lang.label}
//   </button>
// ))}


//   // 🔍 SEARCH MOVIES
//   const searchMovies = async () => {
//     if (!searchQuery.trim()) return;

//     try {
//       const res = await axios.get(
//         `${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`
//       );
//       setMovies(normalize(res.data));
//       setError("");
//     } catch (err) {
//       setMovies([]);
//       setError("Search failed.");
//     }
//   };

//   // ▶️ OPEN TRAILER
//   const openTrailer = async (movieId) => {
//   try {
//     setLoadingTrailer(true);
//     const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);

//     if (res.data?.youtube_url) {
//       setTrailerUrl(res.data.youtube_url);
//       setModalIsOpen(true);
//     } else {
//       alert("Trailer not found");
//     }
//   } catch {
//     alert("Trailer not found");
//   } finally {
//     setLoadingTrailer(false);
//   }
// };


//   // ❤️ SAVE MOVIE
//   const saveMovie = async (movie) => {
//     const token = localStorage.getItem("token"); // <-- use the same key as LoginPage
//   if (!token) {
//   alert("Please login first!");
//   return;
// }

//     try {
//       await axios.post(
//         `${API_BASE}/movies/save`,
//         {
//           movie_id: movie.id,
//           title: movie.title,
//           overview: movie.overview,
//           poster_path: movie.poster_path,
//           vote_average: movie.vote_average,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSavedMovies((prev) => [...prev, movie.id]);
//       alert("Movie saved!");
//     } catch (err) {
//       console.log("SAVE MOVIE ERROR:", err.response?.data || err);
//     }
//   };

//   return (
//     <div className="movie-page">
//       {/* <header className="header">
//         <h1>🎬 Movie Trailer App</h1>
//         <button onClick={onLogout} className="logout-btn">
//           {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ User Logout"}
//         </button>
//       </header>

//       {role === "admin" && (
//         <h2 style={{ textAlign: "center", color: "#e50914" }}>
//           All Saved Movies (Admin View)
//         </h2>
//       )} */}

//       {/* Language Tabs */}
//       {role !== "admin" && (
//         <div className="language-tabs">
//           {LANGUAGES.map((lang) => (
//             <button
//               key={lang.code}
//               className={language === lang.code ? "active" : ""}
//               onClick={() => setLanguage(lang.code)}
//             >
//               {lang.label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Search Bar */}
//       {role !== "admin" && (
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search movies..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button onClick={searchMovies}>Search</button>
//         </div>
//       )}

//       {error && <p className="error">{error}</p>}

//       {/* MOVIE GRID */}
//       <div className="movie-grid">
//         {movies.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
//         ) : (
//           movies.map((movie) => (
//             <div key={movie.id} className="movie-card">
//               <div className="poster-container">
//                 <img
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith("http")
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
//                       : "/no-poster.png"
//                   }
//                   alt={movie.title}
//                   className="poster"
//                 />
//                 <div className="overlay">
//                   <button
//                     className="play-btn"
//                     onClick={() => openTrailer(movie.id)}
//                   >
//                     <FaPlay />
//                   </button>
//                 </div>
//               </div>

//               <div className="movie-info">
//                 <h3>{movie.title}</h3>

//                 {/* ⭐ STAR RATING (USERS ONLY) */}
//                 {role !== "admin" && (
//                   <StarRating
//                     movieId={movie.id}
//                     initialRating={movie.user_rating || 0}
//                     onRate={rateMovie}
//                   />
//                 )}

//                 {/* ❤️ SAVE BUTTON */}
//                 {role !== "admin" && (
//                   <button
//                     className={
//                       savedMovies.includes(movie.id) ? "saved" : "save-btn"
//                     }
//                     onClick={() => saveMovie(movie)}
//                   >
//                     {savedMovies.includes(movie.id) ? (
//                       <>
//                         <FaHeart color="red" /> Saved
//                       </>
//                     ) : (
//                       <>
//                         <FaHeart /> Save
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* TRAILER MODAL */}
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
//         {loadingTrailer ? (
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
//             Loading trailer...
//           </p>
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
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
//             🚫 Trailer not available
//           </p>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default MovieGrid;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "react-modal";
// import { FaPlay, FaStar, FaHeart } from "react-icons/fa";
// import "./MovieGrid.css";
// // Add these imports at the top of the file
// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineLike,
//   AiOutlineDislike,
//   AiFillLike,
//   AiFillDislike
// } from "react-icons/ai";

// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";



// // ⭐ PUT THIS HERE
// const authHeader = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };


// Modal.setAppElement("#root");

// const API_BASE = "http://127.0.0.1:8000";

// const LANGUAGES = [
//   { code: "en", label: "ENGLISH" },
//   { code: "hi", label: "HINDI" },
//   { code: "ta", label: "TAMIL" },
//   { code: "te", label: "TELUGU" },
//   { code: "ml", label: "MALAYALAM" },
//   { code: "kn", label: "KANNADA" },
// ];

// function MovieGrid({ token, role, onLogout }) {
//  //console.log("TOKEN FROM MOVIEGRID:", token);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [movies, setMovies] = useState([]);   // ALWAYS an array
//   const [language, setLanguage] = useState("en");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [loadingTrailer, setLoadingTrailer] = useState(false);
//   //const [savedMovies, setSavedMovies] = useState([]);
//   const [error, setError] = useState("");
//   const [favorites, setFavorites] = useState([]);
//   const [likes, setLikes] = useState({});

//   const [currentMovie, setCurrentMovie] = useState(null); // movie object whose trailer is playing
//   const [favCounts, setFavCounts] = useState({});


  

//   // Normalize API response to array
//   const normalize = (data) => {
//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.results)) return data.results;
//     return [];
//   };

//   useEffect(() => {
//     role === "admin" ? fetchAdminMovies() : fetchMovies(language);
//   }, [language, role]);

// //   // ⭐ STAR COMPONENT
// //   const StarRating = ({ movieId, initialRating = 0, onRate }) => {
// //     const [hoverRating, setHoverRating] = useState(null);
// //     const [currentRating, setCurrentRating] = useState(initialRating);

// //     return (
// //       <div style={{ display: "flex", gap: "5px", marginTop: "6px" }}>
// //         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
// //           <FaStar
// //             key={value}
// //             size={22}
// //             color={(hoverRating || currentRating) >= value ? "#f5c518" : "#aaa"}
// //             style={{ cursor: "pointer" }}
// //             onMouseEnter={() => setHoverRating(value)}
// //             onMouseLeave={() => setHoverRating(null)}
// //             onClick={() => {
// //               setCurrentRating(value);
// //               onRate(movieId, value);
// //             }}
// //           />
// //         ))}
// //       </div>
// //     );
// //   };

// //   // ⭐ RATE MOVIE
// //   const rateMovie = async (movieId, rating) => {
// //   try {
// //     const token = localStorage.getItem("token");
// //     if (!token) return;

// //     const res = await axios.put(
// //       `${API_BASE}/movies/${movieId}/rating`,
// //       { rating: Number(rating) },
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );

// //     // Update movies state
// //     setMovies((prev) =>
// //       prev.map((m) =>
// //         m.id === movieId ? { ...m, user_rating: res.data.user_rating } : m
// //       )
// //     );

// //     alert("🎉 Rating saved!");
// //   } catch (err) {
// //     console.error("RATE ERROR:", err.response?.data || err);
// //     alert("❌ Rating failed!");
// //   }
// // };



// // ⭐ STAR COMPONENT
// const StarRating = ({ movieId, initialRating, onRate }) => {
//   const [hoverRating, setHoverRating] = React.useState(null);
//   const [currentRating, setCurrentRating] = React.useState(initialRating || 0);

//   // Sync rating if movies reload
//   React.useEffect(() => {
//     setCurrentRating(initialRating || 0);
//   }, [initialRating]);

//   return (
//     <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
//       {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
//         <FaStar
//           key={value}
//           size={20}
//           color={(hoverRating || currentRating) >= value ? "#f5c518" : "#aaa"}
//           style={{ cursor: "pointer" }}
//           onMouseEnter={() => setHoverRating(value)}
//           onMouseLeave={() => setHoverRating(null)}
//           onClick={() => {
//             setCurrentRating(value);   // instant UI update
//             onRate(movieId, value);    // send to backend
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const rateMovie = async (movieId, rating) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // UI update immediately (no delay)
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movieId ? { ...m, user_rating: rating } : m
//       )
//     );

//     const res = await axios.put(
//       `${API_BASE}/movies/${movieId}/rating`,
//       { rating: Number(rating) },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const finalRating = res?.data?.user_rating ?? rating;

//     // Final update from backend response
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movieId ? { ...m, user_rating: finalRating } : m
//       )
//     );
//   } catch (err) {
//     console.error("Rating Error:", err.response?.data || err);
//   }
// };





//   // 👑 ADMIN FETCH
//   const fetchAdminMovies = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/admin/saved-movies`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMovies(normalize(res.data));
//       setError("");
//     } catch (err) {
//       console.log(err);
//       setError("Failed to load admin movies.");
//       setMovies([]);
//     }
//   };

//   // 🌐 FETCH MOVIES BY LANGUAGE
// // const fetchMovies = async (lang) => {
// //   try {
// //     const res = await axios.get(`${API_BASE}/movies`, { params: { lang } });
// //     setMovies(res.data); // movies array
// //     setError("");
// //   } catch (err) {
// //     setMovies([]);
// //     setError("Failed to load movies.");
// //   }
// // };


// // const fetchMovies = async (lang) => {
// //   try {
// //     const res = await axios.get(`${API_BASE}/movies`, { params: { lang } });

// //     const moviesWithCounts = await Promise.all(
// //       res.data.map(async (movie) => {
// //         // 📌 1. Get Likes / Dislikes count
// //         const countRes = await axios.get(`${API_BASE}/movies/${movie.id}/likes-count`);

// //         // 📌 2. Get Favorite count
// //         const favCountRes = await axios.get(`${API_BASE}/movies/${movie.id}/favorite-count`);

// //         return {
// //           ...movie,
// //           likes: countRes.data.likes,
// //           dislikes: countRes.data.dislikes,
// //           favorite_count: favCountRes.data.count   // ✅ Add favorite count here
// //         };
// //       })
// //     );

// //     setMovies(moviesWithCounts);
// //     setError("");

// //   } catch (err) {
// //     console.log("Fetch movies error:", err);
// //     setMovies([]);
// //     setError("Failed to load movies.");
// //   }
// // };

// const fetchMovies = async (lang) => {
//   try {
//     const token = localStorage.getItem("token");
//     console.log("DEBUG token:", token);  // Shows the JWT token
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//     // 1️⃣ Fetch movies from backend
//     const res = await axios.get(`${API_BASE}/movies`, {
//       params: { lang },
//       headers,
//     });

//     console.log("DEBUG movies[0]:", res.data[0]);  // Shows the first movie object

//     // 2️⃣ Add likes, dislikes, and favorite counts
//     const moviesWithCounts = await Promise.all(
//       res.data.map(async (movie) => {
//         // Likes / Dislikes count
//         const countRes = await axios.get(`${API_BASE}/movies/${movie.id}/likes-count`, { headers });
        
//         // Favorite count
//         const favRes = await axios.get(`${API_BASE}/movies/${movie.id}/favorite-count`, { headers });

//         return {
//           ...movie,
//           likes: countRes.data.likes,
//           dislikes: countRes.data.dislikes,
//           favorite_count: favRes.data.count,
//         };
//       })
//     );

//     setMovies(moviesWithCounts);
//     setError("");

//   } catch (err) {
//     console.error("Fetch movies error:", err.response?.data || err);
//     setMovies([]);
//     setError("Failed to load movies.");
//   }
// };



// // Language buttons
// {LANGUAGES.map((lang) => (
//   <button
//     key={lang.code}
//     className={language === lang.code ? "active" : ""}
//     onClick={() => setLanguage(lang.code)} // will be 'te', 'hi', etc.
//   >
//     {lang.label}
//   </button>
// ))}


//   // 🔍 SEARCH MOVIES
//   const searchMovies = async () => {
//     if (!searchQuery.trim()) return;

//     try {
//       const res = await axios.get(
//         `${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`
//       );
//       setMovies(normalize(res.data));
//       setError("");
//     } catch (err) {
//       setMovies([]);
//       setError("Search failed.");
//     }
//   };

//   // ▶️ OPEN TRAILER
//   const openTrailer = async (movieId) => {
//   try {
//     setLoadingTrailer(true);
//     const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);

//     if (res.data?.youtube_url) {
//       setTrailerUrl(res.data.youtube_url);
//       setModalIsOpen(true);
//     } else {
//       alert("Trailer not found");
//     }
//   } catch {
//     alert("Trailer not found");
//   } finally {
//     setLoadingTrailer(false);
//   }
// };


//   // ❤️ SAVE MOVIE
//   const saveMovie = async (movie) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Please login first!");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       `${API_BASE}/movies/save`,
//       {
//         movie_id: movie.id,
//         title: movie.title,
//         overview: movie.overview,
//         poster_path: movie.poster_path,
//         vote_average: movie.vote_average,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     if (res.data.message === "Already saved") return;

//     setSavedMovies((prev) => {
//   const list = Array.isArray(prev) ? prev : [];
//   return [...list, movie.id];
// });
//   } catch (err) {
//     console.log("SAVE MOVIE ERROR:", err.response?.data || err);
//   }
// };



// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   // ✅ Fetch movies already saved by this user
//   const fetchSaved = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/user/saved-movies`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // FIX: force array and map movie objects → IDs
//       const savedIds = Array.isArray(res.data)
//         ? res.data.map(m => m.movie_id)
//         : Array.isArray(res.data.saved_movie_ids)
//           ? res.data.saved_movie_ids
//           : [];

//       setSavedMovies(savedIds);
//       console.log("📌 Saved movies loaded:", savedIds);
//     } catch (err) {
//       console.log("FETCH SAVED ERROR:", err.response?.data || err);
//     }
//   };

//   fetchSaved();
// }, []);



// //Favorites
// // const fetchFavorites = async () => {
// //   const token = localStorage.getItem("token");
// //   if (!token) return;

// //   try {
// //     const res = await axios.get(`${API_BASE}/user/favorites`, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });

// //     setFavoriteMovies(res.data);
// //   } catch (err) {
// //     console.log("FAVORITE FETCH ERROR:", err.response?.data || err);
// //   }
// // };

// //Favorites 
// const addFavorite = async (movie) => {
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

//     // toggle favorites list
//     setFavorites((prev) =>
//       prev.includes(movie.id)
//         ? prev.filter((id) => id !== movie.id)
//         : [...prev, movie.id]
//     );

//     // set favorite count using backend value
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movie.id
//           ? { ...m, favorite_count: res.data.favorite_count }
//           : m
//       )
//     );
//   } catch (err) {
//     console.error("FAVORITE ERROR:", err.response?.data || err);
//   }
// };



// //like
// const likeMovie = async (movie_id, isLike) => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/movies/like`,
//       {
//         movie_id: movie_id,
//         is_like: isLike,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // Update user like status
//     setLikes((prev) => ({ ...prev, [movie_id]: isLike }));

//     // Update like/dislike count for the movie
//     setMovies((prev) =>
//       prev.map((m) =>
//         m.id === movie_id
//           ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes }
//           : m
//       )
//     );
//   } catch (err) {
//     console.log("LIKE ERROR:", err);
//   }
// };



// //already favt and like
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       // Fetch favorites
//       const favRes = await axios.get(`${API_BASE}/user/favorites`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFavorites(favRes.data.favorites || []);

//       // Fetch likes
//       const likeRes = await axios.get(`${API_BASE}/user/likes`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLikes(likeRes.data.likes || {});
//     } catch (err) {
//       console.error("Failed to load user data:", err);
//     }
//   };

//   fetchUserData();
// }, [token]);



//   return (
//     <div className="movie-page">
      

//       {/* Language Tabs + Search Bar → sticky wrapper */}
// {role !== "admin" && (
//   <div className="sticky-header">
//     {/* Language Tabs */}
//     <div className="language-tabs">
//       {LANGUAGES.map((lang) => (
//         <button
//           key={lang.code}
//           className={language === lang.code ? "active" : ""}
//           onClick={() => setLanguage(lang.code)}
//         >
//           {lang.label}
//         </button>
//       ))}
//     </div>

//     {/* Search Bar */}
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search movies..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <button onClick={searchMovies}>Search</button>
//     </div>
//   </div>
// )}


//       {error && <p className="error">{error}</p>}

//       {/* MOVIE GRID */}
//       <div className="movie-grid">
//         {movies.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
//         ) : (
//          // movies.map((movie) => (
//           movies?.map((movie) => (
//             <div key={movie.id} className="movie-card">
//               <div className="poster-container">
//                 <img
//                   src={
//                     movie.poster_path
//                       ? movie.poster_path.startsWith("http")
//                         ? movie.poster_path
//                         : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
//                       : "/no-poster.png"
//                   }
//                   alt={movie.title}
//                   className="poster"
//                 />
//                 <div className="overlay">
//                   <button
//                     className="play-btn"
//                     onClick={() => openTrailer(movie.id)}
//                   >
//                     <FaPlay />
//                   </button>
//                 </div>
//               </div>

//               <div className="movie-info">
//                 <h3>{movie.title}</h3>

//                 {/* ⭐ STAR RATING (USERS ONLY) */}
//                 {/* ⭐ STAR RATING (USERS ONLY) */}
// {role !== "admin" && (
//   <StarRating
//     movieId={movie.id}
//     initialRating={movie.user_rating || 0}
//     onRate={rateMovie}
//   />
// )}


//        <div className="action-row">

//   {/* FAVORITE */}
//   <div className="yt-btn favorite-btn-wrapper">
//     <button
//       className={(favorites || []).includes(movie.id) ? "favorite-btn active" : "favorite-btn"}
//       onClick={() => addFavorite(movie)}
//     >
//       {(favorites || []).includes(movie.id)
//         ? <AiFillHeart className="fav-icon active" />
//         : <AiOutlineHeart className="fav-icon" />
//       }
//     </button>
//     <span className="count">{movie.favorite_count || 0}</span>
//   </div>

//   {/* LIKE */}
//   <div
//     className={likes[movie.id] === true ? "yt-btn like active" : "yt-btn like"}
//     onClick={() => likeMovie(movie.id, true)}
//   >
//     {likes[movie.id] === true
//       ? <AiFillLike className="icon" />
//       : <AiOutlineLike className="icon" />
//     }
//     <span className="count">{movie.likes}</span>
//   </div>

//   {/* DISLIKE */}
//   <div
//     className={likes[movie.id] === false ? "yt-btn dislike active" : "yt-btn dislike"}
//     onClick={() => likeMovie(movie.id, false)}
//   >
//     {likes[movie.id] === false
//       ? <AiFillDislike className="icon" />
//       : <AiOutlineDislike className="icon" />
//     }
//    <span className="count">{movie.dislikes}</span>
//   </div>

//   {/* SAVE → moved to END */}
//   {role !== "admin" && (
//     <button
//       className={(savedMovies || []).includes(movie.id) ? "save-btn active" : "save-btn"}
//       onClick={() => saveMovie(movie)}
//       disabled={(savedMovies || []).includes(movie.id)}
//     >
//       {(savedMovies || []).includes(movie.id)
//         ? <BsBookmarkFill className="save-icon active" />   // green when saved
//         : <BsBookmark className="save-icon" />              // white before saving
//       }
//     </button>
//   )}

// </div>

//               </div>
//             </div>
//           ))
//         )}
//       </div>



     

//       {/* TRAILER MODAL */}
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
//         {loadingTrailer ? (
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
//             Loading trailer...
//           </p>
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
//           <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>
//             🚫 Trailer not available
//           </p>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default MovieGrid;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaPlay, FaStar } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./MovieGrid.css";

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

function MovieGrid({ token, role, onLogout }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    role === "admin" ? fetchAdminMovies() : fetchMovies(language);
  }, [language, role]);

  // ⭐ STAR COMPONENT
  const StarRating = ({ movieId, initialRating, onRate }) => {
    const [hoverRating, setHoverRating] = React.useState(null);
    const [currentRating, setCurrentRating] = React.useState(initialRating || 0);

    React.useEffect(() => {
      setCurrentRating(initialRating || 0);
    }, [initialRating]);

    return (
      <div style={{ display: "flex", gap: "4px", marginTop: "6px" }}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
          <FaStar
            key={value}
            size={20}
            color={(hoverRating || currentRating) >= value ? "#f5c518" : "#aaa"}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => {
              setCurrentRating(value);
              onRate(movieId, value);
              const movie = movies.find(m => m.id === movieId);
              alert(`⭐ You rated "${movie?.title}" ${value}/10`);
            }}
          />
        ))}
      </div>
    );
  };

  const rateMovie = async (movieId, rating) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setMovies((prev) =>
        prev.map((m) =>
          m.id === movieId ? { ...m, user_rating: rating } : m
        )
      );

      const res = await axios.put(
        `${API_BASE}/movies/${movieId}/rating`,
        { rating: Number(rating) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const finalRating = res?.data?.user_rating ?? rating;

      setMovies((prev) =>
        prev.map((m) =>
          m.id === movieId ? { ...m, user_rating: finalRating } : m
        )
      );
    } catch (err) {
      console.error("Rating Error:", err.response?.data || err);
    }
  };

  const fetchAdminMovies = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/saved-movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(normalize(res.data));
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load admin movies.");
      setMovies([]);
    }
  };

  const fetchMovies = async (lang) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_BASE}/movies`, { params: { lang }, headers });
      const moviesWithCounts = await Promise.all(
        res.data.map(async (movie) => {
          const countRes = await axios.get(`${API_BASE}/movies/${movie.id}/likes-count`, { headers });
          const favRes = await axios.get(`${API_BASE}/movies/${movie.id}/favorite-count`, { headers });
          return { ...movie, likes: countRes.data.likes, dislikes: countRes.data.dislikes, favorite_count: favRes.data.count };
        })
      );
      setMovies(moviesWithCounts);
      setError("");
    } catch (err) {
      console.error("Fetch movies error:", err.response?.data || err);
      setMovies([]);
      setError("Failed to load movies.");
    }
  };

  const normalize = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  };

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(`${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`);
      setMovies(normalize(res.data));
      setError("");
    } catch (err) {
      setMovies([]);
      setError("Search failed.");
    }
  };

  const openTrailer = async (movieId) => {
    try {
      setLoadingTrailer(true);
      const res = await axios.get(`${API_BASE}/movies/${movieId}/trailer`);
      if (res.data?.youtube_url) {
        setTrailerUrl(res.data.youtube_url);
        setModalIsOpen(true);
      } else alert("Trailer not found");
    } catch {
      alert("Trailer not found");
    } finally {
      setLoadingTrailer(false);
    }
  };

  const saveMovie = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }
    try {
      const res = await axios.post(
        `${API_BASE}/movies/save`,
        { movie_id: movie.id, title: movie.title, overview: movie.overview, poster_path: movie.poster_path, vote_average: movie.vote_average },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Already saved") {
        // Already saved → show filled icon
        if (!savedMovies.includes(movie.id)) setSavedMovies(prev => [...prev, movie.id]);
        alert(`⚠️ "${movie.title}" is already in your watchlist.`);
        return;
      }

      setSavedMovies((prev) => [...prev, movie.id]);
      alert(`✅ "${movie.title}" saved to your watchlist!`);
    } catch (err) {
      console.log("SAVE MOVIE ERROR:", err.response?.data || err);
    }
  };

  const addFavorite = async (movie) => {
    try {
      const res = await axios.post(
        `${API_BASE}/movies/favorite`,
        { movie_id: movie.id, title: movie.title || "", poster_path: movie.poster_path || "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFavorites((prev) =>
        prev.includes(movie.id) ? prev.filter((id) => id !== movie.id) : [...prev, movie.id]
      );

      setMovies((prev) =>
        prev.map((m) => (m.id === movie.id ? { ...m, favorite_count: res.data.favorite_count } : m))
      );

      alert(`❤️ You ${favorites.includes(movie.id) ? "removed from" : "added to"} favorites: "${movie.title}"`);
    } catch (err) {
      console.error("FAVORITE ERROR:", err.response?.data || err);
    }
  };

  const likeMovie = async (movie_id, isLike) => {
    try {
      const res = await axios.post(
        `${API_BASE}/movies/like`,
        { movie_id, is_like: isLike },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikes((prev) => ({ ...prev, [movie_id]: isLike }));

      setMovies((prev) =>
        prev.map((m) =>
          m.id === movie_id ? { ...m, likes: res.data.likes, dislikes: res.data.dislikes } : m
        )
      );

      const movie = movies.find(m => m.id === movie_id);
      alert(isLike ? `👍 You liked "${movie?.title}"` : `👎 You disliked "${movie?.title}"`);
    } catch (err) {
      console.log("LIKE ERROR:", err);
    }
  };

  // ✅ Fetch saved movies from DB → mark as saved
  useEffect(() => {
    if (!token) return;
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/saved-movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const savedIds = Array.isArray(res.data)
          ? res.data.map(m => m.movie_id)
          : Array.isArray(res.data.saved_movie_ids)
            ? res.data.saved_movie_ids
            : [];
        setSavedMovies(savedIds);
      } catch (err) {
        console.log("FETCH SAVED ERROR:", err.response?.data || err);
      }
    };
    fetchSaved();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
      try {
        const favRes = await axios.get(`${API_BASE}/user/favorites`, { headers: { Authorization: `Bearer ${token}` } });
        setFavorites(favRes.data.favorites || []);
        const likeRes = await axios.get(`${API_BASE}/user/likes`, { headers: { Authorization: `Bearer ${token}` } });
        setLikes(likeRes.data.likes || {});
      } catch (err) {
        console.error("Failed to load user data:", err);
      }
    };
    fetchUserData();
  }, [token]);

  return (
    <div className="movie-page">
      {role !== "admin" && (
        <div className="sticky-header">
          <div className="language-tabs">
            {LANGUAGES.map((lang) => (
              <button key={lang.code} className={language === lang.code ? "active" : ""} onClick={() => setLanguage(lang.code)}>
                {lang.label}
              </button>
            ))}
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={searchMovies}>Search</button>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card" style={{ width: "220px" }}>
              <div className="poster-container">
                <img
                  src={movie.poster_path ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w342${movie.poster_path}`) : "/no-poster.png"}
                  alt={movie.title}
                  className="poster"
                />
                <div className="overlay">
                  <button className="play-btn" onClick={() => openTrailer(movie.id)}><FaPlay /></button>
                </div>
              </div>

              <div className="movie-info">
                <h3>{movie.title}</h3>
                {role !== "admin" && <StarRating movieId={movie.id} initialRating={movie.user_rating || 0} onRate={rateMovie} />}

                <div className="action-row">
                  <div className="yt-btn favorite-btn-wrapper">
                    <button className={favorites.includes(movie.id) ? "favorite-btn active" : "favorite-btn"} onClick={() => addFavorite(movie)}>
                      {favorites.includes(movie.id) ? <AiFillHeart className="fav-icon active" /> : <AiOutlineHeart className="fav-icon" />}
                    </button>
                    <span className="count" style={{ color: "#fff" }}>{movie.favorite_count || 0}</span>
                  </div>

                  <div className={likes[movie.id] === true ? "yt-btn like active" : "yt-btn like"} onClick={() => likeMovie(movie.id, true)}>
                    {likes[movie.id] === true ? <AiFillLike className="icon" /> : <AiOutlineLike className="icon" />}
                    <span className="count" style={{ color: "#fff" }}>{movie.likes}</span>
                  </div>

                  <div className={likes[movie.id] === false ? "yt-btn dislike active" : "yt-btn dislike"} onClick={() => likeMovie(movie.id, false)}>
                    {likes[movie.id] === false ? <AiFillDislike className="icon" /> : <AiOutlineDislike className="icon" />}
                    <span className="count" style={{ color: "#fff" }}>{movie.dislikes}</span>
                  </div>

                  {role !== "admin" && (
                    <button className={savedMovies.includes(movie.id) ? "save-btn active" : "save-btn"} onClick={() => saveMovie(movie)}>
                      {savedMovies.includes(movie.id) ? <BsBookmarkFill className="save-icon active" /> : <BsBookmark className="save-icon" />}
                    </button>
                  )}
                </div>
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
          content: { background: "#000", border: "none", borderRadius: "12px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: "1000px", height: "70vh", padding: 0 }
        }}
      >
        {loadingTrailer ? (
          <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>Loading trailer...</p>
        ) : trailerUrl ? (
          <iframe width="100%" height="100%" src={trailerUrl.replace("watch?v=", "embed/")} title="Trailer" allow="autoplay; encrypted-media" allowFullScreen />
        ) : (
          <p style={{ color: "#fff", textAlign: "center", padding: 20 }}>🚫 Trailer not available</p>
        )}
      </Modal>
    </div>
  );
}

export default MovieGrid;
