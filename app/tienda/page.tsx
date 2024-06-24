"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Category } from "@prisma/client";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data: Category[] = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const url = selectedCategory
        ? `/api/products?categoryId=${selectedCategory}`
        : "/api/products";
      const response = await fetch(url);
      const data: Product[] = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300 min-h-screen">
      <div className="container px-4 md:px-6 flex flex-col justify-between h-full">
        <div>
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">Nuestros Productos</h2>
          </div>
          <div className="mb-8 flex flex-wrap justify-center space-x-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded text-white text-lg ${selectedCategory === null ? 'border-b-4 border-blue-piece-500' : 'hover:border-b-4 hover:border-blue-piece-500'}`}
            >
              Todas las Categorías
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded text-white text-lg ${selectedCategory === category.id ? 'border-b-4 border-blue-piece-500' : 'hover:border-b-4 hover:border-blue-piece-500'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="rounded-xl overflow-hidden shadow-lg transition-transform transform bg-white dark:bg-gray-950">
                  <div className="relative h-64 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse mb-4"></div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
                      <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product, index) => (
                <Card key={product.id} className="rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white dark:bg-gray-950">
                  <Link href={`/tienda/${product.id}`} className="block" prefetch={false}>
                    <CardHeader className="relative h-64">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index === 0} // Asumiendo que la primera imagen es la más importante
                      />
                    </CardHeader>
                  </Link>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl font-semibold mb-2">
                      <Link href={`/tienda/${product.id}`} className="hover:text-blue-piece-200 transition-colors" prefetch={false}>
                        {product.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400 mb-4">
                      {product.description}
                    </CardDescription>
                    <div className="flex gap-2">
                      <Link href={`/tienda/${product.id}`}>
                        <Button size="sm" className="flex-1 bg-blue-piece-200 hover:bg-blue-piece-300 text-white rounded-xl">
                          Comprar
                        </Button>
                      </Link>
                      <Link href={`/tienda/${product.id}`}>
                        <Button size="sm" variant="outline" className="flex-1 border-blue-piece-200 text-blue-piece-200 hover:bg-blue-piece-200 hover:text-white rounded-xl">
                          Ver Más
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
