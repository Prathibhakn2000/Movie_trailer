// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const API_BASE = "http://127.0.0.1:8000";

// // export default function AdminPage() {
// //   const [movies, setMovies] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const token = localStorage.getItem("token"); // Admin token

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch all movies with ratings
// //         const moviesRes = await axios.get(`${API_BASE}/admin/movies`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setMovies(moviesRes.data);

// //         // Fetch all users
// //         const usersRes = await axios.get(`${API_BASE}/admin/users`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setUsers(usersRes.data);
// //       } catch (err) {
// //         console.error("Admin fetch error:", err.response?.data || err.message);
// //         setError("Failed to load admin data.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [token]);

// //   if (loading) return <p>Loading Admin Dashboard...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <div style={{ padding: "20px", color: "#fff", backgroundColor: "#111" }}>
// //       <h1>👑 Admin Dashboard</h1>

// //       <section style={{ marginTop: "30px" }}>
// //         <h2>All Users</h2>
// //         <table style={{ width: "100%", marginBottom: "30px", borderCollapse: "collapse" }}>
// //           <thead>
// //             <tr>
// //               <th style={thTdStyle}>ID</th>
// //               <th style={thTdStyle}>Username</th>
// //               <th style={thTdStyle}>Email</th>
// //               <th style={thTdStyle}>Role</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.map((u) => (
// //               <tr key={u.id}>
// //                 <td style={thTdStyle}>{u.id}</td>
// //                 <td style={thTdStyle}>{u.username}</td>
// //                 <td style={thTdStyle}>{u.email}</td>
// //                 <td style={thTdStyle}>{u.role}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         <h2>All Movies & Ratings</h2>
// //         <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //           <thead>
// //             <tr>
// //               <th style={thTdStyle}>ID</th>
// //               <th style={thTdStyle}>Title</th>
// //               <th style={thTdStyle}>User Ratings</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {movies.map((m) => (
// //               <tr key={m.id}>
// //                 <td style={thTdStyle}>{m.id}</td>
// //                 <td style={thTdStyle}>{m.title}</td>
// //                 <td style={thTdStyle}>
// //                   {m.ratings?.length
// //                     ? m.ratings.map((r) => `${r.username}: ${r.rating}`).join(", ")
// //                     : "No ratings"}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </section>
// //     </div>
// //   );
// // }

// // const thTdStyle = {
// //   border: "1px solid #555",
// //   padding: "8px",
// //   textAlign: "left",
// // };


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000";

// export default function AdminPage() {
//   const [movies, setMovies] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("users");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const moviesRes = await axios.get(`${API_BASE}/admin/movies`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMovies(moviesRes.data);

//         const usersRes = await axios.get(`${API_BASE}/admin/users`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersRes.data);
//       } catch (err) {
//         console.error("Admin fetch error:", err.response?.data || err.message);
//         setError("Failed to load admin data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   if (loading) return <p style={{ color: "#fff" }}>Loading Admin Dashboard...</p>;
//   if (error) return <p style={{ color: "#fff" }}>{error}</p>;

//   return (
//     <div style={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}>
      
//       {/** -------------------- LEFT SIDEBAR -------------------- */}
//       <aside style={sidebarStyle}>
//         <h2 style={logoStyle}>🎬 Admin</h2>

//         <nav style={{ marginTop: "40px" }}>
//           <p
//             style={activeTab === "users" ? activeLink : linkStyle}
//             onClick={() => setActiveTab("users")}
//           >
//             👤 Users
//           </p>
//           <p
//             style={activeTab === "movies" ? activeLink : linkStyle}
//             onClick={() => setActiveTab("movies")}
//           >
//             🎥 Movies
//           </p>
//           <p
//             style={activeTab === "stats" ? activeLink : linkStyle}
//             onClick={() => setActiveTab("stats")}
//           >
//             📊 Statistics
//           </p>
//         </nav>
//       </aside>

