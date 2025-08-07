import { prisma } from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const { name, email, message } = await req.json();
    const jobId = params.id;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), { status: 400 });
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    const application = await prisma.application.create({
      data: {
        name,
        email,
        message,
        job: { connect: { id: jobId } },
      },
    });

    return new Response(JSON.stringify({ application }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to submit application" }), { status: 500 });
  }
}
