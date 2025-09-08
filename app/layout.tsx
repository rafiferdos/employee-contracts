import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

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
   return (
      <html suppressHydrationWarning lang='en'>
         <head />
         <body
            className={clsx(
               "min-h-screen text-foreground bg-background font-sans antialiased",
               fontSans.variable
            )}
         >
            <Providers
               themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
               <div className='relative flex flex-col h-screen'>
                  {/* Navbar */}
                  <div className='fixed top-0 left-0 w-full z-50'>
                     {require("@/components/navbar").default()}
                  </div>
                  <main className='container mx-auto max-w-7xl pt-20 px-6 flex-grow'>
                     {children}
                  </main>
               </div>
            </Providers>
         </body>
      </html>
   );
}
