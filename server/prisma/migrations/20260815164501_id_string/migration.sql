/*
  Warnings:

  - The primary key for the `Activite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GroupMembre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JournalActivity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JournalEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_auteurId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_createurId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembre" DROP CONSTRAINT "GroupMembre_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMembre" DROP CONSTRAINT "GroupMembre_userId_fkey";

-- DropForeignKey
ALTER TABLE "JournalActivity" DROP CONSTRAINT "JournalActivity_activiteId_fkey";

-- DropForeignKey
ALTER TABLE "JournalActivity" DROP CONSTRAINT "JournalActivity_journalEntryId_fkey";

-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_envoyerParId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_recipiantId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_auteurId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_groupId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterPar_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_creePar_fkey";

-- AlterTable
ALTER TABLE "Activite" DROP CONSTRAINT "Activite_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Activite_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Activite_id_seq";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ALTER COLUMN "auteurId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq";

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "resourceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId", "resourceId");

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createurId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Group_id_seq";

-- AlterTable
ALTER TABLE "GroupMembre" DROP CONSTRAINT "GroupMembre_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GroupMembre_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GroupMembre_id_seq";

-- AlterTable
ALTER TABLE "JournalActivity" DROP CONSTRAINT "JournalActivity_pkey",
ALTER COLUMN "journalEntryId" SET DATA TYPE TEXT,
ALTER COLUMN "activiteId" SET DATA TYPE TEXT,
ADD CONSTRAINT "JournalActivity_pkey" PRIMARY KEY ("journalEntryId", "activiteId");

-- AlterTable
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JournalEntry_id_seq";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "envoyerParId" SET DATA TYPE TEXT,
ALTER COLUMN "recipiantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Message_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ALTER COLUMN "auteurId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RefreshToken_id_seq";

-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "reporterPar" SET DATA TYPE TEXT,
ALTER COLUMN "targetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Report_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Report_id_seq";

-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "creePar" SET DATA TYPE TEXT,
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Resource_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_activiteId_fkey" FOREIGN KEY ("activiteId") REFERENCES "Activite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_creePar_fkey" FOREIGN KEY ("creePar") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createurId_fkey" FOREIGN KEY ("createurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembre" ADD CONSTRAINT "GroupMembre_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembre" ADD CONSTRAINT "GroupMembre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_envoyerParId_fkey" FOREIGN KEY ("envoyerParId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipiantId_fkey" FOREIGN KEY ("recipiantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterPar_fkey" FOREIGN KEY ("reporterPar") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
