const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Cosmetics' },
      { name: 'VIP' },
      { name: 'Specific Store' },
      { name: 'Reduction Store' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Small Cosmetic', description: 'Tier 1: solo estéticos, pequeños.', imageUrl: 'small_cosmetic.jpg', categoryId: 1, uniquePay: 0.55 },
      { name: 'Large Cosmetic', description: 'Tier 1: solo estéticos, grandes.', imageUrl: 'large_cosmetic.jpg', categoryId: 1, uniquePay: 0.99 },
      { name: 'Striking Cosmetic', description: 'Tier 2: estéticos, más llamativos.', imageUrl: 'striking_cosmetic.jpg', categoryId: 1, uniquePay: 1.30 },
      { name: 'Body Part Cosmetic', description: 'Tier 3: Skin o partes del cuerpo.', imageUrl: 'body_part_cosmetic.jpg', categoryId: 1, uniquePay: 1.40 },
      { name: 'Full Skin Cosmetic', description: 'Tier 3: Skin completa.', imageUrl: 'full_skin_cosmetic.jpg', categoryId: 1, uniquePay: 1.90, durationPay: 2.90 },
      { name: 'Exclusive Item', description: 'Tier 4: Objetos exclusivos con beneficios.', imageUrl: 'exclusive_item.jpg', categoryId: 1, uniquePay: 5.00 },
      { name: 'Random Item', description: 'Ruleta de ítems con diversos valores y porcentajes.', imageUrl: 'random_item.jpg', categoryId: 1, uniquePay: 3.00 },

      { name: 'VIP Enano', description: 'Notoriedad en sugerencias, canal especial de VIPs, 15000 bellys, Tier 1(C)', imageUrl: 'vip_enano.jpg', categoryId: 2, uniquePay: 5.99, durationPay: 2.99 },
      { name: 'VIP Pequeño', description: 'VIP Enano + elección de un cosmético + 30000 bellys', imageUrl: 'vip_pequeno.jpg', categoryId: 2, uniquePay: 8.00, durationPay: 5.00 },
      { name: 'VIP Mediano', description: 'VIP Pequeño + 60000 bellys + elección de 3 cosméticos', imageUrl: 'vip_mediano.jpg', categoryId: 2, uniquePay: 15.99, durationPay: 8.67 },
      { name: 'VIP Gigante', description: 'VIP Mediano + 10000 bellys + reducción del 25% (1 mes)', imageUrl: 'vip_gigante.jpg', categoryId: 2, uniquePay: 17.99, durationPay: 9.99 },
      { name: 'VIP Nouraquiano', description: 'VIP Gigante + 100000 bellys + tienda específica + ofertas de la tienda', imageUrl: 'vip_nouraquiano.jpg', categoryId: 2, uniquePay: 27.99, durationPay: 14.99 },

      { name: 'Store Reduction 25% Individual', description: 'Reducción del 25% en la tienda (individual)', imageUrl: 'reduction_25_individual.jpg', categoryId: 4, uniquePay: 2.30, durationPay: 11.50 },
      { name: 'Store Reduction 40% Individual', description: 'Reducción del 40% en la tienda (individual)', imageUrl: 'reduction_40_individual.jpg', categoryId: 4, uniquePay: 3.60, durationPay: 18.40 },
      { name: 'Store Reduction 50% Individual', description: 'Reducción del 50% en la tienda (individual)', imageUrl: 'reduction_50_individual.jpg', categoryId: 4, uniquePay: 4.60, durationPay: 23.00 },
      { name: 'Specific Store Access', description: 'Acceso a la tienda específica, con objetos exclusivos y valiosos.', imageUrl: 'specific_store.jpg', categoryId: 3, uniquePay: 10.00, durationPay: 7.00 },
    ],
  });

  console.log('Seeding completed');
}

main()
  .then(() => console.log('Seeding completed'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
