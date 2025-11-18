import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export default function AdminPage() {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // Admin token

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all movies with ratings
        const moviesRes = await axios.get(`${API_BASE}/admin/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(moviesRes.data);

        // Fetch all users
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

  if (loading) return <p>Loading Admin Dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#111" }}>
      <h1>👑 Admin Dashboard</h1>

      <section style={{ marginTop: "30px" }}>
        <h2>All Users</h2>
        <table style={{ width: "100%", marginBottom: "30px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Username</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={thTdStyle}>{u.id}</td>
                <td style={thTdStyle}>{u.username}</td>
                <td style={thTdStyle}>{u.email}</td>
                <td style={thTdStyle}>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>All Movies & Ratings</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Title</th>
              <th style={thTdStyle}>User Ratings</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td style={thTdStyle}>{m.id}</td>
                <td style={thTdStyle}>{m.title}</td>
                <td style={thTdStyle}>
                  {m.ratings?.length
                    ? m.ratings.map((r) => `${r.username}: ${r.rating}`).join(", ")
                    : "No ratings"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const thTdStyle = {
  border: "1px solid #555",
  padding: "8px",
  textAlign: "left",
};
