import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
   return (
      <nav className='w-full flex items-center justify-between px-6 py-4 border-b bg-background'>
         <div className='text-xl font-bold text-foreground'>
            Çalışan Sözleşmeleri
         </div>
         <div className='flex items-center gap-4'>
            <a
               href='#'
               className='text-sm text-muted-foreground hover:text-foreground transition'
            >
               Ana Sayfa
            </a>
            <a
               href='#'
               className='text-sm text-muted-foreground hover:text-foreground transition'
            >
               Sözleşme Oluştur
            </a>
            <ThemeSwitch />
         </div>
      </nav>
   );
}
