"use client";

import { useRouter } from "next/navigation";
import styles from "../jobDetails.module.css";

export default function ApplyButton({ jobId }) {
  const router = useRouter();

  return (
    <button
      className={styles.applyButton}
      type="button"
      onClick={() => router.push(`/job/${jobId}/apply`)}
    >
      Apply Now!
    </button>
  );
}
