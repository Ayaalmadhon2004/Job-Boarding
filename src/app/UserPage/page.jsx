"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./userPage.module.css";

export default function UserProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [careerPath, setCareerPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    const emailStored = sessionStorage.getItem("email");

    setUsername(name || "Guest");
    setEmail(emailStored || "Guest@gmail.com");

    if (emailStored) {
      fetch(`/api/updateUser?email=${encodeURIComponent(emailStored)}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setAboutMe(data.user.aboutMe || "");
            setCareerPath(data.user.careerPath || "");
          }
        })
        .catch(err => console.error("Failed to fetch user:", err));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.username}>{username}</h1>
      <span className={styles.email}>{email}</span>

      <p className={styles.info}><strong>About Me:</strong> {aboutMe || "No information yet"}</p>
      <p className={styles.info}><strong>Career Path:</strong> {careerPath || "Not selected"}</p>

      <button className={styles.button} onClick={() => router.push("/UserPage/EditPage")}>
        Edit your page
      </button>
    </div>
  );
}
