"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Category } from "@prisma/client";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = selectedCategory
        ? `/api/products?categoryId=${selectedCategory}`
        : "/api/products";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="container px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Nuestros Productos Destacados</h2>
        </div>
        <div className="mb-4">
          <select
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            value={selectedCategory || ""}
            className="border p-2 rounded"
          >
            <option value="">Todas las Categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg shadow-lg overflow-hidden group">
              <Link href={`/tienda/${product.id}`} className="block" prefetch={false}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-4 bg-white dark:bg-gray-950">
                <h3 className="text-lg font-semibold mb-2">
                  <Link href={`/tienda/${product.id}`} className="hover:text-primary transition-colors" prefetch={false}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
                <div className="flex gap-2">
                  <Link href={`/tienda/${product.id}`}>
                    <button className="px-4 py-2 bg-blue-piece-500 text-white rounded">Comprar</button>
                  </Link>
                  <Link href={`/tienda/${product.id}`}>
                    <button className="px-4 py-2 border border-blue-piece-500 text-blue-piece-500 rounded">Ver Más</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
