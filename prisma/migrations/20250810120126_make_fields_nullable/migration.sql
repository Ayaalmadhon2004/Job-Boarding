/*
  Warnings:

  - You are about to drop the column `resumeFilename` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `timePublished` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "resumeFilename",
ADD COLUMN     "skills" TEXT,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "timePublished";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "password",
DROP COLUMN "role";
