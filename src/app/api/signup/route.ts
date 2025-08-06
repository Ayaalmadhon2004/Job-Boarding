import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"; 

export async function POST (req:Request){
    const {name,email,password}=await req.json();
    const hashedPassword = await bcrypt.hash(password,10);
    const ownerCount=await prisma.user.count({where:{role:"owner"}});
    const role = ownerCount===0?"owner":"user";
    try{
        const user=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role
            }
        });
        return new Response(JSON.stringify(user),{status:201});
    } catch(error){
        return new Response(JSON.stringify({error:"Email already Exist"}),{status:400});
    }

}