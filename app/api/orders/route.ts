// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import db from '../../../utils/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minecraftNickname = searchParams.get('minecraftNickname');

  if (!minecraftNickname) {
    return NextResponse.json({ error: 'minecraftNickname is required' }, { status: 400 });
  }

  const [rows] = await db.query('SELECT * FROM orders WHERE minecraft_nickname = ?', [minecraftNickname]);
  return NextResponse.json(rows);
}
