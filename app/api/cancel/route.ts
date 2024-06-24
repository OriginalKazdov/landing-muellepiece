import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    // Check if order exists
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderID) },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found in database' }, { status: 404 });
    }

    // Update order status to cancelled
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'cancelled' },
    });

    return NextResponse.json({ message: 'Order cancelled successfully' });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: 'Error cancelling order', details: error.message }, { status: 500 });
  }
}
