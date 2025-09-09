"use client";

import AnimatedBg from "@/components/animated-bg";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { GlassyCard } from "@/components/glassy-card";
import Link from "next/link";
import { useNavigation } from "@/components/navigation-context";

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

function HomePage() {
   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-12'>
         <AnimatedBg />
         <section className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center'>
            <div className='space-y-6'>
               <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight'>
                  Mitarbeiterverträge, in Minuten erstellt
               </h1>
               <p className='text-lg text-muted-foreground'>
                  Erstellen Sie professionelle Arbeitsverträge in Deutsch oder
                  Türkisch. Einfache Eingabe, Live-Vorschau und PDF-Export –
                  alles im Browser.
               </p>
               <div className='flex flex-wrap gap-3'>
                  <Button
                     as={Link}
                     href='/vertrag-erstellen'
                     color='primary'
                     size='lg'
                     className='text-primary-foreground'
                  >
                     Vertrag jetzt erstellen
                  </Button>
                  <Button
                     as={Link}
                     href='#funktionen'
                     variant='flat'
                     size='lg'
                     className='text-foreground'
                  >
                     Funktionen ansehen
                  </Button>
               </div>
               <ul className='mt-4 space-y-2 text-foreground'>
                  {["Mehrsprachig (DE/TR)", "Live-Vorschau", "PDF-Export"].map(
                     (f) => (
                        <li key={f} className='flex items-center gap-2'>
                           <CheckIcon className='h-5 w-5 text-success' />
                           <span>{f}</span>
                        </li>
                     )
                  )}
               </ul>
            </div>
            <div>
               <GlassyCard>
                  <div className='text-xl font-semibold mb-4'>
                     Schneller Überblick
                  </div>
                  <div className='space-y-3 text-muted-foreground'>
                     <p>
                        Geben Sie die Mitarbeiterdaten ein und sehen Sie sofort
                        die Vorschau des Vertrags.
                     </p>
                     <p>
                        Exportieren Sie das Ergebnis als saubere PDF-Datei –
                        ohne zusätzliche Software.
                     </p>
                     <p>
                        Das Design passt sich automatisch an Hell-/Dunkelmodus
                        an.
                     </p>
                  </div>
               </GlassyCard>
            </div>
         </section>

         <section
            id='funktionen'
            className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'
         >
            {[
               {
                  title: "Formular",
                  text: "Strukturiertes Formular mit Pflicht- und optionalen Feldern.",
               },
               {
                  title: "Vorschau",
                  text: "Änderungen live sehen – keine Überraschungen im PDF.",
               },
               {
                  title: "Export",
                  text: "Mit einem Klick als PDF herunterladen.",
               },
            ].map((item) => (
               <GlassyCard key={item.title}>
                  <div className='font-semibold mb-2'>
                     {item.title}
                  </div>
                  <div className='text-muted-foreground'>
                     {item.text}
                  </div>
               </GlassyCard>
            ))}
         </section>

         <section className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-16'>
            <GlassyCard>
               <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div>
                     <h3 className='text-xl font-semibold'>
                        Bereit loszulegen?
                     </h3>
                     <p className='text-muted-foreground'>
                        Starten Sie jetzt und erstellen Sie Ihren ersten
                        Vertrag.
                     </p>
                  </div>
                  <Button
                     as={Link}
                     href='/vertrag-erstellen'
                     color='primary'
                     size='lg'
                     className='text-primary-foreground'
                  >
                     Vertrag erstellen
                  </Button>
               </div>
            </GlassyCard>
         </section>
      </div>
   );
}

function AboutPage() {
   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-12'>
         <AnimatedBg />
         <section className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
            <GlassyCard>
               <div className='text-center'>
                  <h1 className='text-4xl font-bold mb-6'>About Us</h1>
                  <p className='text-lg text-muted-foreground mb-4'>
                     Learn more about Mitarbeiterverträge and our mission to simplify contract creation.
                  </p>
                  <p className='text-muted-foreground'>
                     We provide easy-to-use tools for creating professional employment contracts in German and Turkish.
                  </p>
               </div>
            </GlassyCard>
         </section>
      </div>
   );
}

function ServicesPage() {
   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-12'>
         <AnimatedBg />
         <section className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
            <GlassyCard>
               <div className='text-center'>
                  <h1 className='text-4xl font-bold mb-6'>Our Services</h1>
                  <p className='text-lg text-muted-foreground mb-4'>
                     Discover the features that make contract creation effortless.
                  </p>
                  <ul className='text-left max-w-md mx-auto space-y-2'>
                     <li>• Multilingual support (DE/TR)</li>
                     <li>• Live preview functionality</li>
                     <li>• PDF export capabilities</li>
                     <li>• Responsive design</li>
                  </ul>
               </div>
            </GlassyCard>
         </section>
      </div>
   );
}

function ContactPage() {
   return (
      <div className='relative z-10 min-h-[calc(100vh-80px)] py-12'>
         <AnimatedBg />
         <section className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8'>
            <GlassyCard>
               <div className='text-center'>
                  <h1 className='text-4xl font-bold mb-6'>Contact Us</h1>
                  <p className='text-lg text-muted-foreground mb-4'>
                     Get in touch with our team for support or inquiries.
                  </p>
                  <p className='text-muted-foreground'>
                     Email: support@mitarbeitervertrage.com
                  </p>
               </div>
            </GlassyCard>
         </section>
      </div>
   );
}

export default function Page() {
   const { currentPage } = useNavigation();

   switch (currentPage) {
      case "/about":
         return <AboutPage />;
      case "/services":
         return <ServicesPage />;
      case "/contact":
         return <ContactPage />;
      default:
         return <HomePage />;
   }
}
