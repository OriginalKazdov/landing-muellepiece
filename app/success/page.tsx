// app/success/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderID = searchParams.get("token");

  useEffect(() => {
    if (orderID) {
      const captureOrder = async () => {
        const response = await fetch("/api/capture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderID }),
        });

        const data = await response.json();
        if (data.error) {
          console.error("Error capturing order:", data.error);
          // Handle the error as needed
        } else if (data.message === 'Order already captured') {
          console.log("Order already captured:", data);
        } else {
          console.log("Order captured successfully:", data);
        }
        router.push("/confirmation");
      };

      captureOrder();
    }
  }, [orderID, router]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Processing your payment...</h1>
    </div>
  );
};

export default SuccessPage;
