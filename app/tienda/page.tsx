// app/tienda/page.tsx
"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <Image
              src={`/images/${product.imageUrl}`}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <Link href={`/products/${product.id}`}>
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
