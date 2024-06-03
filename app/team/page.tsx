import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Conoce a nuestro equipo</h2>
          <p className="max-w-[700px] mx-auto text-gray-200 md:text-xl dark:text-gray-200">
            Get to know the talented individuals behind our success.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-lg transition-transform transform hover:scale-105 overflow-hidden w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
            >
              <div className="relative w-full h-48">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">{member.role}</CardDescription>
                </CardHeader>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const teamMembers = [
  {
    image: '/carr1.png',
    name: 'XxAstaxX',
    role: 'Owner y Diseñador de Muellepiece',
    description: 'Asta es el visionario detrás de Muellepiece, fundador y diseñador. Lidera este proyecto desde su concepción, enfocandose en brindar la mejor experiencia posible para el jugador.',
  },
  {
    image: '/carr2.png',
    name: 'Nouraq',
    role: 'Owner y Administrador de NPCs y Construcciones',
    description: 'Descripcion de Nour',
  },
  {
    image: '/carr3.png',
    name: 'Maxi-Yami',
    role: 'Owner y Administrador de Sistemas',
    description: 'Maxi yami descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Deloko',
    role: 'Administrador y Planificador de Eventos',
    description: 'Deloko descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Rodolfo',
    role: 'Administrador y Economista del servidor',
    description: 'Rodolfo descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Karma',
    role: 'Administrador y Manager de Discord',
    description: 'Karma descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Meca',
    role: 'Administrador',
    description: 'Meca descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Kazdov',
    role: 'Programador y moderador de Muellepiece',
    description: 'Kazdov descripcion',
  },
];
