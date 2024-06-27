// app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import paypal from '@paypal/checkout-server-sdk';

const prisma = new PrismaClient();

// Seleccionar el entorno basado en la variable de entorno
const environment = process.env.PAYPAL_ENVIRONMENT === 'live'
  ? new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    )
  : new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET
    );

const client = new paypal.core.PayPalHttpClient(environment);

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

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: price.toFixed(2),
        },
        description: product.description, 
        custom_id: order.id.toString(),  
        soft_descriptor: "MUELLEPIECE",
      }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/capture?orderID=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?orderID=${order.id}`,
        brand_name: "MuellePiece",
        locale: "es-ES",
        user_action: "PAY_NOW",
      },
    });

    const response = await client.execute(request);
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: response.result.id },
    });

    return NextResponse.json({
      id: response.result.id,
      approveUrl: response.result.links.find((link: { rel: string; }) => link.rel === 'approve').href,
      dbOrderId: order.id
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: 'Error creating order', details: error.message }, { status: 500 });
  }
}

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