//       {/** -------------------- MAIN CONTENT -------------------- */}
//       <main style={mainContent}>
//         <h1 style={{ marginBottom: "20px" }}>
//           {activeTab === "users" ? "All Users" : activeTab === "movies" ? "Movies & Ratings" : "Dashboard Stats"}
//         </h1>

//         {activeTab === "users" && (
//           <UsersTable users={users} />
//         )}

//         {activeTab === "movies" && (
//           <MoviesTable movies={movies} />
//         )}

//         {activeTab === "stats" && (
//           <StatsSection movies={movies} users={users} />
//         )}
//       </main>
//     </div>
//   );
// }

// /** -------------------- USERS TABLE -------------------- */
// function UsersTable({ users }) {
//   return (
//     <table style={tableStyle}>
//       <thead>
//         <tr>
//           <th style={cell}>ID</th>
//           <th style={cell}>Username</th>
//           <th style={cell}>Email</th>
//           <th style={cell}>Role</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((u) => (
//           <tr key={u.id}>
//             <td style={cell}>{u.id}</td>
//             <td style={cell}>{u.username}</td>
//             <td style={cell}>{u.email}</td>
//             <td style={cell}>{u.role}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// /** -------------------- MOVIES TABLE -------------------- */
// function MoviesTable({ movies }) {
//   return (
//     <table style={tableStyle}>
//       <thead>
//         <tr>
//           <th style={cell}>ID</th>
//           <th style={cell}>Title</th>
//           <th style={cell}>Ratings</th>
//         </tr>
//       </thead>
//       <tbody>
//         {movies.map((m) => (
//           <tr key={m.id}>
//             <td style={cell}>{m.id}</td>
//             <td style={cell}>{m.title}</td>
//             <td style={cell}>
//               {m.ratings?.length
//                 ? m.ratings.map((r) => `${r.username}: ${r.rating}`).join(", ")
//                 : "No ratings"}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// /** -------------------- STATS SECTION -------------------- */
// function StatsSection({ movies, users }) {
//   return (
//     <div style={{ color: "#fff", fontSize: "20px" }}>
//       <p>👤 Total Users: {users.length}</p>
//       <p>🎬 Total Movies: {movies.length}</p>
//       <p>⭐ Total Ratings: {movies.reduce((sum, m) => sum + m.ratings?.length, 0)}</p>
//     </div>
//   );
// }

// /** -------------------- STYLES -------------------- */

// const sidebarStyle = {
//   width: "250px",
//   backgroundColor: "#1E1E1E",
//   padding: "20px",
//   color: "#fff",
//   boxShadow: "2px 0 5px rgba(0,0,0,0.4)",
// };

// const logoStyle = {
//   fontSize: "24px",
//   fontWeight: "bold",
// };

// const linkStyle = {
//   padding: "12px 10px",
//   cursor: "pointer",
//   fontSize: "18px",
//   color: "#ccc",
// };

// const activeLink = {
//   ...linkStyle,
//   backgroundColor: "#333",
//   color: "#fff",
//   borderRadius: "5px",
// };

// const mainContent = {
//   flex: 1,
//   padding: "40px",
//   color: "#fff",
//   overflowY: "auto",
// };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
// };

// const cell = {
//   border: "1px solid #555",
//   padding: "10px",
//   textAlign: "left",
// };
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function AdminPage() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesRes = await axios.get(`${API_BASE}/admin/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(moviesRes.data);

        const usersRes = await axios.get(`${API_BASE}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err.response?.data || err.message);
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading Admin Dashboard...</p>;
  if (error) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>{error}</p>;

  return (
    <div style={container}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h2 style={logoStyle}>🎬 Admin</h2>
        <nav style={{ marginTop: "40px" }}>
          <p style={activeTab === "users" ? activeLink : linkStyle} onClick={() => setActiveTab("users")}>👤 Users</p>
          <p style={activeTab === "movies" ? activeLink : linkStyle} onClick={() => setActiveTab("movies")}>🎥 Movies</p>
          <p style={activeTab === "stats" ? activeLink : linkStyle} onClick={() => setActiveTab("stats")}>📊 Stats</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={mainContent}>
        <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>
          {activeTab === "users" ? "All Users" : activeTab === "movies" ? "Movies & Ratings" : "Dashboard Stats"}
        </h1>

        {activeTab === "users" && <UsersTable users={users} />}
        {activeTab === "movies" && <MoviesTable movies={movies} />}
        {activeTab === "stats" && <StatsSection movies={movies} users={users} />}
      </main>
    </div>
  );
}

