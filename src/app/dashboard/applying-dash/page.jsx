import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { redirect } from "next/navigation";
import styles from "./applyingDash.module.css";

export default async function ApplyingDashPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "OWNER") {
    redirect("/not-authorized");
  }

  // العثور على المستخدم حسب البريد الإلكتروني
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  console.log("Session User:", session.user);


  if (!user) {
    redirect("/not-authorized");
  }

  // جلب الوظائف الخاصة بالمستخدم
  const jobs = await prisma.job.findMany({
    where: { ownerId: user.id },
    include: { applications: true },
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
                  <strong>{app.name}</strong> ({app.email}) - {app.message || "No message"}
                  {app.skills && <span> | Skills: {app.skills}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
