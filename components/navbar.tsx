"use client";

import { Link } from "@heroui/link";
import {
   Navbar as HNavbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   NavbarMenuToggle,
} from "@heroui/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeSwitch } from "./theme-switch";
import SideMenu from "./side-menu";

export default function Navbar() {
   const pathname = usePathname();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   return (
      <>
         <HNavbar
            isBordered
            isBlurred
            maxWidth='xl'
            className='glass backdrop-blur-glass backdrop-saturate-glass border-white/20 shadow-glass'
         >
            <NavbarBrand>
               <span className='text-xl font-bold'>Mitarbeiterverträge</span>
            </NavbarBrand>

            <NavbarContent className='hidden sm:flex gap-6' justify='center'>
               <NavbarItem isActive={pathname === "/"}>
                  <Link
                     as={NextLink}
                     href='/'
                     color={pathname === "/" ? "primary" : "foreground"}
                  >
                     Startseite
                  </Link>
               </NavbarItem>
               <NavbarItem isActive={pathname?.startsWith("/vertrag-erstellen")}>
                  <Link
                     as={NextLink}
                     href='/vertrag-erstellen'
                     color={
                        pathname?.startsWith("/vertrag-erstellen") ?
                           "secondary"
                        :  "foreground"
                     }
                  >
                     Vertrag erstellen
                  </Link>
               </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
               <NavbarItem>
                  <ThemeSwitch />
               </NavbarItem>
               <NavbarMenuToggle
                  className='sm:hidden'
                  aria-label='Side menu umschalten'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               />
            </NavbarContent>
         </HNavbar>

         <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </>
   );
}
