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
  const [errors, setErrors] = useState<{ nickname: string; email: string }>({
    nickname: '',
    email: '',
  });

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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePurchase = async () => {
    let valid = true;
    const newErrors = { nickname: '', email: '' };

    if (!minecraftNickname) {
      newErrors.nickname = 'Nickname is required';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product?.id,
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

  if (!product) {
    return <div>Loading...</div>;
  }

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
            {errors.nickname && <p className="text-red-500">{errors.nickname}</p>}
          </div>
          <div className="mt-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mt-4">
            {product.uniquePay && (
              <button
                onClick={() => setPriceType('uniquePay')}
                className={`px-4 py-2 ${priceType === 'uniquePay' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded mr-2`}
              >
                Comprar Pago Único
              </button>
            )}
            {product.durationPay && (
              <button
                onClick={() => setPriceType('durationPay')}
                className={`px-4 py-2 ${priceType === 'durationPay' ? 'bg-green-700' : 'bg-green-500'} text-white rounded`}
              >
                Comprar Pago Mensual
              </button>
            )}
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
