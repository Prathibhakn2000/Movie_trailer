// import React from "react";
// import { useAuth } from "../AuthContext";

// export default function Header() {
//   const { role, logout } = useAuth(); // read role directly from context

//   return (
//     <header style={headerStyle}>
//       <h1>🎬 Movie Trailer App</h1>
//       {role && (
//         <button onClick={logout} style={logoutBtnStyle}>
//           {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
//         </button>
//       )}
//     </header>
//   );
// }

// const headerStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 20px",
//   backgroundColor: "#111",
//   color: "#fff",
// };

// const logoutBtnStyle = {
//   backgroundColor: "#e50914",
//   color: "#fff",
//   border: "none",
//   padding: "8px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
// };




import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={navStyle}>
      {/* Left: App Name */}
      <div style={leftStyle} onClick={() => navigate("/")} >
        🎬 <strong>Movie Trailer App</strong>
      </div>

      {/* Right: Sign In / Watchlist + Logout */}
      <div style={rightStyle}>
        {role ? (
          <>
            <button 
              style={btnStyle} 
              onClick={() => navigate("/watchlist")}
            >
              📺 Watchlist
            </button>
            <button 
              style={btnStyle} 
              onClick={logout}
            >
              {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
            </button>
          </>
        ) : (
          <button 
            style={btnStyle} 
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#111",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  fontSize: "18px",
};

const leftStyle = {
  cursor: "pointer",
};

const rightStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const btnStyle = {
  backgroundColor: "#f5c518",
  color: "#111",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};
