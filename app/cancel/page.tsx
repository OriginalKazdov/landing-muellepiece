'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/app/components/ui/Loader';

const CancelPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderID = searchParams.get('orderID');
  const [loading, setLoading] = useState(true); // Añadir estado de carga
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderID) {
      const cancelOrder = async () => {
        try {
          const response = await fetch('/api/cancel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderID }),
          });

          if (response.ok) {
            console.log('Order cancelled successfully');
          } else {
            setError('Error cancelling the order');
          }
        } catch (error) {
          console.error('Error cancelling the order:', error);
          setError('Error cancelling the order');
        } finally {
          setLoading(false); // Finalizar carga
        }
      };

      cancelOrder();
    } else {
      setLoading(false); // Finalizar carga si no hay orderID
    }
  }, [orderID]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-red-400 to-red-300">
        <Loader size={60} className="text-white" />
        <p className="mt-4 text-white text-lg">Procesando cancelación...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-red-400 to-red-300">
      {error ? (
        <p className="mt-4 text-white text-lg">{error}</p>
      ) : (
        <>
          <p className="mt-4 text-white text-lg">Tu pago ha sido cancelado.</p>
          <button 
            onClick={() => router.push('/tienda')} 
            className="px-4 py-2 bg-white text-red-500 rounded-lg mt-4"
          >
            Volver a la tienda
          </button>
        </>
      )}
    </div>
  );
};

export default CancelPage;
