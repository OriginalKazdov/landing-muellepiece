'use client'

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-blue-piece-100 w-full p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <Image 
                        src='/logomp.png' 
                        alt="MuellePiece Logo" 
                        width={50} 
                        height={50} 
                        style={{ borderRadius: '50%' }} 
                    />
                    <span className="ml-2 text-white font-roboto text-sm md:text-base">&copy; 2024 MuellePiece. Todos los derechos reservados.</span>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <Link href='/contact' className="text-white font-roboto hover:text-gray-300">
                        Contactanos
                    </Link>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-white font-roboto hover:text-gray-300">
                        Discord
                    </a>
                </div>
            </div>
        </footer>
    );
}
