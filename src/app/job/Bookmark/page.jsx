"use client";

import { useEffect, useState } from "react";
import styles from "./bookmark.module.css";

export default function BookmarkedJobsPage() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookedmark');
    if (savedBookmarks) {
      setBookmarkedJobs(JSON.parse(savedBookmarks));
    }
  }, []);

  if (bookmarkedJobs.length === 0) {
    return <p>No bookmarked jobs found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bookmarked Jobs</h1>
      <div className={styles.grid}>
        {bookmarkedJobs.map((job) => (
          <div key={job.id} className={styles.card}>
            <h2 className={styles.jobTitle}>{job.title}</h2>
            <small className={styles.date}>
              {new Date(job.createdAt).toLocaleDateString("en-US")}
            </small>
            <p className={styles.type}>{job.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
