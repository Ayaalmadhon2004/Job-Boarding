"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./jobsDash.module.css";

export default function JobsDashboard() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("web-development"); 

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, type }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setType("web-development"); 
      fetchJobs();
    } else {
      alert("Can't put new job description");
    }
  };

  if (status === "loading") {
    return <p className={styles.loading}>Loading session...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Jobs Dashboard</h1>

      {session?.user?.role === "owner" && (
        <form onSubmit={handleAddJob} className={styles.form}>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title"
            required
          />

          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job description"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.select}
          >
            <option value="web-development">Web development</option>
            <option value="mobile-development">Mobile development</option>
            <option value="ui-ux">UiUx</option>
            <option value="desktop-development">Desktop development</option>
          </select>

          <button type="submit" className={styles.button}>
            Add Job
          </button>
        </form>
      )}

      <h2 className={styles.subHeader}>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className={styles.noJobs}>No jobs available at the moment</p>
      ) : (
        <ul className={styles.jobList}>
          {jobs.map((job) => (
            <li key={job.id} className={styles.jobCard}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <p className={styles.jobDesc}>{job.description}</p>
              <p className={styles.jobType}>
                <strong>Type:</strong> {job.type}
              </p>
              <small className={styles.date}>
                Published:{" "}
                {new Date(job.timePublished).toLocaleDateString("en-US")}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
