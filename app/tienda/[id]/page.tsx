"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import Loader from "@/app/components/ui/Loader"; // Asegúrate de ajustar la ruta de importación según tu estructura de carpetas

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [minecraftNickname, setMinecraftNickname] = useState("");
  const [email, setEmail] = useState("");
  const [priceType, setPriceType] = useState<'uniquePay' | 'durationPay'>('uniquePay'); 
  const { id } = useParams();
  const router = useRouter();
  const [errors, setErrors] = useState<{ nickname: string; email: string }>({
    nickname: '',
    email: '',
  });
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [purchaseLoading, setPurchaseLoading] = useState(false); // Estado para el indicador de carga de la compra

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setCategory(data.category.name);
        setLoading(false);
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

    setPurchaseLoading(true); // Activar el indicador de carga de la compra

    try {
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
    } catch (error) {
      console.error("Error processing purchase:", error);
      setPurchaseLoading(false); // Desactivar el indicador de carga de la compra si hay error
    }
  };

  if (loading || !product || purchaseLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
        <Loader size={150} className="text-white" />
        <p className="mt-4 text-xl text-white">{purchaseLoading ? "Procesando Compra..." : "Cargando Producto..."}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Lado izquierdo: imagen del producto */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="p-8">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        {/* Lado derecho: información del producto y formulario */}
        <div className="flex-1 p-8">
          <h2 className="text-4xl font-bold text-gray-800">{product.name}</h2>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <div className="mt-8">
            <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handlePurchase();}}>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input 
                  id="nickname" 
                  type="text" 
                  placeholder="Enter your nickname" 
                  required 
                  value={minecraftNickname}
                  onChange={(e) => setMinecraftNickname(e.target.value)}
                  className="w-full mt-2"
                />
                {errors.nickname && <p className="text-red-500">{errors.nickname}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mt-4">
                <p className="text-gray-600">Payment Options:</p>
                <div className="flex flex-col space-y-4 mt-2">
                  <Button 
                    type="button" 
                    onClick={() => setPriceType('uniquePay')} 
                    className={`w-full ${priceType === 'uniquePay' ? 'bg-blue-piece-500' : 'bg-blue-piece-300'} text-white hover:bg-blue-piece-400 rounded-2xl`}
                    disabled={purchaseLoading}
                  >
                    Permanent Pay - ${product.uniquePay}
                  </Button>
                  {product.durationPay && (
                    <Button 
                      type="button" 
                      onClick={() => setPriceType('durationPay')} 
                      className={`w-full ${priceType === 'durationPay' ? 'bg-green-700' : 'bg-green-500'} text-white hover:bg-green-600 rounded-2xl`}
                      disabled={purchaseLoading}
                    >
                      Limited Duration Pay - ${product.durationPay}
                    </Button>
                  )}
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-piece-500 hover:bg-blue-piece-400 text-white flex justify-center items-center rounded-2xl mt-4"
                disabled={purchaseLoading}
              >
                {purchaseLoading ? <Loader size={20} color="#ffffff" /> : 'Purchase'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
