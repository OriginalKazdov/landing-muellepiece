'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/app/components/ui/Loader';

function CaptureContent() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    if (token && !isCaptured) {
      const captureOrder = async () => {
        setIsCaptured(true); // Prevent duplicate captures

        console.log('Intentando capturar la orden:', token);

        try {
          const response = await fetch('/api/capture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderID: token }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log('Captura exitosa:', data);
            setMessage('¡Pago exitoso! Tu pedido ha sido capturado.');
          } else {
            console.error('Error capturando el pago:', data);
            setMessage(`Error capturando el pago: ${data.error}`);
          }
        } catch (error) {
          console.error('Error:', error);
          if (error instanceof Error) {
            setMessage(`Error capturando el pago: ${error.message}`);
          } else {
            setMessage('Ocurrió un error inesperado');
          }
        }

        setLoading(false);
      };

      captureOrder();
    }
  }, [token, isCaptured]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
        <Loader size={60} className="text-white" />
        <p className="mt-4 text-white text-lg">Procesando tu pago...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Estado del Pago</h1>
        <p className="mb-4">{message}</p>
        <button 
          onClick={() => router.push('/tienda')} 
          className="px-4 py-2 bg-blue-piece-500 hover:bg-blue-piece-400 text-white rounded-lg"
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}

export default function CapturePage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
        <Loader size={60} className="text-white" />
        <p className="mt-4 text-white text-lg">Cargando...</p>
      </div>
    }>
      <CaptureContent />
    </Suspense>
  );
}
