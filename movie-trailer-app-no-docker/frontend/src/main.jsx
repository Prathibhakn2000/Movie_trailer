// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App'
// import './styles.css'
// createRoot(document.getElementById('root')).render(<App />)


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./styles.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

