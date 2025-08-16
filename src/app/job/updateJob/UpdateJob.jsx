import { useState } from "react";
import styles from "./updateJob.module.css";

export default function UpdateJob({ job, onUpdateSuccess }) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [type, setType] = useState(job.type);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/jobs/${job.id}/apply-with-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, type }),
    });

    if (res.ok) {
      const updatedJob = await res.json();
      onUpdateSuccess(updatedJob);
    } else {
      alert("Failed to update");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className={styles.textarea}
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select
        className={styles.select}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="web-development">Web development</option>
        <option value="mobile-development">Mobile development</option>
        <option value="ui-ux">UI/UX</option>
        <option value="desktop-development">Desktop development</option>
      </select>

      <button className={styles.button} type="submit">
        Update Job
      </button>
    </form>
  );
}
