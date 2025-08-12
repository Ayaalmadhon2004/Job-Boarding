import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.grid}>
        <Link href="/dashboard/applying-dash" className={styles.card}>
          <div className={styles.icon}>📄</div>
          <h2 className={styles.cardTitle}>Applying Dashboard</h2>
          <p className={styles.description}>
            Track and manage all your current job applications, statuses, and
            interview schedules.
          </p>
        </Link>

        <Link href="/dashboard/jobs-dash" className={styles.card}>
          <div className={styles.icon}>💼</div>
          <h2 className={styles.cardTitle}>Jobs Dashboard</h2>
          <p className={styles.description}>
            Browse and manage job postings, create new listings, and monitor job
            performance metrics.
          </p>
        </Link>
      </div>
    </div>
  );
}
