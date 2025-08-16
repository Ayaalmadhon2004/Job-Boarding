import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const ownerCount = await prisma.user.count({
      where: { role: "OWNER" } 
    });

    const role = ownerCount === 0 ? "OWNER" : "USER";

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return new Response(JSON.stringify({ message: "تم إنشاء المستخدم", user }), { status: 201 });

  } catch (error: any) {
    if (error.code === "P2002") {
      return new Response(JSON.stringify({ error: "البريد الإلكتروني موجود مسبقًا" }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
