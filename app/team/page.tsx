import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Conoce a nuestro equipo</h2>
          <p className="max-w-[700px] mx-auto text-gray-200 md:text-xl dark:text-gray-200">
          Conoce a los talentosos individuos detrás de nuestro éxito.
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
    image: '/asta.png',
    name: 'XxAstaxX',
    role: 'Fundador y Diseñador de Muellepiece',
    description: 'Asta es el visionario detrás de Muellepiece, fundador y diseñador. Lidera este proyecto desde su concepción, enfocandose en brindar la mejor experiencia posible para el jugador.',
  },
  {
    image: '/nour.png',
    name: 'Nouraq',
    role: 'Fundador y Administrador de NPCs y Construcciones',
    description: 'Descripcion de Nour',
  },
  {
    image: '/maxiyami.png',
    name: 'Maxi-Yami',
    role: 'Fundador y Administrador de Sistemas',
    description: 'Maxi-Yami, programador y proveedor del servidor, se dedica a arreglar errores y problemas internos. Prefiere no ser mencionado; si lo haces, te llevarás una sorpresa. No es muy activo en los chats generales. Le enorgullece pertenecer al staff, ya que los compañeros son muy divertidos y amables.',
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
    description: 'Rodolfo es un veterano de Muellepiece con gran experiencia y sabiduría. Se encarga de la economía del servidor y está siempre disponible para escuchar a los miembros. Para cualquier problema o consejo, pueden acudir a él.',
  },
  {
    image: '/karma.png',
    name: 'Karma',
    role: 'Supervisor General',
    description: 'Karma es el manager del discord, supervisor y el que ayuda a los nuevos en el servidor a entenderlo, suele ayudar a la gente dentro del servidor con las dudas que puede responder.',
  },
  {
    image: '/carr4.png',
    name: 'Meca',
    role: 'Supervisor General',
    description: 'Meca descripcion',
  },
  {
    image: '/carr4.png',
    name: 'Kazdov',
    role: 'Programador y Moderador de Muellepiece',
    description: 'Kazdov descripcion',
  },
];
