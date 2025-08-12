// src/components/HomeSection.tsx
import React from "react";

const HomeSection: React.FC = () => {
  return (
    <section style={styles.container}>
      <div style={styles.inner}>
        {/* Title */}
        <h1 style={styles.title}>
          Find Your <span style={styles.highlight}>Dream Job</span> Today
        </h1>

        {/* Subtitle */}
        <p style={styles.subtitle}>
          Browse thousands of job listings from top companies, apply easily, and take your career to the next level.
        </p>

        {/* Search Bar */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for jobs, companies..."
            style={styles.input}
          />
          <button style={styles.button}>Search</button>
        </div>

        {/* Quick Categories */}
        <div style={styles.categories}>
          {["Development", "Design", "Marketing", "Data Science"].map((category) => (
            <div key={category} style={styles.categoryCard}>
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f9fbfc",
    padding: "60px 20px",
    fontFamily: "Poppins, sans-serif",
  },
  inner: {
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#065084",
    marginBottom: "15px",
  },
  highlight: {
    color: "#ff7f50",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    maxWidth: "600px",
    margin: "0 auto 30px",
    lineHeight: "1.6",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "300px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#065084",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginTop: "30px",
  },
  categoryCard: {
    backgroundColor: "#fff",
    padding: "15px 10px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    cursor: "pointer",
    fontWeight: 500,
    color: "#065084",
    transition: "transform 0.2s ease",
    textAlign: "center",
  },
};

export default HomeSection;
