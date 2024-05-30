import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


export default function Home() {
    const images = [
        '/carr1.png',
        '/carr2.png',
        '/carr3.png',
        '/carr4.png',
        '/carr5.png',
    ];

    const duplicatedImages = [...images, ...images]

    return (
        <div className='bg-blue-piece-400'>
            <div className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="flex animate-scroll">
                        {duplicatedImages.map((src, index) => (
                            <div key={index} className="relative min-w-full h-[60vh] flex-nowrap">
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="object-cover blur-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 p-4 bg-black bg-opacity-50 rounded-2xl w-[80%]">
                    <h1 className="text-4xl md:text-6xl font-bold font-openSans text-white">MuellePiece</h1>
                    <p className="mt-4 text-lg md:text-xl font-openSans text-white font-bold">Únete a nuestro servidor de Minecraft y comunidad de Discord</p>
                    <Button asChild className='mt-6 px-6 py-3 text-lg font-semibold text-blue-piece-100 bg-blue-piece-400 hover:bg-blue-piece-500 hover:text-blue-piece-200 shadow-md transition duration-300 rounded-xl'>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </div>


            <div className='flex flex-wrap gap-8 p-6 justify-center'>
                <Card className='rounded-2xl w-[400px]'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>

                <Card className='rounded-2xl w-[400px]'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>

                <Card className='rounded-2xl w-[400px]'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>

                <Card className='rounded-2xl w-[400px]'>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}