-- CreateTable
CREATE TABLE "_InternshipToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InternshipToUser_AB_unique" ON "_InternshipToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InternshipToUser_B_index" ON "_InternshipToUser"("B");

-- AddForeignKey
ALTER TABLE "_InternshipToUser" ADD CONSTRAINT "_InternshipToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Internship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InternshipToUser" ADD CONSTRAINT "_InternshipToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
