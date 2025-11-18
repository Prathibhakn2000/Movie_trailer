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



import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaPlay, FaStar, FaHeart } from "react-icons/fa";
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
  const [movies, setMovies] = useState([]);   // ALWAYS an array
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [error, setError] = useState("");

  // Normalize API response to array
  const normalize = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  };

  useEffect(() => {
    role === "admin" ? fetchAdminMovies() : fetchMovies(language);
  }, [language, role]);

  // ⭐ STAR COMPONENT
  const StarRating = ({ movieId, initialRating = 0, onRate }) => {
    const [hoverRating, setHoverRating] = useState(null);
    const [currentRating, setCurrentRating] = useState(initialRating);

    return (
      <div style={{ display: "flex", gap: "5px", marginTop: "6px" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <FaStar
            key={value}
            size={22}
            color={(hoverRating || currentRating) >= value ? "#f5c518" : "#aaa"}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => {
              setCurrentRating(value);
              onRate(movieId, value);
            }}
          />
        ))}
      </div>
    );
  };

  // ⭐ RATE MOVIE
  const rateMovie = async (movieId, rating) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.put(
      `${API_BASE}/movies/${movieId}/rating`,
      { rating: Number(rating) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update movies state
    setMovies((prev) =>
      prev.map((m) =>
        m.id === movieId ? { ...m, user_rating: res.data.user_rating } : m
      )
    );

    alert("🎉 Rating saved!");
  } catch (err) {
    console.error("RATE ERROR:", err.response?.data || err);
    alert("❌ Rating failed!");
  }
};


  // 👑 ADMIN FETCH
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

  // 🌐 FETCH MOVIES BY LANGUAGE
const fetchMovies = async (lang) => {
  try {
    const res = await axios.get(`${API_BASE}/movies`, { params: { lang } });
    setMovies(res.data); // movies array
    setError("");
  } catch (err) {
    setMovies([]);
    setError("Failed to load movies.");
  }
};

// Language buttons
{LANGUAGES.map((lang) => (
  <button
    key={lang.code}
    className={language === lang.code ? "active" : ""}
    onClick={() => setLanguage(lang.code)} // will be 'te', 'hi', etc.
  >
    {lang.label}
  </button>
))}


  // 🔍 SEARCH MOVIES
  const searchMovies = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get(
        `${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`
      );
      setMovies(normalize(res.data));
      setError("");
    } catch (err) {
      setMovies([]);
      setError("Search failed.");
    }
  };

  // ▶️ OPEN TRAILER
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


  // ❤️ SAVE MOVIE
  const saveMovie = async (movie) => {
    const token = localStorage.getItem("token"); // <-- use the same key as LoginPage
  if (!token) {
  alert("Please login first!");
  return;
}

    try {
      await axios.post(
        `${API_BASE}/movies/save`,
        {
          movie_id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSavedMovies((prev) => [...prev, movie.id]);
      alert("Movie saved!");
    } catch (err) {
      console.log("SAVE MOVIE ERROR:", err.response?.data || err);
    }
  };

// ✅ Fetch movies already saved by this user
const fetchSavedMovies = async () => {
  if (!token) return;
  try {
    const res = await axios.get(`${API_BASE}/movies/saved-by-user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Assuming API returns array of movie_ids
    setSavedMovies(res.data.map((m) => m.movie_id));
  } catch (err) {
    console.error("Error fetching saved movies:", err);
  }
};

useEffect(() => {
  if (role !== "admin") fetchSavedMovies();
}, [role, token]);



  return (
    <div className="movie-page">
      {/* <header className="header">
        <h1>🎬 Movie Trailer App</h1>
        <button onClick={onLogout} className="logout-btn">
          {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ User Logout"}
        </button>
      </header>

      {role === "admin" && (
        <h2 style={{ textAlign: "center", color: "#e50914" }}>
          All Saved Movies (Admin View)
        </h2>
      )} */}

      {/* Language Tabs */}
      {role !== "admin" && (
        <div className="language-tabs">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={language === lang.code ? "active" : ""}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {role !== "admin" && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={searchMovies}>Search</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* MOVIE GRID */}
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>No movies found</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="poster-container">
                <img
                  src={
                    movie.poster_path
                      ? movie.poster_path.startsWith("http")
                        ? movie.poster_path
                        : `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                      : "/no-poster.png"
                  }
                  alt={movie.title}
                  className="poster"
                />
                <div className="overlay">
                  <button
                    className="play-btn"
                    onClick={() => openTrailer(movie.id)}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>

              <div className="movie-info">
                <h3>{movie.title}</h3>

                {/* ⭐ STAR RATING (USERS ONLY) */}
                {role !== "admin" && (
                  <StarRating
                    movieId={movie.id}
                    initialRating={movie.user_rating || 0}
                    onRate={rateMovie}
                  />
                )}

                {/* ❤️ SAVE BUTTON */}
                {role !== "admin" && (
                  <button
                    className={
                      savedMovies.includes(movie.id) ? "saved" : "save-btn"
                    }
                    onClick={() => saveMovie(movie)}
                  >
                    {savedMovies.includes(movie.id) ? (
                      <>
                        <FaHeart color="red" /> Saved
                      </>
                    ) : (
                      <>
                        <FaHeart /> Save
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* TRAILER MODAL */}
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

export default MovieGrid;

