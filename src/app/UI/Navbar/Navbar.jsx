"use client";

import Link from "next/link";
import navbar from "./navbar.module.css";
import { useRouter } from "next/navigation";
import "../../globals.css"

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={navbar.container}>
      <div className={navbar.logo}>
        <h2>Job Boarding</h2>
      </div>
      <ul className={navbar.list}>
        <li>
          <Link href="/">Home</Link> 
        </li>
        <li>
          <Link href="/job">Jobs</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div className={navbar.signInUp}>
        <button onClick={() => router.push("/signIn")}>Sign In</button>
        <button onClick={() => router.push("/signup")}>Sign Up</button>
      </div>
    </div>
  );
}
