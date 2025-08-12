"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./applyForm.module.css";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [matchMessage, setMatchMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!skills.trim()) {
      setError("Please describe your skills.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("skills", skills);

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply-with-resume`, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Response is not valid JSON or is empty.");
        setSuccess("");
        setMatchMessage("");
        return;
      }

      if (res.ok) {
        setSuccess("Application submitted successfully!");
        setMatchMessage(
          data.match
            ? "🎯 Your skills match this job!"
            : "⚠️ Your skills don't match perfectly."
        );
        setError("");

        if (data.match) {
          alert("🎉 Congratulations! Your skills match the job requirements.");
        }

        setName("");
        setEmail("");
        setMessage("");
        setSkills("");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setError(data.error || "Something went wrong");
        setSuccess("");
        setMatchMessage("");
      }
    } catch {
      setError("Failed to submit application. Please try again.");
      setSuccess("");
      setMatchMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apply for this job</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Message or cover letter"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
        ></textarea>

        <textarea
          placeholder="Describe your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
          className={styles.textarea}
        ></textarea>

        <button type="submit" className={styles.submitButton}>
          Submit Application
        </button>

        {success && <p className={styles.success}>{success}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {matchMessage && <p className={styles.match}>{matchMessage}</p>}
      </form>
    </div>
  );
}
