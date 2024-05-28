'use client'

import Link from "next/link";
import Image from "next/image";
import { BurgerIcon, CloseIcon } from '../utils/icons'
import React, { useState } from 'react';

export default function Navbar() {
    const [isOpen, setisOpen] = useState(false)
    const handleClick = () => {
        setisOpen(!isOpen);
    }

    return (
        <nav className="bg-blue-piece-100">
            <div className="flex container mx-auto justify-between items-center">
                <div>
                    <Image 
                    src='/logomp.png' 
                    alt="logo" 
                    width={50} 
                    height={50}
                    style={{borderRadius: '50%'}}
                    />
                </div>
                <div className="text-blue-piece-300 font-roboto hidden md:flex">
                    <ul>
                        <li>
                            <Link href='/home'>Home</Link>
                        </li>
                        <li>
                            <Link href='/about'>About Us</Link>
                        </li>
                        <li>
                            <Link href='/features'>Features</Link>
                        </li>
                        <li>
                            <Link href='/team'>Team</Link>
                        </li>
                        <li>
                            <Link href='/testimonials'>Testimonials</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={handleClick}>
                        {isOpen ? <CloseIcon /> : <BurgerIcon/>}
                    </button>
                </div>
            </div>
        </nav>
    )
}