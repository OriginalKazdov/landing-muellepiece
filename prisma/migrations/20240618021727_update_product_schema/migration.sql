-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable: Agregar columnas con valores predeterminados a la tabla "Order"
ALTER TABLE "Order" ADD COLUMN "isCrewPurchase" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Order" ADD COLUMN "isOneTimePurchase" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Order" ADD COLUMN "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
ALTER TABLE "Order" ADD COLUMN "productId" INTEGER NOT NULL DEFAULT 1; -- Asegúrate de que el ID 1 exista en la tabla "Product"

-- AlterTable: Modificar la tabla "Product"
ALTER TABLE "Product" DROP COLUMN "price";
ALTER TABLE "Product" ADD COLUMN "crewPrice" DOUBLE PRECISION;
ALTER TABLE "Product" ADD COLUMN "duration" INTEGER;
ALTER TABLE "Product" ADD COLUMN "limitedDurationPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
ALTER TABLE "Product" ADD COLUMN "oneTimePrice" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
ALTER TABLE "Product" ALTER COLUMN "tier" DROP NOT NULL;

-- DropTable: Eliminar la tabla "OrderItem" si ya no es necesaria
DROP TABLE "OrderItem";

-- AddForeignKey: Agregar clave foránea
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
