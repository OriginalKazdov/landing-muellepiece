// app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import paypal from '@paypal/checkout-server-sdk';

const prisma = new PrismaClient();

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest) {
  try {
    const { cartItems, minecraftNickname, email } = await req.json();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart items are required and should be an array' }, { status: 400 });
    }

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        minecraftNickname,
        orderDate: new Date(),
        status: 'pending',
        total: totalAmount,
        email,
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: totalAmount.toFixed(2),
        },
      }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      },
    });

    const response = await client.execute(request);
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: response.result.id },
    });

    return NextResponse.json({ id: response.result.id, approveUrl: response.result.links.find((link: { rel: string; }) => link.rel === 'approve').href, dbOrderId: order.id });
  } catch (err) {
    const error = err as Error
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order', details: error.message }, { status: 500 });
  }
}
