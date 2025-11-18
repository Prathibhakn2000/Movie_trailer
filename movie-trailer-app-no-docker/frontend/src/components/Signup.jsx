// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const API_BASE = "http://127.0.0.1:8000";

// function SignupPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);

//   // handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // ✅ Send JSON (matches FastAPI backend)
//       const res = await axios.post(`${API_BASE}/signup`, {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       });

//       alert("✅ Signup successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup error:", err);
//       if (err.response) {
//         alert(`⚠️ ${err.response.data.detail || "Signup failed"}`);
//       } else {
//         alert("⚠️ Network or server error. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* <h1 style={styles.title}>🎬 Movie App — Signup</h1> */}
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

        

//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? "Signing up..." : "Sign Up"}
//         </button>
//       </form>

      
//     </div>
//   );
// }

// // 🎨 Styling
// const styles = {
//   container: {
//     backgroundColor: "#111",
//     color: "#fff",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     color: "#e50914",
//     marginBottom: "20px",
//   },
//   form: {
//     backgroundColor: "#1c1c1c",
//     padding: "30px",
//     borderRadius: "10px",
//     display: "flex",
//     flexDirection: "column",
//     width: "300px",
//   },
//   input: {
//     marginBottom: "15px",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "none",
//   },
//   select: {
//     marginBottom: "15px",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "none",
//     backgroundColor: "#222",
//     color: "#fff",
//   },
//   button: {
//     backgroundColor: "#e50914",
//     color: "#fff",
//     padding: "10px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   link: {
//     color: "#e50914",
//     textDecoration: "none",
//   },
// };

// export default SignupPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/signup`, {
  username: formData.username,
  email: formData.email,
  password: formData.password,
  role: "user", // or formData.role if you allow selection
}, {
  headers: { "Content-Type": "application/json" }
});
      alert("✅ Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data);

      if (err.response && err.response.data.detail) {
        if (Array.isArray(err.response.data.detail)) {
          alert(err.response.data.detail.map((e) => e.msg).join(", "));
        } else {
          alert(err.response.data.detail);
        }
      } else {
        alert("⚠️ Network or server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

// Dark theme styles
const styles = {
  container: {
    backgroundColor: "#111",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#1c1c1c",
    padding: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    backgroundColor: "#e50914",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default SignupPage;
