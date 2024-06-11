// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import db from '../../../utils/db';

export async function GET() {
  const [rows] = await db.query('SELECT * FROM categories');
  return NextResponse.json(rows);
}
