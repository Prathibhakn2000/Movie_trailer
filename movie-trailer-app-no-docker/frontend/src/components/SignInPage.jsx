// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const API_BASE = "http://127.0.0.1:8000";

// export default function SignInPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${API_BASE}/login`,
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const { access_token, role, username } = res.data;

//       // Save to localStorage
//       localStorage.setItem("token", access_token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("username", username);

//       // Redirect
//       if (role === "admin") navigate("/admin");
//       else navigate("/movies");
//     } catch (err) {
//       console.error("Full login error:", err);
//       // Safely get error message
//       const message =
//         err.response?.data?.detail || err.response?.data || err.message || "Login failed!";
//       setError("⚠️ " + message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <h2 style={styles.title}>Sign In</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={styles.input}
//         />
//         {error && <p style={styles.error}>{error}</p>}
//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? "Signing in..." : "Login"}
//         </button>
//         <p style={{ marginTop: "15px" }}>
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: "#111",
//     color: "#fff",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   form: {
//     backgroundColor: "#1c1c1c",
//     padding: "30px",
//     borderRadius: "10px",
//     display: "flex",
//     flexDirection: "column",
//     width: "320px",
//   },
//   title: { fontSize: "24px", marginBottom: "20px", textAlign: "center" },
//   input: { marginBottom: "15px", padding: "10px", borderRadius: "6px", border: "none" },
//   button: {
//     backgroundColor: "#e50914",
//     color: "#fff",
//     padding: "10px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   error: { color: "#ff5555", textAlign: "center", marginBottom: "10px" },
// };
