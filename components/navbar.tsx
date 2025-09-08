"use client";

import { Link } from "@heroui/link";
import {
   Navbar as HNavbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   NavbarMenu,
   NavbarMenuItem,
   NavbarMenuToggle,
} from "@heroui/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
   const pathname = usePathname();

   return (
      <HNavbar
         isBordered
         isBlurred
         maxWidth='xl'
         className='bg-background/60 backdrop-saturate-150'
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
               aria-label='Menü umschalten'
            />
         </NavbarContent>

         <NavbarMenu>
            <NavbarMenuItem>
               <Link as={NextLink} href='/' size='lg'>
                  Startseite
               </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
               <Link as={NextLink} href='/vertrag-erstellen' size='lg'>
                  Vertrag erstellen
               </Link>
            </NavbarMenuItem>
         </NavbarMenu>
      </HNavbar>
   );
}
