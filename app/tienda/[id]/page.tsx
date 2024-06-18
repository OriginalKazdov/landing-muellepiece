"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

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
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-2">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="object-cover rounded-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
              <p className="mt-2 text-gray-100">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
              <p className="mt-2 text-gray-600">
                Por favor ingrese su nickname de Minecraft y correo electrónico para completar el proceso de compra.
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handlePurchase();}}>
              <div>
                <Label htmlFor="nickname">Minecraft Nickname</Label>
                <Input 
                  id="nickname" 
                  type="text" 
                  placeholder="Ingrese su nickname de Minecraft" 
                  required 
                  value={minecraftNickname}
                  onChange={(e) => setMinecraftNickname(e.target.value)}
                  className="w-full"
                />
                {errors.nickname && <p className="text-red-500">{errors.nickname}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Ingrese su correo electrónico" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mt-4">
                {product.uniquePay && (
                  <Button 
                    type="button" 
                    onClick={() => setPriceType('uniquePay')} 
                    className={`w-full mb-2 ${priceType === 'uniquePay' ? 'bg-blue-piece-500' : 'bg-blue-piece-300'} text-white hover:bg-blue-piece-400`}
                  >
                    Comprar Pago Único - ${product.uniquePay}
                  </Button>
                )}
                {product.durationPay && (
                  <Button 
                    type="button" 
                    onClick={() => setPriceType('durationPay')} 
                    className={`w-full ${priceType === 'durationPay' ? 'bg-green-700' : 'bg-green-500'} text-white hover:bg-green-600`}
                  >
                    Comprar Pago Mensual - ${product.durationPay}
                  </Button>
                )}
              </div>
              <Button type="submit" className="w-full bg-blue-piece-500 hover:bg-blue-piece-400 text-white">
                Comprar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
