import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

// Components
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieGrid from "./components/MovieGrid";
import AdminPage from "./components/AdminPage"; // <<< new admin page


function AppRoutes() {
  const { token, role } = useAuth();

  return (
    <Routes>
      {/* Login & Signup */}
      <Route path="/login" element={!token ? <LoginPage /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />} />

      {/* Admin Page */}
      <Route path="/admin" element={token && role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />

      {/* Movies Page */}
      {/* <Route path="/movies" element={token && role !== "admin" ? <MovieGrid /> : <Navigate to={role === "admin" ? "/admin" : "/login"} />} /> 
      */}
      <Route
  path="/movies"
  element={
    token && role !== "admin" ? (
      <MovieGrid token={token} role={role} />
    ) : (
      <Navigate to={role === "admin" ? "/admin" : "/login"} />
    )
  }
/>


      {/* Default route */}
      <Route path="/" element={<Navigate to={token ? (role === "admin" ? "/admin" : "/movies") : "/login"} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ flex: 1 }}>
          <AppRoutes />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
