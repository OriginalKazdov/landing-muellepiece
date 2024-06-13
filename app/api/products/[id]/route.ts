// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      category: true,
    },
  });

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
