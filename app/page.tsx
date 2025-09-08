"use client";

import AnimatedBg from "@/components/animated-bg";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox='0 0 24 24'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'
         aria-hidden='true'
         {...props}
      >
         <path
            d='M4.5 12.75l6 6 9-13.5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
         />
      </svg>
   );
}

export default function Home() {
   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-12'>
         <AnimatedBg />
         <section className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
            <div className='space-y-6'>
               <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight'>
                  Mitarbeiterverträge, in Minuten erstellt
               </h1>
               <p className='text-lg text-muted-foreground'>
                  Erstellen Sie professionelle Arbeitsverträge in Deutsch oder Türkisch.
                  Einfache Eingabe, Live-Vorschau und PDF-Export – alles im Browser.
               </p>
               <div className='flex flex-wrap gap-3'>
                  <Button as={Link} href='/vertrag-erstellen' color='primary' size='lg'>
                     Vertrag jetzt erstellen
                  </Button>
                  <Button as={Link} href='#funktionen' variant='flat' size='lg'>
                     Funktionen ansehen
                  </Button>
               </div>
               <ul className='mt-4 space-y-2 text-foreground'>
                  {["Mehrsprachig (DE/TR)", "Live-Vorschau", "PDF-Export"].map((f) => (
                     <li key={f} className='flex items-center gap-2'>
                        <CheckIcon className='h-5 w-5 text-success' />
                        <span>{f}</span>
                     </li>
                  ))}
               </ul>
            </div>
            <div>
               <Card isBlurred className='bg-content1/60 shadow-xl'>
                  <CardHeader className='text-xl font-semibold'>Schneller Überblick</CardHeader>
                  <CardBody className='space-y-3 text-muted-foreground'>
                     <p>Geben Sie die Mitarbeiterdaten ein und sehen Sie sofort die Vorschau des Vertrags.</p>
                     <p>Exportieren Sie das Ergebnis als saubere PDF-Datei – ohne zusätzliche Software.</p>
                     <p>Das Design passt sich automatisch an Hell-/Dunkelmodus an.</p>
                  </CardBody>
               </Card>
            </div>
         </section>

         <section id='funktionen' className='max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[{
               title: "Formular",
               text: "Strukturiertes Formular mit Pflicht- und optionalen Feldern.",
            }, {
               title: "Vorschau",
               text: "Änderungen live sehen – keine Überraschungen im PDF.",
            }, {
               title: "Export",
               text: "Mit einem Klick als PDF herunterladen.",
            }].map((item) => (
               <Card key={item.title} isBlurred className='bg-background/60 shadow-lg'>
                  <CardHeader className='font-semibold'>{item.title}</CardHeader>
                  <CardBody className='text-muted-foreground'>{item.text}</CardBody>
               </Card>
            ))}
         </section>

         <section className='max-w-7xl mx-auto px-6 mt-16'>
            <Card isBlurred className='bg-content2/60 shadow-xl'>
               <CardBody className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div>
                     <h3 className='text-xl font-semibold'>Bereit loszulegen?</h3>
                     <p className='text-muted-foreground'>Starten Sie jetzt und erstellen Sie Ihren ersten Vertrag.</p>
                  </div>
                  <Button as={Link} href='/vertrag-erstellen' color='primary' size='lg'>
                     Vertrag erstellen
                  </Button>
               </CardBody>
            </Card>
         </section>
      </div>
   );
}
