const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
  // Eliminar datos de la tabla Order primero para evitar restricciones de clave foránea
  await prisma.order.deleteMany();
  
  // Luego eliminar datos de la tabla Product
  await prisma.product.deleteMany();

  // Si tienes categorías o datos relacionados que también necesitas reiniciar, inclúyelos aquí
  await prisma.category.deleteMany();

  console.log('Datos eliminados. Ejecutando seed script...');

  await seedDatabase();
}

async function seedDatabase() {
  const cosmeticCategory = await prisma.category.create({
    data: {
      name: 'Cosmetic',
    },
  });

  const vipCategory = await prisma.category.create({
    data: {
      name: 'VIP',
    },
  });

  const reductionCategory = await prisma.category.create({
    data: {
      name: 'Reduction',
    },
  });

  await prisma.product.createMany({
    data: [
      // Cosméticos
      {
        name: 'Cosmético Estético Pequeño',
        description: 'Cosmético pequeño sin efectos adicionales.',
        oneTimePrice: 0.55,
        limitedDurationPrice: 0.55,
        stock: 100,
        imageUrl: 'https://example.com/cosmetico-pequeno.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 1,
      },
      {
        name: 'Cosmético Estético Grande',
        description: 'Cosmético grande sin efectos adicionales.',
        oneTimePrice: 0.99,
        limitedDurationPrice: 0.99,
        stock: 100,
        imageUrl: 'https://example.com/cosmetico-grande.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 1,
      },
      {
        name: 'Cosmético Estético Llamativo',
        description: 'Cosmético llamativo con efectos adicionales.',
        oneTimePrice: 1.30,
        limitedDurationPrice: 1.30,
        stock: 100,
        imageUrl: 'https://example.com/cosmetico-llamativo.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 2,
      },
      {
        name: 'Skin Parte de Cuerpo',
        description: 'Skin o parte del cuerpo.',
        oneTimePrice: 1.40,
        limitedDurationPrice: 1.40,
        stock: 100,
        imageUrl: 'https://example.com/skin-parte-cuerpo.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 3,
      },
      {
        name: 'Skin Completa',
        description: 'Skin completa con efectos adicionales.',
        oneTimePrice: 2.90,
        limitedDurationPrice: 1.90,
        stock: 100,
        imageUrl: 'https://example.com/skin-completa.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 3,
      },
      {
        name: 'Objeto Exclusivo',
        description: 'Objeto de máxima exclusividad con numerosos beneficios.',
        oneTimePrice: 5.00,
        limitedDurationPrice: 3.00,
        stock: 100,
        imageUrl: 'https://example.com/objeto-exclusivo.png',
        categoryId: cosmeticCategory.id,
        type: 'cosmetic',
        tier: 4,
      },
      // VIPs
      {
        name: 'Vip Enano',
        description: 'Rango VIP con beneficios especiales.',
        oneTimePrice: 5.99,
        limitedDurationPrice: 2.99,
        stock: 100,
        imageUrl: 'https://example.com/vip-enano.png',
        categoryId: vipCategory.id,
        type: 'vip',
        tier: 1,
        duration: 30,
      },
      {
        name: 'Vip Pequeño',
        description: 'Vip Enano + elección de un cosmético + 30000 bellys.',
        oneTimePrice: 8.00,
        limitedDurationPrice: 5.00,
        stock: 100,
        imageUrl: 'https://example.com/vip-pequeno.png',
        categoryId: vipCategory.id,
        type: 'vip',
        tier: 2,
        duration: 30,
      },
      {
        name: 'Vip Mediano',
        description: 'Vip Pequeño + 60000 bellys + elección de 3 cosméticos.',
        oneTimePrice: 15.99,
        limitedDurationPrice: 8.67,
        stock: 100,
        imageUrl: 'https://example.com/vip-mediano.png',
        categoryId: vipCategory.id,
        type: 'vip',
        tier: 3,
        duration: 30,
      },
      {
        name: 'Vip Gigante',
        description: 'Vip Mediano + 10000 bellys + reducción del 25% (1 mes).',
        oneTimePrice: 17.99,
        limitedDurationPrice: 9.99,
        stock: 100,
        imageUrl: 'https://example.com/vip-gigante.png',
        categoryId: vipCategory.id,
        type: 'vip',
        tier: 4,
        duration: 30,
      },
      {
        name: 'Vip Nouraquiano',
        description: 'Vip Gigante + 100000 bellys + tienda específica + ofertas de la tienda.',
        oneTimePrice: 27.99,
        limitedDurationPrice: 14.99,
        stock: 100,
        imageUrl: 'https://example.com/vip-nouraquiano.png',
        categoryId: vipCategory.id,
        type: 'vip',
        tier: 5,
        duration: 30,
      },
      // Reducciones
      {
        name: 'Reducción del 25%',
        description: 'Reducción del 25% en la tienda de Minecraft.',
        oneTimePrice: 2.30,
        limitedDurationPrice: 2.30,
        crewPrice: 11.50,
        stock: 100,
        imageUrl: 'https://example.com/reduction-25.png',
        categoryId: reductionCategory.id,
        type: 'reduction',
        duration: 30,
      },
      {
        name: 'Reducción del 40%',
        description: 'Reducción del 40% en la tienda de Minecraft.',
        oneTimePrice: 3.60,
        limitedDurationPrice: 3.60,
        crewPrice: 18.40,
        stock: 100,
        imageUrl: 'https://example.com/reduction-40.png',
        categoryId: reductionCategory.id,
        type: 'reduction',
        duration: 30,
      },
      {
        name: 'Reducción del 50%',
        description: 'Reducción del 50% en la tienda de Minecraft.',
        oneTimePrice: 4.60,
        limitedDurationPrice: 4.60,
        crewPrice: 23.00,
        stock: 100,
        imageUrl: 'https://example.com/reduction-50.png',
        categoryId: reductionCategory.id,
        type: 'reduction',
        duration: 30,
      },
      {
        name: 'Reducción de la tienda específica (25%)',
        description: 'Reducción del 25% en la tienda específica (1 mes).',
        oneTimePrice: 7.00,
        limitedDurationPrice: 7.00,
        stock: 100,
        imageUrl: 'https://example.com/reduction-store-specific.png',
        categoryId: reductionCategory.id,
        type: 'reduction',
        duration: 30,
      },
    ],
  });
}

resetDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
