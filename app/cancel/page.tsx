'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-red-400 to-red-300">
      <h1 className="text-4xl font-bold text-white mb-4">Pago Cancelado</h1>
      <p className="text-xl text-white mb-4">Lo sentimos, su pago ha sido cancelado. Si tiene alguna pregunta, por favor contáctenos.</p>
      <Link href="/tienda" className="bg-white text-red-500 px-4 py-2 rounded shadow hover:bg-red-100 transition">
        Volver a MuellePiece
      </Link>
    </div>
  );
};

export default CancelPage;
