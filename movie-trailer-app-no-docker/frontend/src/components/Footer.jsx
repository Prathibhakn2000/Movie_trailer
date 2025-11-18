import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Movie Trailer App. All rights reserved.</p>
      <p>
        <a href="/signin" style={styles.link}>Sign In</a> | <a href="/signup" style={styles.link}>Sign Up</a>
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
  },
  link: {
    color: "#f5c518",
    textDecoration: "none",
    margin: "0 5px",
  },
};
