// app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return NextResponse.json(products);
}
