"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";
import { NavigationProvider } from "@/components/navigation-context";
import { Providers } from "../app/providers";

export default function ClientLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const pathname = usePathname();

   return (
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
         <NavigationProvider>
            <div className='relative flex flex-col h-screen'>
               {/* Navbar */}
               <Navbar />
               <AnimatePresence mode='wait'>
                  <motion.main
                     key={pathname}
                     className='container mx-auto max-w-7xl pt-20 px-4 md:px-6 lg:px-8 flex-grow'
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                     {children}
                  </motion.main>
               </AnimatePresence>
            </div>
         </NavigationProvider>
      </Providers>
   );
}
