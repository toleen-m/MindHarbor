-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UTILISATEUR', 'ADMINISTRATEUR');

-- CreateEnum
CREATE TYPE "ParametresVisibilite" AS ENUM ('PUBLIC', 'GROUPES_SEULEMENT', 'PRIVE');

-- CreateEnum
CREATE TYPE "ParametresDeContact" AS ENUM ('PERSONNE', 'MEMBRES_DE_MES_GROUPES', 'TOUT_LE_MONDE');

-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('ANXIETE', 'SOMMEIL', 'RELATIONS', 'TRAVAIL', 'DEUIL', 'AUTRE');

-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('DEBUTANT', 'INTERMEDIAIRE', 'AVANCE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ARTICLE', 'EXERCICE', 'FICHE_PRATIQUE', 'AUDIO', 'VIDEO', 'LIEN_EXTERNE');

-- CreateEnum
CREATE TYPE "GroupVisibilite" AS ENUM ('PUBLIC', 'PRIVE');

-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MEMBRE', 'MODERATEUR');

-- CreateEnum
CREATE TYPE "AdhesionStatus" AS ENUM ('EN_ATTENTE', 'ACCEPTEE', 'REFUSEE');

-- CreateEnum
CREATE TYPE "ReportCategorie" AS ENUM ('INAPPROPRIE', 'SPAM', 'INQUIETANT');

-- CreateEnum
CREATE TYPE "ReportStatut" AS ENUM ('EN_ATTENTE', 'TRAITE', 'REJETE');

-- CreateEnum
CREATE TYPE "ReportResolution" AS ENUM ('CONTENU_MASQUE', 'AVERTISSEMENT', 'REJETE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "biographie" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UTILISATEUR',
    "parametresVisibilite" "ParametresVisibilite" NOT NULL DEFAULT 'PRIVE',
    "parametresDeContact" "ParametresDeContact" NOT NULL DEFAULT 'TOUT_LE_MONDE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activite" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "humeurGenerale" INTEGER NOT NULL,
    "niveauEnergie" INTEGER NOT NULL,
    "qualiteDuSommeil" INTEGER NOT NULL,
    "niveauAnxiete" INTEGER NOT NULL,
    "evenementMarquants" TEXT,
    "gratitude" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalActivity" (
    "journalEntryId" INTEGER NOT NULL,
    "activiteId" INTEGER NOT NULL,

    CONSTRAINT "JournalActivity_pkey" PRIMARY KEY ("journalEntryId","activiteId")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT,
    "categorie" "Categorie" NOT NULL,
    "type" "Type" NOT NULL,
    "duree" INTEGER,
    "niveau" "Niveau" NOT NULL DEFAULT 'DEBUTANT',
    "creePar" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","resourceId")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "regles" TEXT NOT NULL,
    "visibilite" "GroupVisibilite" NOT NULL DEFAULT 'PUBLIC',
    "createurId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMembre" (
    "id" SERIAL NOT NULL,
    "role" "GroupRole" NOT NULL DEFAULT 'MEMBRE',
    "statut" "AdhesionStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "messageDemande" TEXT,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateJoint" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupMembre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "auteurId" INTEGER,
    "contenu" TEXT NOT NULL,
    "estCache" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "auteurId" INTEGER,
    "contenu" TEXT NOT NULL,
    "estCache" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "envoyerParId" INTEGER NOT NULL,
    "recipiantId" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reporterPar" INTEGER,
    "categorie" "ReportCategorie" NOT NULL,
    "statut" "ReportStatut" NOT NULL DEFAULT 'EN_ATTENTE',
    "targetId" INTEGER NOT NULL,
    "raison" TEXT,
    "resolution" "ReportResolution",
    "dateResolution" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "ip" TEXT,
    "dateExpiration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Activite_nom_key" ON "Activite"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_date_key" ON "JournalEntry"("userId", "date");

-- CreateIndex
CREATE INDEX "JournalActivity_activiteId_idx" ON "JournalActivity"("activiteId");

-- CreateIndex
CREATE INDEX "Resource_categorie_type_idx" ON "Resource"("categorie", "type");

-- CreateIndex
CREATE INDEX "Resource_titre_idx" ON "Resource"("titre");

-- CreateIndex
CREATE INDEX "Favorite_resourceId_idx" ON "Favorite"("resourceId");

-- CreateIndex
CREATE INDEX "Group_visibilite_theme_idx" ON "Group"("visibilite", "theme");

-- CreateIndex
CREATE INDEX "Group_nom_idx" ON "Group"("nom");

-- CreateIndex
CREATE INDEX "GroupMembre_groupId_statut_idx" ON "GroupMembre"("groupId", "statut");

-- CreateIndex
CREATE INDEX "GroupMembre_userId_idx" ON "GroupMembre"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMembre_groupId_userId_key" ON "GroupMembre"("groupId", "userId");

-- CreateIndex
CREATE INDEX "Post_groupId_createdAt_idx" ON "Post"("groupId", "createdAt");

-- CreateIndex
CREATE INDEX "Post_auteurId_idx" ON "Post"("auteurId");

-- CreateIndex
CREATE INDEX "Comment_postId_createdAt_idx" ON "Comment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_recipiantId_idx" ON "Message"("recipiantId");

-- CreateIndex
CREATE INDEX "Message_envoyerParId_createdAt_idx" ON "Message"("envoyerParId", "createdAt");

-- CreateIndex
CREATE INDEX "Report_statut_categorie_createdAt_idx" ON "Report"("statut", "categorie", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_dateExpiration_idx" ON "RefreshToken"("dateExpiration");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalActivity" ADD CONSTRAINT "JournalActivity_activiteId_fkey" FOREIGN KEY ("activiteId") REFERENCES "Activite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_creePar_fkey" FOREIGN KEY ("creePar") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createurId_fkey" FOREIGN KEY ("createurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembre" ADD CONSTRAINT "GroupMembre_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembre" ADD CONSTRAINT "GroupMembre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_envoyerParId_fkey" FOREIGN KEY ("envoyerParId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipiantId_fkey" FOREIGN KEY ("recipiantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterPar_fkey" FOREIGN KEY ("reporterPar") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
