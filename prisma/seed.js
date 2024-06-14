const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: "Cosméticos" },
  { name: "Mini Power-Ups" },
  { name: "Random Item" },
  { name: "Vips" },
  { name: "Reducción de la Tienda" },
  { name: "Tienda Específica" }
];

const products = [
  { name: "Cosmético Pequeño", description: "Cosmético estético pequeño.", price: 0.55, stock: 100, imageUrl: "url-to-image", categoryId: 1, type: "estético", tier: 1 },
  { name: "Cosmético Grande", description: "Cosmético estético grande.", price: 0.99, stock: 100, imageUrl: "url-to-image", categoryId: 1, type: "estético", tier: 1 },
  { name: "Cosmético Llamativo", description: "Cosmético estético llamativo.", price: 1.30, stock: 100, imageUrl: "url-to-image", categoryId: 1, type: "estético", tier: 2 },
  { name: "Skin Completa", description: "Skin completa para tu personaje.", price: 1.90, stock: 50, imageUrl: "url-to-image", categoryId: 1, type: "estético", tier: 3 },
  { name: "Objetos Exclusivos", description: "Objetos de máxima exclusividad.", price: 5.00, stock: 20, imageUrl: "url-to-image", categoryId: 1, type: "beneficios", tier: 4 },
  { name: "Mini Power-Up", description: "Pequeño beneficio para el usuario.", price: 2.00, stock: 100, imageUrl: "url-to-image", categoryId: 2, type: "beneficio", tier: 1 },
  { name: "Random Item", description: "Participa en una ruleta para ganar un objeto.", price: 1.00, stock: 100, imageUrl: "url-to-image", categoryId: 3, type: "suerte", tier: 1 },
  { name: "Vip Enano", description: "Vip enano con beneficios.", price: 2.99, stock: 10, imageUrl: "url-to-image", categoryId: 4, type: "vip", tier: 1 },
  { name: "Vip Pequeño", description: "Vip pequeño con beneficios.", price: 5.00, stock: 10, imageUrl: "url-to-image", categoryId: 4, type: "vip", tier: 2 },
  { name: "Vip Mediano", description: "Vip mediano con beneficios.", price: 8.67, stock: 10, imageUrl: "url-to-image", categoryId: 4, type: "vip", tier: 3 },
  { name: "Vip Gigante", description: "Vip gigante con beneficios.", price: 9.99, stock: 10, imageUrl: "url-to-image", categoryId: 4, type: "vip", tier: 4 },
  { name: "Vip Nouraquiano", description: "Vip nouraquiano con máximos beneficios.", price: 14.99, stock: 10, imageUrl: "url-to-image", categoryId: 4, type: "vip", tier: 5 },
  { name: "Reducción 25%", description: "Reducción del 25% en la tienda.", price: 2.30, stock: 50, imageUrl: "url-to-image", categoryId: 5, type: "descuento", tier: 1 },
  { name: "Reducción 40%", description: "Reducción del 40% en la tienda.", price: 3.60, stock: 50, imageUrl: "url-to-image", categoryId: 5, type: "descuento", tier: 2 },
  { name: "Reducción 50%", description: "Reducción del 50% en la tienda.", price: 4.60, stock: 50, imageUrl: "url-to-image", categoryId: 5, type: "descuento", tier: 3 },
  { name: "Tienda Específica", description: "Acceso a una tienda exclusiva.", price: 10.00, stock: 10, imageUrl: "url-to-image", categoryId: 6, type: "acceso", tier: 1 }
];

async function main() {
  for (const category of categories) {
    await prisma.category.create({
      data: category
    });
  }
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
