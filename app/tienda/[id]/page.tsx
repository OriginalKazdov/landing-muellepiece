"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@prisma/client";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [minecraftNickname, setMinecraftNickname] = useState("");
  const [email, setEmail] = useState("");
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

  if (!product) {
    return <div>Loading...</div>;
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePurchase = async (isOneTimePurchase: boolean, isCrewPurchase: boolean) => {
    if (!minecraftNickname) {
      alert("Minecraft Nickname is required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        minecraftNickname,
        email,
        isCrewPurchase,
        isOneTimePurchase: product.type !== 'reduction' ? isOneTimePurchase : undefined,
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
            {product.type === 'reduction' 
              ? `Individual: $${product.oneTimePrice ?? 0} | Crew: $${product.crewPrice ?? 0}` 
              : `Price: $${product.oneTimePrice ?? 0}`
            }
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
          <div className="mt-4 flex flex-col gap-2">
            {product.type === 'reduction' ? (
              <>
                <button
                  onClick={() => handlePurchase(true, false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Comprar Individual
                </button>
                <button
                  onClick={() => handlePurchase(true, true)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Comprar Crew
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handlePurchase(true, false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Comprar Pago Único
                </button>
                <button
                  onClick={() => handlePurchase(false, false)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Comprar Pago Mensual
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
