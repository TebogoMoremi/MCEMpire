CREATE TABLE "PortfolioImage" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "alt" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);
