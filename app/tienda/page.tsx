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
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-white">Nuestros Productos</h2>
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
            <Card key={product.id} className="rounded-2xl overflow-hidden group shadow-lg">
              <Link href={`/tienda/${product.id}`} className="block" prefetch={false}>
                <CardHeader className="overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
              </Link>
              <CardContent className="p-4 bg-white dark:bg-gray-950">
                <CardTitle className="text-lg font-semibold mb-2">
                  <Link href={`/tienda/${product.id}`} className="hover:text-blue-piece-200 transition-colors" prefetch={false}>
                    {product.name}
                  </Link>
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400 mb-4">
                  {product.description}
                </CardDescription>
                <div className="flex gap-2">
                  <Link href={`/tienda/${product.id}`}>
                    <Button size="sm" className="flex-1 bg-blue-piece-200 hover:bg-blue-piece-300 text-white rounded-2xl">
                      Comprar
                    </Button>
                  </Link>
                  <Link href={`/tienda/${product.id}`}>
                    <Button size="sm" variant="outline" className="flex-1 border-blue-piece-200 text-blue-piece-200 hover:bg-blue-piece-200 hover:text-white rounded-2xl">
                      Ver Más
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
