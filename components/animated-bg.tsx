"use client";

export default function AnimatedBg() {
   return (
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
         <div className='absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float' />
         <div className='absolute top-10 right-0 h-80 w-80 rounded-full bg-secondary/30 blur-3xl animate-float-slow' />
         <div className='absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-success/30 blur-3xl animate-float' />
         <div className='absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-warning/30 blur-3xl animate-float-slow' />
      </div>
   );
}
