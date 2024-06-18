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

export async function POST(req: NextRequest) {
  try {
    const { productId, minecraftNickname, email, priceType } = await req.json();

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const price = priceType === 'uniquePay' ? product.uniquePay : product.durationPay;
    if (!price) {
      return NextResponse.json({ error: 'Invalid price type' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        minecraftNickname,
        orderDate: new Date(),
        status: 'pending',
        total: price,
        email,
        priceType,
        price,
        productId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
