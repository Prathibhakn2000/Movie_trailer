import React from "react";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { role, logout } = useAuth(); // read role directly from context

  return (
    <header style={headerStyle}>
      <h1>🎬 Movie Trailer App</h1>
      {role && (
        <button onClick={logout} style={logoutBtnStyle}>
          {role === "admin" ? "👑 Admin Logout" : "🙋‍♂️ Logout"}
        </button>
      )}
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#111",
  color: "#fff",
};

const logoutBtnStyle = {
  backgroundColor: "#e50914",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
