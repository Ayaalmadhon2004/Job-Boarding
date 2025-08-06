"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [catTerm, setCatTerm] = useState(""); 

  const router=useRouter();

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      console.log("API data:", data);

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

  // فلتر البحث
  const filteredJob = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // فلتر التصنيف
  const categoryFiltered = filteredJob.filter((job) =>
    catTerm ? job.type.toLowerCase().includes(catTerm.toLowerCase()) : true
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Jobs</h1>

      <div className={styles.filters}>
        {/* البحث */}
        <input
          type="text"
          placeholder="Search for jobs..."
          className={styles.search}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* الفئات */}
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

      {/* عرض الأخطاء */}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* إذا لا توجد نتائج */}
      {!error && categoryFiltered.length === 0 && (
        <p className={styles.noJobs}>No jobs available at the moment</p>
      )}

      {/* عرض الوظائف */}
      {!error && categoryFiltered.length > 0 && (
        <div className={styles.grid}>
          {categoryFiltered.map((job) => (
            <div key={job.id} className={styles.card}>
              <h2 className={styles.jobTitle}>{job.title}</h2>
              <p className={styles.jobDesc}>{job.description}</p>
              <small className={styles.date}>
                {new Date(job.createdAt).toLocaleDateString("en-US")}
              </small>
              <p className={styles.type}>{job.type}</p>
              <button type="submit" onClick={() => router.push(`/job/${job.id}`)}>View more</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
