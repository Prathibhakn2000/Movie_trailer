import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const API_BASE = "http://127.0.0.1:8000";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      const { access_token, role, username } = res.data;

      // Save token & role to AuthContext (and optionally localStorage)
      login(access_token, role);

      // Redirect based on role
      navigate(role === "admin" ? "/admin" : "/movies");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("⚠️ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#111",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    width: 320,
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", color: "#fff" },
  input: { marginBottom: 15, padding: 10, borderRadius: 6, border: "none" },
  button: {
    padding: 10,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#e50914",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  error: { color: "#ff5555", marginBottom: 10, textAlign: "center" },
  linkText: { marginTop: 15, textAlign: "center", color: "#fff" },
  link: { color: "#f5c518", fontWeight: 600, textDecoration: "none" },
};
