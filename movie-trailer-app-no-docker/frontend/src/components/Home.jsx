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






import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_BASE}/movies`);
        setMovies(res.data || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={homeStyle}>
      <div style={overlayStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          🎬 Welcome to Movie Trailer App
        </h1>

        {/* Popular Movies Grid */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading movies...</p>
        ) : movies.length === 0 ? (
          <p style={{ textAlign: "center" }}>No movies available.</p>
        ) : (
          <div style={gridStyle}>
            {movies.map((movie) => (
              <div key={movie.id} style={cardStyle}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  style={posterStyle}
                />
                <h3 style={titleStyle}>{movie.title}</h3>
                <button
                  style={trailerBtnStyle}
                  onClick={() =>
                    window.open(movie.trailer_url, "_blank", "noopener noreferrer")
                  }
                >
                  ▶ Play Trailer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const homeStyle = {
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1606761561903-8e349be5d177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "#fff",
  padding: "20px",
};

const overlayStyle = {
  backgroundColor: "rgba(0,0,0,0.6)",
  minHeight: "100vh",
  padding: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "rgba(34, 34, 34, 0.8)",
  borderRadius: "10px",
  overflow: "hidden",
  textAlign: "center",
  transition: "transform 0.2s",
  cursor: "pointer",
};

const posterStyle = {
  width: "100%",
  height: "270px",
  objectFit: "cover",
};

const titleStyle = {
  margin: "10px 0 5px",
  fontSize: "16px",
  color: "#fff",
};

const trailerBtnStyle = {
  marginBottom: "10px",
  backgroundColor: "#e50914",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
