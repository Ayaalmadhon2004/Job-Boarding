"use client";

import { useState, useEffect } from "react";
import styles from "./userEdit.module.css";
import { useRouter } from "next/navigation";

export default function UserEdit() {
  const [aboutMe, setAboutMe] = useState("");
  const [careerPath, setCareerPath] = useState("web-development");
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    fetch(`/api/updateUser?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setAboutMe(data.user.aboutMe || "");
          setCareerPath(data.user.careerPath || "web-development");
        }
      })
      .catch(err => console.error("Failed to fetch user:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem("email");
    if (!email) return alert("Please login again.");

    try {
      const res = await fetch("/api/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, aboutMe, careerPath }),
      });

      if (res.ok) {
        alert("Saved successfully ✅");
        router.push("/UserPage");
      } else {
        const data = await res.json();
        alert(`Error saving ❌: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving ❌: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>About Me</label>
        <textarea
          className={styles.textarea}
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Write something about yourself"
        />

        <label className={styles.label}>Career Path</label>
        <select
          className={styles.select}
          value={careerPath}
          onChange={(e) => setCareerPath(e.target.value)}
        >
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="ui-ux">UI/UX</option>
          <option value="desktop-development">Desktop Development</option>
        </select>

        <button className={styles.button} type="submit">Save</button>
      </form>
    </div>
  );
}
