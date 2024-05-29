import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const images = [
        '/carr1.png',
        '/carr2.png',
        '/carr3.png',
        '/carr4.png',
        '/carr5.png',
    ];

    return (
        <div className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="flex animate-scroll">
                    {images.map((src, index) => (
                        <div key={index} className="relative min-w-full h-[60vh]">
                            <Image
                                src={src}
                                alt={`Image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white font-openSans">MuellePiece</h1>
                <p className="mt-4 text-lg md:text-xl text-white font-openSans">Únete a nuestro servidor de Minecraft y comunidad de Discord</p>
            </div>
        </div>
    );
}
