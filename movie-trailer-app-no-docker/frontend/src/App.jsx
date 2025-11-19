// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./AuthContext";

// // Components
// import LoginPage from "./components/LoginPage";
// import Signup from "./components/Signup";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import MovieGrid from "./components/MovieGrid";
// import AdminPage from "./components/AdminPage"; // <<< new admin page


// function AppRoutes() {
//   const { token, role } = useAuth();

//   return (
//     <Routes>
//       {/* Login & Signup */}
//       <Route path="/login" element={!token ? <LoginPage /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />} />
//       <Route path="/signup" element={!token ? <Signup /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />} />

//       {/* Admin Page */}
//       <Route path="/admin" element={token && role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />

//       {/* Movies Page */}
//       {/* <Route path="/movies" element={token && role !== "admin" ? <MovieGrid /> : <Navigate to={role === "admin" ? "/admin" : "/login"} />} /> 
//       */}
//       <Route
//   path="/movies"
//   element={
//     token && role !== "admin" ? (
//       <MovieGrid token={token} role={role} />
//     ) : (
//       <Navigate to={role === "admin" ? "/admin" : "/login"} />
//     )
//   }
// />


//       {/* Default route */}
//       <Route path="/" element={<Navigate to={token ? (role === "admin" ? "/admin" : "/movies") : "/login"} />} />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Header />
//         <div style={{ flex: 1 }}>
//           <AppRoutes />
//         </div>
//         <Footer />
//       </Router>
//     </AuthProvider>
//   );
// }





// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// // Components
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import LoginPage from "./components/LoginPage";
// import Signup from "./components/Signup";
// import MovieGrid from "./components/MovieGrid";
// import AdminPage from "./components/AdminPage";

// export default function App() {
//   const { token, role } = useAuth();

//   return (
//     <>
//       <Header />  {/* Only here */}
//       <div style={{ flex: 1 }}>
//         <Routes>
//           <Route
//             path="/login"
//             element={!token ? <LoginPage /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />}
//           />
//           <Route
//             path="/signup"
//             element={!token ? <Signup /> : <Navigate to={role === "admin" ? "/admin" : "/movies"} />}
//           />
//           <Route
//             path="/admin"
//             element={token && role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/movies"
//             element={token && role !== "admin" ? <MovieGrid token={token} role={role} /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/"
//             element={<Navigate to={token ? (role === "admin" ? "/admin" : "/movies") : "/login"} />}
//           />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }




import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import MovieGrid from "./components/MovieGrid";
import AdminPage from "./components/AdminPage";
import Watchlist from "./components/Watchlist";

export default function App() {
  const { token, role } = useAuth();

  return (
    <>
      {/* Header is always visible */}
      <Header />

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public Home page */}
          <Route path="/" element={<Home />} />

          {/* Login page */}
          <Route
            path="/login"
            element={
              !token ? (
                <LoginPage />
              ) : (
                <Navigate to={role === "admin" ? "/admin" : "/movies"} />
              )
            }
          />

          {/* Signup page */}
          <Route
            path="/signup"
            element={
              !token ? (
                <Signup />
              ) : (
                <Navigate to={role === "admin" ? "/admin" : "/movies"} />
              )
            }
          />

          {/* Admin dashboard */}
          <Route
            path="/admin"
            element={
              token && role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Movies page for logged-in users */}
          <Route
            path="/movies"
            element={
              token && role !== "admin" ? (
                <MovieGrid token={token} role={role} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
  path="/watchlist"
  element={token ? <Watchlist /> : <Navigate to="/login" />}
/>

          {/* Catch-all: redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
