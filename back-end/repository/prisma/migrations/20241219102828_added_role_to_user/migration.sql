-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'chef', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
