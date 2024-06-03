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

    // Array de objetos con información específica para cada tarjeta
    const cards = [
        {
            title: 'Conocenos',
            description: 'Quienes somos? Que hacemos? Que nos motiva?',
            content: 'Si quieres saber mas acerca de nosotros dale al boton de abajo.',
            buttonText: 'Saber más',
            link: '/about',
            bgImage: '/conocesimg.png' // Imagen de fondo para esta tarjeta
        },
        {
            title: 'Features',
            description: 'Que nos diferencia de los otros servidores?',
            content: 'Conoce que nos diferencia de otros servidores y las experiencias que te podemos ofrecer',
            buttonText: 'Features',
            link: '/features',
            bgImage: '/featuresimg.png' // Imagen de fondo para esta tarjeta
        },
        {
            title: 'Nuestro equipo',
            description: 'Quienes trabajan para que esto sea posible',
            content: 'Ven a ver quienes hacen que esto sea posible, quienes buscan brindarte la mejor experiencia posible.',
            buttonText: 'Equipo',
            link: '/team',
            bgImage: '/equipo.png' // Imagen de fondo para esta tarjeta
        },
        {
            title: 'No nos crees?',
            description: 'Miralo por ti mismo',
            content: 'Acercate a ver que opina la gente de nosotros',
            buttonText: 'Testimonials',
            link: '/testimonials',
            bgImage: '/nonoscreesimg.png' // Imagen de fondo para esta tarjeta
        }
    ];

    return (
        <div className='bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300'>
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
                    <Button asChild className='mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-piece-200 hover:bg-blue-piece-300 hover:text-blue-piece-100 shadow-md transition duration-300 rounded-xl'>
                        <Link href="/">Discord</Link>
                    </Button>
                </div>
            </div>

            <div className='py-16 text-center'>
                <h2 className="text-3xl md:text-4xl font-bold font-openSans text-white mb-4">Bienvenido a MuellePiece</h2>
                <p className="text-lg md:text-xl text-white">Descubre un mundo lleno de aventuras en nuestro servidor de Minecraft. Únete a nuestra comunidad de jugadores y disfruta de eventos exclusivos, misiones épicas y mucho más.</p>
            </div>

            <div className='flex flex-wrap gap-8 px-6 py-16 justify-center'>
                {cards.map((card, index) => (
                    <Card key={index} className='relative rounded-2xl shadow-lg transition-transform transform hover:scale-105 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex flex-col justify-center items-center text-center overflow-hidden'>
                        <div className="absolute inset-0">
                            <Image
                                src={card.bgImage}
                                alt={card.title}
                                layout="fill"
                                objectFit="cover"
                                className="object-cover filter blur-sm"
                            />
                            <div className="absolute inset-0 bg-black opacity-30"></div>
                        </div>
                        <div className="relative z-10 p-4 text-white">
                            <CardHeader>
                                <CardTitle className="font-roboto text-white">{card.title}</CardTitle>
                                <CardDescription className="text-white">{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{card.content}</p>
                            </CardContent>
                            <CardFooter className="flex justify-center w-full">
                                <Button className='mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-piece-200 hover:bg-blue-piece-300 hover:text-blue-piece-100 shadow-md transition duration-300 rounded-xl'>
                                    <Link href={card.link}>{card.buttonText}</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>

            <div className='py-16'></div>
        </div>
    );
}
