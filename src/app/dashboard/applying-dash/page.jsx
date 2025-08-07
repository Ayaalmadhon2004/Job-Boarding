import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ApplyingDashPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "owner") {
    redirect("/not-authorized"); // Or any other page
  }

  // Fetch all jobs created by this owner, along with applications
  const jobs = await prisma.job.findMany({
    where: {
      ownerId: session.user.id, // Make sure `ownerId` exists in your Job model
    },
    include: {
      applications: true,
    },
  });

  return (
    <div>
      <h1>Applications for Your Jobs</h1>
      {jobs.length === 0 && <p>No jobs found.</p>}

      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          {job.applications.length === 0 ? (
            <p>No applications for this job.</p>
          ) : (
            <ul>
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
