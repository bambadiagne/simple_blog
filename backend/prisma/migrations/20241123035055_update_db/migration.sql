-- CreateTable
CREATE TABLE "CodeVerification" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeVerification" ADD CONSTRAINT "CodeVerification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
