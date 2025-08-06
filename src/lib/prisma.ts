import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as unknown as {prisma:PrismaClient} // prisma not a data type in typescript so i make casting of it by global , but i maust use unkown else
export const prisma=globalForPrisma.prisma || new PrismaClient(); 
if(process.env.NODE_ENV!=="production") globalForPrisma.prisma=prisma //i use it to not make a new prisma every once in development 
