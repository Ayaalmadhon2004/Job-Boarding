"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignIn } from "next-auth/react"; //nextAuth for client side
import styles from "./signIn.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await nextAuthSignIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await fetch("/api/auth/session").then((res) => res.json());

      if (session?.user) {
        sessionStorage.setItem("name", session.user.name);
        sessionStorage.setItem("email",session.user.email);
        console.log(session.user.name);
        console.log(session.user.email);
      }

      if (session?.user?.role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/UserPage"); 
      }
    } else {
      setErrorMsg("Login failed, please check your credentials.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Write your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Write your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
