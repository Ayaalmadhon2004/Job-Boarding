"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./applyForm.module.css";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;  // هنا بفك الـ Promise بالـ useParams

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/jobs/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setSuccess("Application submitted successfully!");
      setError("");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => router.push("/"), 2000);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Apply for this job</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Message or cover letter"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit Application</button>
        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
