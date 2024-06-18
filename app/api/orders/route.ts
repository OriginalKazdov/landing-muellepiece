import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const minecraftNickname = searchParams.get('minecraftNickname');

  if (!minecraftNickname) {
    return NextResponse.json({ error: 'minecraftNickname is required' }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { minecraftNickname },
      include: { product: true },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}
