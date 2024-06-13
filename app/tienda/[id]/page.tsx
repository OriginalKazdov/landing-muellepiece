// app/tienda/[id]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  type: string;
  tier: string;
}

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const product = await fetchProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <Image
          src={`/images/${product.imageUrl}`}
          alt={product.name}
          width={500}
          height={400}
          className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0"
        />
        <div className="md:ml-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-green-600 font-bold text-2xl mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
}
