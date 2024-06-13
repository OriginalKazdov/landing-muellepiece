// app/api/orders/route.ts

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
      include: { orderItems: true },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, minecraftNickname, email } = await req.json();
    
    const totalAmount = cartItems.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
    
    const order = await prisma.order.create({
      data: {
        minecraftNickname,
        orderDate: new Date(),
        status: 'pending',
        total: totalAmount,
        email,
        orderItems: {
          create: cartItems.map((item: { id: any; quantity: any; price: any; }) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
