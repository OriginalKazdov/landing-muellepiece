"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, Category } from "@prisma/client";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const router = useRouter();

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

  const handleRedirect = (productId: number) => {
    router.push(`/tienda/${productId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Products</h1>
      
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
          value={selectedCategory || ""}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-semibold">
              {product.type === 'reduction' 
                ? `Individual: $${product.oneTimePrice} | Crew: $${product.crewPrice}` 
                : (
                  <>
                    {product.oneTimePrice ? `One-time: $${product.oneTimePrice}` : null}
                    {product.limitedDurationPrice ? ` Monthly: $${product.limitedDurationPrice}` : null}
                  </>
                )
              }
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleRedirect(product.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Comprar
              </button>
              <Link href={`/tienda/${product.id}`}>
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