/** USERS TABLE */
function UsersTable({ users }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cell}>ID</th>
            <th style={cell}>Username</th>
            <th style={cell}>Email</th>
            <th style={cell}>Role</th>
            <th style={cell}>Saved Movies</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={cell}>{u.id}</td>
              <td style={cell}>{u.username}</td>
              <td style={cell}>{u.email}</td>
              <td style={cell}>{u.role}</td>
              <td style={cell}>{u.saved_movies_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** MOVIES TABLE */
function MoviesTable({ movies }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cell}>ID</th>
            <th style={cell}>Title</th>
            <th style={cell}>Ratings</th>
            <th style={cell}>👍 Likes</th>
            <th style={cell}>👎 Dislikes</th>
            <th style={cell}>❤️ Favorites</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td style={cell}>{m.id}</td>
              <td style={cell}>{m.title}</td>
              <td style={cell}>
                {m.ratings?.length
                  ? m.ratings.map((r) => `${r.username}: ${r.rating}`).join(", ")
                  : "No ratings"}
              </td>
              <td style={badgeCell}>
                <span style={{ ...badge, backgroundColor: "#4caf50" }}>{m.likes || 0}</span>
              </td>
              <td style={badgeCell}>
                <span style={{ ...badge, backgroundColor: "#f44336" }}>{m.dislikes || 0}</span>
              </td>
              <td style={badgeCell}>
                <span style={{ ...badge, backgroundColor: "#ff4081" }}>{m.favorite_count || 0}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** STATS SECTION */
function StatsSection({ movies, users }) {
  const totalMovies = movies.length;
  const totalUsers = users.length;
  const topRated = [...movies]
    .sort((a, b) => {
      const aAvg = a.ratings?.length ? a.ratings.reduce((sum, r) => sum + r.rating, 0)/a.ratings.length : 0;
      const bAvg = b.ratings?.length ? b.ratings.reduce((sum, r) => sum + r.rating, 0)/b.ratings.length : 0;
      return bAvg - aAvg;
    })
    .slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <p>Total Users: <strong>{totalUsers}</strong></p>
      <p>Total Movies: <strong>{totalMovies}</strong></p>
      <h3>Top Rated Movies</h3>
      <ul>
        {topRated.map(m => (
          <li key={m.id}>{m.title} ({m.ratings?.length ? (m.ratings.reduce((sum,r)=>sum+r.rating,0)/m.ratings.length).toFixed(1) : 0})</li>
        ))}
      </ul>
    </div>
  );
}

/** STYLES */
const container = {
  display: "flex",
  height: "100vh",
  backgroundColor: "#121212",
  color: "#fff",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const sidebarStyle = {
  width: "220px",
  background: "#1f1f1f",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s",
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
};

const linkStyle = {
  padding: "12px 0",
  cursor: "pointer",
  color: "#aaa",
  transition: "color 0.2s",
};

const activeLink = {
  ...linkStyle,
  color: "#fff",
  fontWeight: "bold",
};

const mainContent = {
  flex: 1,
  padding: "30px",
  overflowY: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "700px",
};

const cell = {
  border: "1px solid #333",
  padding: "10px",
  textAlign: "left",
};

const badgeCell = {
  border: "1px solid #333",
  padding: "8px",
  textAlign: "center",
};

const badge = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "20px",
  color: "#fff",
  fontWeight: "bold",
  minWidth: "35px",
};
