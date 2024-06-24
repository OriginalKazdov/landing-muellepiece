import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');

  try {
    const products = categoryId
      ? await prisma.product.findMany({
          where: { categoryId: Number(categoryId) },
          include: { category: true },
        })
      : await prisma.product.findMany({
          include: { category: true },
        });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}
