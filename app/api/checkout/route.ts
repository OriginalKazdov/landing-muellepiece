import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import paypal from '@paypal/checkout-server-sdk';

const prisma = new PrismaClient();

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
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
      }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/capture`,
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
    const error = err as Error;
    return NextResponse.json({ error: 'Error creating order', details: error.message }, { status: 500 });
  }
}
