const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Tier 1' },
      { name: 'Tier 2' },
      { name: 'Tier 3' },
      { name: 'Tier 4' },
      { name: 'Random Item' },
      { name: 'Vips' },
      { name: 'Reducción de la tienda' },
      { name: 'Tienda específica' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Cosmético Pequeño', description: 'Cosmético estético pequeño', price: 0.55, stock: 100, imageUrl: 'url1', categoryId: 1, type: 'cosmetic', tier: 1 },
      { name: 'Cosmético Grande', description: 'Cosmético estético grande', price: 0.99, stock: 100, imageUrl: 'url2', categoryId: 1, type: 'cosmetic', tier: 1 },
      { name: 'Cosmético Llamativo', description: 'Cosmético llamativo', price: 1.30, stock: 100, imageUrl: 'url3', categoryId: 2, type: 'cosmetic', tier: 2 },
      { name: 'Parte del Cuerpo', description: 'Parte del cuerpo estético', price: 1.40, stock: 100, imageUrl: 'url4', categoryId: 3, type: 'cosmetic', tier: 3 },
      { name: 'Skin Completa', description: 'Skin completa', price: 1.90, stock: 100, imageUrl: 'url5', categoryId: 3, type: 'cosmetic', tier: 3 },
      { name: 'Objeto Exclusivo', description: 'Objeto exclusivo con beneficios', price: 3.00, stock: 100, imageUrl: 'url6', categoryId: 4, type: 'cosmetic', tier: 4 },
      { name: 'Item Aleatorio', description: 'Item aleatorio de ruleta', price: 2.00, stock: 100, imageUrl: 'url7', categoryId: 5, type: 'random', tier: 1 },
      { name: 'Vip Enano', description: 'Rango Vip enano', price: 5.99, stock: 100, imageUrl: 'url8', categoryId: 6, type: 'vip', tier: 1 },
      { name: 'Reducción de 25%', description: 'Reducción de tienda del 25%', price: 2.30, stock: 100, imageUrl: 'url9', categoryId: 7, type: 'discount', tier: 1 },
      { name: 'Tienda Específica', description: 'Acceso a tienda específica', price: 10.00, stock: 100, imageUrl: 'url10', categoryId: 8, type: 'special', tier: 1 },
    ],
  });

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
