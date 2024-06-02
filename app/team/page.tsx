import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Component() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-piece-500 via-blue-piece-400 to-blue-piece-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Meet Our Team</h2>
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
    name: 'John Doe',
    role: 'CEO & Co-Founder',
    description: 'John is the visionary behind our company, leading the team with his innovative ideas and strategic thinking.',
  },
  {
    image: '/carr2.png',
    name: 'Jane Smith',
    role: 'CTO & Co-Founder',
    description: 'Jane is the technical mastermind behind our products, driving innovation and ensuring top-notch quality.',
  },
  {
    image: '/carr3.png',
    name: 'Michael Johnson',
    role: 'Head of Design',
    description: 'Michael is the creative force behind our stunning designs, ensuring our products are not only functional but also visually appealing.',
  },
  {
    image: '/carr4.png',
    name: 'Emily Davis',
    role: 'Lead Developer',
    description: 'Emily is the driving force behind our cutting-edge technology, ensuring our products are built with the latest and greatest.',
  },
];
