import { ThemeSwitch } from "./theme-switch";

export default function Navbar() {
   return (
      <nav className='w-full flex items-center justify-between px-6 py-4 bg-background shadow-sm backdrop-blur-lg transition-all duration-300'>
         <div className='flex items-center gap-2'>
            <span className='text-xl font-bold text-foreground animate-fade-in'>
               Çalışan Sözleşmeleri
            </span>
         </div>
         <div className='flex items-center gap-2'>
            <a
               href='#'
               className='heroui-btn heroui-btn-primary heroui-btn-md animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200'
            >
               Ana Sayfa
            </a>
            <a
               href='#'
               className='heroui-btn heroui-btn-secondary heroui-btn-md animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-200'
            >
               Sözleşme Oluştur
            </a>
            <button
               className='heroui-btn heroui-btn-ghost heroui-btn-md animate-fade-in-up transition-all duration-200'
               aria-label='Tema Değiştir'
            >
               <ThemeSwitch />
            </button>
         </div>
      </nav>
   );
}
