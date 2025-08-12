import { prisma } from "@/lib/prisma";
import styles from "./jobDetails.module.css";
import ApplyButton from "./ApplyButton/page"; 

export default async function JobDetailsPage({ params }) {
  const { id } = await params; // <-- Add await here
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    return <p className={styles.notFound}>Job not Found</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{job.title}</h1>
      <p className={styles.description}>{job.description}</p>

      <div className={styles.info}>
        <p>
          <strong>Type:</strong> <span>{job.type}</span>
        </p>
        <p>
          <strong>Published:</strong>{" "}
          <span>{new Date(job.timePublished).toLocaleDateString()}</span>
        </p>
      </div>

      <ApplyButton jobId={job.id} />
    </div>
  );
}
