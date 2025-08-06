import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function JobApplicationsPage({ params }) {
  const session = await getSession();

  if (!session || session.user.role !== "owner") {
    return <p>Access denied</p>;
  }

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      applications: true,
    },
  });

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div>
      <h1>Applications for {job.title}</h1>
      {job.applications.length === 0 && <p>No applications yet.</p>}
      <ul>
        {job.applications.map((app) => (
          <li key={app.id}>
            <strong>{app.name}</strong> ({app.email}) - {app.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
