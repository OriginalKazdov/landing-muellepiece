'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BurgerIcon, CloseIcon } from '../utils/icons';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const dropdownMenu = document.getElementById('dropdownMenu');
        if (dropdownMenu) {
            dropdownMenu.style.display = isOpen ? 'block' : 'none';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="bg-blue-piece-100 w-full p-4 z-50 relative">
            <div className="flex container mx-auto justify-between items-center">
                <div>
                    <Link href='/home'>
                        <Image 
                            src='/logomp.png' 
                            alt="logo" 
                            width={50} 
                            height={50}
                            style={{ borderRadius: '50%' }}
                        />
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4 text-blue-piece-300 font-roboto text-base md:text-lg">
                    <ul className="flex space-x-4">
                        <li>
                            <Link href='/home' className="hover:text-white">Inicio</Link>
                        </li>
                        <li>
                            <Link href='/about' className="hover:text-white">Acerca</Link>
                        </li>
                        <li>
                            <Link href='/features' className="hover:text-white">Caracteristicas</Link>
                        </li>
                        <li>
                            <Link href='/team' className="hover:text-white">Equipo</Link>
                        </li>
                        <li>
                            <Link href='/testimonials' className="hover:text-white">Testimoniales</Link>
                        </li>
                        <li>
                            <Link href='/contact' className="hover:text-white">Contactanos</Link>
                        </li>
                    </ul>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={handleClick}>
                        {isOpen ? <CloseIcon /> : <BurgerIcon />}
                    </button>
                </div>
            </div>
            <div id="dropdownMenu" className="hidden md:hidden bg-blue-piece-100 text-blue-piece-300 font-roboto text-base md:text-lg absolute top-16 left-0 w-full p-4 z-50">
                <ul className="flex flex-col items-center space-y-4">
                    <li>
                        <Link href='/home' className="hover:text-white">Home</Link>
                    </li>
                    <li>
                        <Link href='/about' className="hover:text-white">About Us</Link>
                    </li>
                    <li>
                        <Link href='/features' className="hover:text-white">Features</Link>
                    </li>
                    <li>
                        <Link href='/team' className="hover:text-white">Team</Link>
                    </li>
                    <li>
                        <Link href='/testimonials' className="hover:text-white">Testimonials</Link>
                    </li>
                    <li>
                        <Link href='/contact' className="hover:text-white">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
