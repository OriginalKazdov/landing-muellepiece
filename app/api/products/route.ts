// app/api/products/route.ts
import { NextResponse } from 'next/server';
import db from '../../../utils/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');

  let query = 'SELECT * FROM products WHERE 1=1';
  const params: (string | number)[] = [];

  if (type) {
    query += ' AND type = ?';
    params.push(type as string);
  }

  if (category) {
    query += ' AND category_id = ?';
    params.push(Number(category));
  }

  const [rows] = await db.query(query, params);
  return NextResponse.json(rows);
}
