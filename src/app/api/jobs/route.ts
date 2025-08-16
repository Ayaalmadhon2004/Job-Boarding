import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  // Type Assertion لتحديد نوع token
  const token = (await getToken({ req, secret })) as { id: string; role: string } | null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (token.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { title, description, type } = await req.json();

    if (!title || !description || !type) {
      return NextResponse.json(
        { error: "Title, description and type are required" },
        { status: 400 }
      );
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        type,
        ownerId: token.id, // النوع معروف الآن
      },
    });

    return NextResponse.json({ newJob }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
