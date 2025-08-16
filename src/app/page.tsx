import React from "react";
import styles from "./Home.module.css";

const HomeSection: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        {/* Title */}
        <h1 className={styles.title}>
          Find Your <span className={styles.highlight}>Dream Job</span> Today
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Browse thousands of job listings from top companies, apply easily, and take your career to the next level.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for jobs, companies..."
            className={styles.input}
          />
          <button className={styles.button}>Search</button>
        </div>

        {/* Quick Categories */}
        <div className={styles.categories}>
          {["Development", "Design", "Marketing", "Data Science"].map((category) => (
            <div key={category} className={styles.categoryCard}>
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
