/*
  Warnings:

  - You are about to drop the column `consumptionMethod` on the `Order` table. All the data in the column will be lost.
  - Added the required column `comsumptionMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costumerCpf` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costumerName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consumptionMethod",
ADD COLUMN     "comsumptionMethod" "ComsumptionMethod" NOT NULL,
ADD COLUMN     "costumerCpf" TEXT NOT NULL,
ADD COLUMN     "costumerName" TEXT NOT NULL;
