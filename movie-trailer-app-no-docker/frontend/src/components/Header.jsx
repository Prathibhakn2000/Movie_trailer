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




// import React from "react";
// import { useAuth } from "../AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const { role, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <nav style={navStyle}>
//       {/* Left: App Name */}
//       <div style={leftStyle} onClick={() => navigate("/")} >
//         🎬 <strong>Movie Trailer App</strong>
//       </div>

//       {/* Right: Sign In / Watchlist + Logout */}
//       <div style={rightStyle}>
//         {role ? (
//           <>
//             <button 
//               style={btnStyle} 
//               onClick={() => navigate("/watchlist")}
//             >
//               📺 Watchlist
//             </button>
//             <button 
//               style={btnStyle} 
//               onClick={logout}
//             >
//               {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
//             </button>
//           </>
//         ) : (
//           <button 
//             style={btnStyle} 
//             onClick={() => navigate("/login")}
//           >
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Styles
// const navStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 20px",
//   backgroundColor: "#111",
//   color: "#fff",
//   position: "sticky",
//   top: 0,
//   zIndex: 1000,
//   fontSize: "18px",
// };

// const leftStyle = {
//   cursor: "pointer",
// };

// const rightStyle = {
//   display: "flex",
//   gap: "10px",
//   alignItems: "center",
// };

// const btnStyle = {
//   backgroundColor: "#f5c518",
//   color: "#111",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };


// import React from "react";
// import { useAuth } from "../AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const { role, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation(); // to know current page

//   return (
//     <nav style={navStyle}>
//       {/* Left: App Name */}
//       <div style={leftStyle} onClick={() => navigate("/")}>
//         🎬 <strong>Movie Trailer App</strong>
//       </div>

//       {/* Right: Buttons */}
//       <div style={rightStyle}>
//         {role ? (
//           <>
//             {/* Show watchlist only for non-admin users and if not already on watchlist page */}
//             {role !== "admin" && location.pathname !== "/watchlist" && (
//               <button
//                 style={btnStyle}
//                 onClick={() => navigate("/watchlist")}
//               >
//                 📺 Watchlist
//               </button>
//             )}

//             <button style={btnStyle} onClick={logout}>
//               {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
//             </button>
//           </>
//         ) : (
//           <button style={btnStyle} onClick={() => navigate("/login")}>
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Styles
// const navStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 20px",
//   backgroundColor: "#111",
//   color: "#fff",
//   position: "sticky",
//   top: 0,
//   zIndex: 1000,
//   fontSize: "18px",
// };

// const leftStyle = {
//   cursor: "pointer",
// };

// const rightStyle = {
//   display: "flex",
//   gap: "10px",
//   alignItems: "center",
// };

// const btnStyle = {
//   backgroundColor: "#f5c518",
//   color: "#111",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontWeight: "bold",
// };


// import React from "react";
// import { useAuth } from "../AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const { role, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation(); // to know current page

//   return (
//     <nav style={navStyle}>
//       {/* Left: App Name */}
//       <div style={leftStyle} onClick={() => navigate("/")}>
//         🎬 <strong>Movie Trailer App</strong>
//       </div>

//       {/* Right: Buttons */}
//       <div style={rightStyle}>
//         {role ? (
//           <>
//             {/* Show watchlist only for non-admin users and if not already on watchlist page */}
//             {role !== "admin" && location.pathname !== "/watchlist" && (
//               <button
//                 style={btnStyle}
//                 onClick={() => navigate("/watchlist")}
//               >
//                 📺 Watchlist
//               </button>
//             )}

//             <button style={btnStyle} onClick={logout}>
//               {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
//             </button>
//           </>
//         ) : (
//           <button style={btnStyle} onClick={() => navigate("/login")}>
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// // Styles
// const navStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "10px 20px",
//   backgroundColor: "#0d1b2a", // Dark Blue
//   color: "#fff",
//   position: "sticky",
//   top: 0,
//   zIndex: 1000,
//   fontSize: "18px",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
// };

// const leftStyle = {
//   cursor: "pointer",
//   color: "#f0e130", // bright yellow for app name
// };

// const rightStyle = {
//   display: "flex",
//   gap: "10px",
//   alignItems: "center",
// };

// const btnStyle = {
//   backgroundColor: "#f0e130", // bright yellow
//   color: "#0d1b2a", // dark blue text
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: "6px",
//   cursor: "pointer",
//   fontWeight: "bold",
//   transition: "transform 0.2s, background-color 0.2s",
// };

import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State for adding shadow when scrolling
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        ...navStyle,
        boxShadow: scrolled
          ? "0 4px 12px rgba(0,0,0,0.6)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Left: App Name */}
      <div style={leftStyle} onClick={() => navigate("/")}>
        🎬 <strong>Movie Trailer App</strong>
      </div>

      {/* Right: Buttons */}
      <div style={rightStyle}>
        {role ? (
          <>
            {role !== "admin" && location.pathname !== "/watchlist" && (
              <button style={btnStyle} onClick={() => navigate("/watchlist")}>
                📺 Watchlist
              </button>
            )}
            <button style={btnStyle} onClick={logout}>
              {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
            </button>
          </>
        ) : (
          <button style={btnStyle} onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

// ----------------- STYLES -----------------
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#0d1b2a", // Dark Blue
  color: "#fff",
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 1000,
  fontSize: "18px",
  transition: "box-shadow 0.3s ease",
};

const leftStyle = {
  cursor: "pointer",
  color: "#f0e130", // Bright yellow
  fontSize: "20px",
};

const rightStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const btnStyle = {
  backgroundColor: "#f0e130", // Bright yellow
  color: "#0d1b2a", // Dark blue text
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "transform 0.2s, background-color 0.2s",
};

