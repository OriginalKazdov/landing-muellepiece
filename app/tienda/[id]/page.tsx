"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@prisma/client";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [minecraftNickname, setMinecraftNickname] = useState("");
  const [email, setEmail] = useState("");
  const [priceType, setPriceType] = useState<'uniquePay' | 'durationPay'>('uniquePay'); 
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const priceTypeParam = params.get('priceType') as 'uniquePay' | 'durationPay';
    if (priceTypeParam) {
      setPriceType(priceTypeParam);
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handlePurchase = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        minecraftNickname,
        email,
        priceType,
      }),
    });

    const data = await response.json();
    if (data.approveUrl) {
      window.location.href = data.approveUrl;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">{product.name}</h1>
      <div className="flex">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="object-cover"
        />
        <div className="ml-8">
          <p className="text-lg">{product.description}</p>
          <p className="text-xl font-semibold">
            {product.uniquePay ? `One-time: $${product.uniquePay}` : null}
            {product.durationPay ? ` Monthly: $${product.durationPay}` : null}
          </p>
          <div className="mt-4">
            <label className="block mb-2">Minecraft Nickname:</label>
            <input
              type="text"
              value={minecraftNickname}
              onChange={(e) => setMinecraftNickname(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handlePurchase}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
