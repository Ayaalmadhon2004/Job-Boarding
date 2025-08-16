"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [catTerm, setCatTerm] = useState(""); 

  const router = useRouter();

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        setJobs(data);
        setError(null);
      } else if (data.error) {
        setJobs([]);
        setError(data.error);
      } else {
        setJobs([]);
        setError("Unexpected response format");
      }
    } catch (err) {
      setJobs([]);
      setError("Failed to fetch jobs");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter by search term
  const filteredJob = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category
  const categoryFiltered = filteredJob.filter((job) =>
    catTerm ? job.type.toLowerCase().includes(catTerm.toLowerCase()) : true
  );

  // Handle bookmark / add to cart
  const handleBookMark = (job) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const isAlreadyInCart = existingCart.some((item) => item.id === job.id);
    if (isAlreadyInCart) {
      alert("This job is already in your cart");
      return;
    }

    const updatedCart = [...existingCart, job];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Job added to cart");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Jobs</h1>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search for jobs..."
          className={styles.search}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          onChange={(e) => setCatTerm(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="web-development">Web development</option>
          <option value="mobile-development">Mobile development</option>
          <option value="ui-ux">UI/UX</option>
          <option value="desktop-development">Desktop development</option>
        </select>
      </div>

      {/* Error or no jobs */}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!error && categoryFiltered.length === 0 && (
        <p className={styles.noJobs}>No jobs available at the moment</p>
      )}

      {/* Jobs grid */}
      {!error && categoryFiltered.length > 0 && (
        <div className={styles.grid}>
          {categoryFiltered.map((job, index) => (
            <div key={job.id ?? index} className={styles.card}>
              <div className={styles.bookmark}>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <i
                  className="fa-solid fa-bookmark"
                  onClick={() => handleBookMark(job)}
                ></i>
              </div>
              <small className={styles.date}>
                {new Date(job.createdAt).toLocaleDateString("en-US")}
              </small>
              <p className={styles.type}>{job.type}</p>
              <button
                type="button"
                onClick={() => router.push(`/job/${job.id}`)}
              >
                View more
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
