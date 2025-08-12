"use client";

import styles from "./contact.module.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.text}>
          If you have any questions or want to get in touch, you can use the following methods:
        </p>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <FaEnvelope className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Email</h3>
            <p className={styles.featureDesc}>contact@example.com</p>
          </div>

          <div className={styles.featureCard}>
            <FaPhone className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Phone</h3>
            <p className={styles.featureDesc}>+1 234 567 890</p>
          </div>

          <div className={styles.featureCard}>
            <FaMapMarkerAlt className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Address</h3>
            <p className={styles.featureDesc}>Gaza, Palestine</p>
          </div>
        </div>
      </div>
    </section>
  );
}
