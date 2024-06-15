// app/api/capture/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import paypal from '@paypal/checkout-server-sdk';

const prisma = new PrismaClient();

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();
    console.log('Received orderID:', orderID);

    const order = await prisma.order.findUnique({
      where: { paymentId: orderID },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found in database' }, { status: 404 });
    }

    // Check if the order is already captured
    if (order.status === 'completed') {
      return NextResponse.json({ message: 'Order already captured' });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    const capture = await client.execute(request);

    await prisma.order.update({
      where: { paymentId: orderID },
      data: { status: 'completed' },
    });

    return NextResponse.json({ capture });
  } catch (err) {
    const error = err as Error
    console.error('Error capturing payment:', error);
    return NextResponse.json({ error: 'Error capturing payment', details: error.message }, { status: 500 });
  }
}
