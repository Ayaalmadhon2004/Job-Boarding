"use client";

import { useState, useEffect } from "react";
import styles from "./bookmark.module.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  if (cartItems.length === 0) {
    return <p className={styles.empty}>Your cart is empty</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Cart</h1>
      <div className={styles.grid}>
        {cartItems.map((job, index) => (
          <div key={job.id ?? index} className={styles.card}>
            <h2 className={styles.jobTitle}>{job.title}</h2>
            <p className={styles.type}>{job.type}</p>
            <small className={styles.date}>
              {new Date(job.createdAt).toLocaleDateString("en-US")}
            </small>
            <button
             className={styles.buttonRemove}
             onClick={() => removeItem(job.id)}
            >
            Remove
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
