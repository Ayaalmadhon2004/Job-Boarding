import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // تأكد من المسار الصحيح لاستيراد prisma

// POST - لتقديم طلب توظيف (مثلاً)
export async function POST(req, { params }) {
  try {
    const jobId = params.id; // id كـ string

    const formData = await req.formData();
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";
    const skills = formData.get("skills") || "";

    const existingApplication=await prisma.application.findFirst({
      where:{email,jobId},
    });

    if(existingApplication){
      return NextResponse.json({error:"this email used before !"},{status:400});
    }

    if (!skills.trim()) {
      return NextResponse.json(
        { error: "وصف المهارات مطلوب." },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "الوظيفة غير موجودة" }, { status: 404 });
    }

    const jobDesc = job.description.toLowerCase();
    const userSkills = skills.toLowerCase().split(/[\s,;]+/);

    let matchedCount = 0;
    userSkills.forEach((skill) => {
      if (skill && jobDesc.includes(skill)) {
        matchedCount++;
      }
    });

    const matchRatio = matchedCount / userSkills.length;
    const isMatch = matchRatio >= 0.5;

    await prisma.application.create({
      data: {
        name,
        email,
        message,
        skills,
        jobId,
        status: isMatch ? "resolved" : "rejected",
      },
    });

    return NextResponse.json({
      match: isMatch,
      matchedCount,
      totalSkills: userSkills.length,
      status: isMatch ? "resolved" : "rejected",
      message: isMatch
        ? "مهاراتك مطابقة لهذه الوظيفة!"
        : "مهاراتك لا تطابق متطلبات الوظيفة بشكل كافٍ.",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في الخادم" },
      { status: 500 }
    );
  }
}

// DELETE - لحذف الوظيفة
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;  // انتظر params
    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "تم حذف الوظيفة" },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Delete job error:", error);
    return NextResponse.json(
      { error: "فشل حذف الوظيفة" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function PUT(req, { params }) {
  const { id } = params;
  const { title, description, type } = await req.json();

  try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data: { title, description, type },
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

