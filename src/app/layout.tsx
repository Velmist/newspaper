// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';

const primaryFont = Inter({ subsets: ['latin'], variable: '--font-inter' });
const headlineFont = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Periodico Kids | Edición de Alta Gama',
  description: 'Arquitectura editorial inmutable, optimizada para rendimiento y lectura táctil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${primaryFont.variable} ${headlineFont.variable}`}>
      <body className="bg-newspaper-paper text-newspaper-ink antialiased min-h-screen flex flex-col selection:bg-newspaper-crimson selection:text-white">
        
        {/* Línea decorativa superior que delimita el inicio de la prensa */}
        <div className="w-full h-2 bg-newspaper-crimson" />
        
        {/* Contenedor estructural emulado (Efecto hoja de papel realzada) */}
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 bg-newspaper-paper shadow-[0_0_40px_rgba(0,0,0,0.03)] border border-neutral-200/60 rounded-sm flex flex-col">
          
          <Navbar />
          
          <main className="flex-grow py-12">
            {children}
          </main>
          
          {/* Pie de página con estilo de colofón antiguo */}
          <footer className="w-full border-t-4 border-double border-newspaper-ink py-8 mt-16 text-center text-xs font-mono tracking-widest text-neutral-500 uppercase">
            <span>Periodico Kids // Real-time Generation</span>
            <p className="text-[10px] text-neutral-400 mt-2">Solo datos puros escritos con luz.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}