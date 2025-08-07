import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import pdfParse from "pdf-parse";
import formidable from "formidable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Next.js App Router config for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req, { params }) {
  const jobId = params.id;

  const form = new formidable.IncomingForm(); // ✅ تصحيح الاسم: InComingForm ❌ -> IncomingForm ✅

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const { name, email, message } = data.fields;
  const resume = data.files.resume;

  if (!resume) {
    return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
  }

  // ✅ تأكد أن `resume` هو كائن وليس مصفوفة (حسب طريقة رفع الملف)
  const filePath = Array.isArray(resume) ? resume[0].filepath : resume.filepath;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const jobDescription = job.description.toLowerCase();

  const fileBuffer = await fs.readFile(filePath);
  const parsedResume = await pdfParse(fileBuffer);
  const resumeText = parsedResume.text.toLowerCase();

  const jobKeywords = jobDescription.split(/\s+/); // ✅ تقسيم بكفاءة أكثر
  const matchCount = jobKeywords.filter((word) => resumeText.includes(word)).length; // ✅ كان عندك {} بدون return
  const matchPercentage = (matchCount / jobKeywords.length) * 100;
  const isMatch = matchPercentage >= 60;

  // حفظ البيانات في الجدول المرتبط بالتقديم
  await prisma.application.create({
    data: {
      name,
      email,
      message,
      jobId,
    },
  });

  return NextResponse.json({
    message: "Application Received",
    match: isMatch,
    matchPercentage: Math.round(matchPercentage),
  });
}
