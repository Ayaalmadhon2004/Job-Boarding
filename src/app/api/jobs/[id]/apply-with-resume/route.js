/*import { NextResponse } from "next/server";
import multiparty from "multiparty";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";

const prisma = new PrismaClient();

function toNodeReadableStream(readableStream) {
  const reader = readableStream.getReader();
  return new Readable({
    async read() {
      try {
        const { done, value } = await reader.read();
        if (done) this.push(null);
        else this.push(Buffer.from(value));
      } catch (error) {
        this.destroy(error);
      }
    },
  });
}

export async function POST(request, { params }) {
  const jobId = params.id;
  const nodeStream = toNodeReadableStream(request.body);

  return new Promise((resolve) => {
    const form = new multiparty.Form();

    form.parse(nodeStream, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return resolve(
          NextResponse.json({ error: "Failed to parse form data" }, { status: 500 })
        );
      }

      try {
        const name = fields.name?.[0];
        const email = fields.email?.[0];
        const message = fields.message?.[0];
        const resumeFile = files.resume?.[0];

        if (!resumeFile) {
          return resolve(
            NextResponse.json({ error: "Resume file is required" }, { status: 400 })
          );
        }
        if (!name || !email) {
          return resolve(
            NextResponse.json({ error: "Name and email are required" }, { status: 400 })
          );
        }

        await prisma.application.create({
          data: {
            name,
            email,
            message,
            jobId,
            resumeFilename: resumeFile.originalFilename, // Make sure Prisma schema has this field
          },
        });

        resolve(
          NextResponse.json({ message: "Application received successfully.", match: false })
        );
      } catch (error) {
        console.error("Error saving application:", error);
        resolve(
          NextResponse.json({ error: "Failed to process application" }, { status: 500 })
        );
      }
    });
  });
}
*/

// pages/api/jobs/[id]/apply-with-resume.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import multiparty from 'multiparty';
import { OpenAI } from 'openai';
import fs from 'fs';


const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
  api: {
    bodyParser: false, // Important for handling file uploads
  },
};

export async function POST(req, { params }) {
  const jobId = params.id;

  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return resolve(
          NextResponse.json({ error: 'Error parsing form data' }, { status: 400 })
        );
      }


      const { name, email, message } = fields;
      const resumeFile = files.resume?.[0];

        console.log("Resume file path:", resumeFile?.path);

      if (!resumeFile) {
        return resolve(
          NextResponse.json({ error: 'Resume file is missing' }, { status: 400 })
        );
      }

      try {
        const buffer = await fs.promises.readFile(resumeFile.path);
        const resumeText = (await pdf(buffer)).text;

        // ✅ جلب وصف الوظيفة من قاعدة البيانات
        const job = await prisma.job.findUnique({
          where: { id: jobId },
        });

        if (!job) {
          return resolve(
            NextResponse.json({ error: 'Job not found' }, { status: 404 })
          );
        }

        // ✅ استخدام OpenAI لتحليل التطابق
        const prompt = `
أنت مساعد توظيف ذكي. المطلوب منك مقارنة محتوى السيرة الذاتية التالية مع وصف الوظيفة.
قم بتحليل المهارات، الخبرة، المؤهلات، اللغات، وغيرها.

- إذا كانت السيرة الذاتية تطابق الوظيفة بنسبة جيدة (أكثر من 70%)، أجب بكلمة: match
- إذا كانت لا تطابق، أجب بكلمة: no-match

--- وصف الوظيفة ---
${job.description}

--- السيرة الذاتية ---
${resumeText}

هل هناك تطابق؟`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
        });

        const result = completion.choices[0].message.content.toLowerCase().trim();
        const isMatch = result.includes('match') && !result.includes('no-match');

        return resolve(
          NextResponse.json({ match: isMatch }, { status: 200 })
        );
      } catch (err) {
        console.error('Resume parsing or OpenAI error:', err);
        NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    });
  });
}

