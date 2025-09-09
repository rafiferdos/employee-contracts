"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import Navbar from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { NavigationProvider } from "@/components/navigation-context";

export const metadata: Metadata = {
   title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
   },
   description: siteConfig.description,
   icons: {
      icon: "/favicon.ico",
   },
};

export const viewport: Viewport = {
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
   ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
       <html suppressHydrationWarning lang='en'>
          <head />
          <body
             className={clsx(
                "min-h-screen text-foreground bg-background font-sans antialiased bg-glass-gradient",
                fontSans.variable
             )}
          >
             <Providers
                themeProps={{ attribute: "class", defaultTheme: "dark" }}
             >
                <NavigationProvider>
                   <div className='relative flex flex-col h-screen'>
                      {/* Navbar */}
                      <Navbar />
                      <AnimatePresence mode="wait">
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
          </body>
       </html>
    );
}
