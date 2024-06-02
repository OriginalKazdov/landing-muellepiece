// app/about/page.jsx
import Image from 'next/image';
import { Button } from "@/components/ui/button"

export default function About() {
    return (
        <div className='bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300 py-10'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-roboto text-center text-white mb-8'>Acerca de nosotros</h2>
                <div className='flex flex-col items-center space-y-12'>
                    <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
                        <div className='w-full md:w-1/2'>
                            <div className='relative w-full h-64'>
                                <Image 
                                    src='/carr1.png' 
                                    alt='Description of image 1' 
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded-lg'
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <p className='text-lg font-openSans text-white'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
                        <div className='w-full md:w-1/2 md:order-2'>
                            <div className='relative w-full h-64'>
                                <Image 
                                    src='/carr2.png' 
                                    alt='Description of image 2' 
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded-lg'
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <p className='text-lg font-openSans text-white'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8'>
                        <div className='w-full md:w-1/2'>
                            <div className='relative w-full h-64'>
                                <Image 
                                    src='/carr3.png' 
                                    alt='Description of image 3' 
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded-lg'
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-1/2'>
                            <p className='text-lg font-openSans text-white'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus.
                            </p>
                        </div>
                    </div>

                    <div className='w-full border-t border-white mt-8 pt-4'>
                        <p className='text-center text-lg font-openSans text-white mb-4'>
                            Podes visitar nuestro Google Sites para ver nuestra wiki del servidor.
                        </p>
                        <div className='flex justify-center'>
                            <Button className='mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-piece-200 hover:bg-blue-piece-300 hover:text-blue-piece-100 shadow-md transition duration-300 rounded-xl'>
                                Visitar Wiki
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
