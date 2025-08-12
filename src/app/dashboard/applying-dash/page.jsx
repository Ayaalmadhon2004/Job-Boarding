import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "./applyingDash.module.css";

export default async function ApplyingDashPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "owner") {
    redirect("/not-authorized");
  }

  const jobs = await prisma.job.findMany({
    where: {
      ownerId: session.user.id,
    },
    include: {
      applications: true,
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Applications for Your Jobs</h1>
      {jobs.length === 0 && <p className={styles.noJobs}>No jobs found.</p>}

      {jobs.map((job) => (
        <div key={job.id} className={styles.jobCard}>
          <h2 className={styles.jobTitle}>{job.title}</h2>
          {job.applications.length === 0 ? (
            <p className={styles.noApplications}>No applications for this job.</p>
          ) : (
            <ul className={styles.applicationList}>
              {job.applications.map((app) => (
                <li key={app.id}>
                  <strong>{app.name}</strong> ({app.email}) - {app.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
