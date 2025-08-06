"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signUp.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        router.push("/signIn");
      } else {
        setErrorMsg(data.error || "Registration failed");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up</h1>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
