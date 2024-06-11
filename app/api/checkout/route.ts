// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import db from '../../../utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function POST(request: Request) {
  const { cartItems, minecraftNickname, email } = await request.json();
  
  // Calcula el total del pedido
  const totalAmount = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  // Crear el pago en Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // Stripe maneja cantidades en centavos
    currency: 'eur',
    metadata: { minecraftNickname, email },
  });

  // Guardar el pedido en la base de datos
  const [orderResult] = await db.query('INSERT INTO orders (minecraft_nickname, order_date, status, total, email, payment_id) VALUES (?, NOW(), ?, ?, ?, ?)', [minecraftNickname, 'pending', totalAmount, email, paymentIntent.id]);

  const orderId = (orderResult as any).insertId;

  // Guardar los elementos del pedido en la base de datos
  for (const item of cartItems) {
    await db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.id, item.quantity, item.price]);
  }

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderId });
}
