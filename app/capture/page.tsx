'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CapturePage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    const captureOrder = async () => {
      if (isCaptured) return;

      setIsCaptured(true); // Prevent duplicate captures

      console.log('Attempting to capture order:', token);

      const response = await fetch('/api/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID: token }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Capture successful:', data);
        setMessage('Payment successful! Your order has been captured.');
      } else {
        console.error('Error capturing payment:', data);
        setMessage(`Error capturing payment: ${data.error}`);
      }
      setLoading(false);
    };

    if (token) {
      captureOrder();
    }
  }, [searchParams, isCaptured]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{message}</p>
      <button onClick={() => router.push('/tienda')}>Go back to shop</button>
    </div>
  );
}
