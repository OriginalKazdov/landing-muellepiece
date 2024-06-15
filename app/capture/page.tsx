'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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

        console.log('Attempting to capture order:', token);

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
            console.log('Capture successful:', data);
            setMessage('Payment successful! Your order has been captured.');
          } else {
            console.error('Error capturing payment:', data);
            setMessage(`Error capturing payment: ${data.error}`);
          }
        } catch (error) {
          console.error('Error:', error);
          if (error instanceof Error) {
            setMessage(`Error capturing payment: ${error.message}`);
          } else {
            setMessage('An unexpected error occurred');
          }
        }

        setLoading(false);
      };

      captureOrder();
    }
  }, [token, isCaptured]);

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

export default function CapturePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaptureContent />
    </Suspense>
  );
}
