// src/components/ui/ReadingProgressBar.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const handleScrollEvent = () => {
      // Calculamos la distancia scrolleada contra la altura total disponible del DOM
      const currentScrollY = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollableHeight <= 0) return;
      
      const computedPercentage = (currentScrollY / scrollableHeight) * 100;
      setScrollPercentage(computedPercentage);
    };

    // Usamos { passive: true } para no bloquear el thread principal durante el renderizado del scroll
    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    
    // Cleanup function: Previene memory leaks al destruir el componente
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-transparent z-50 pointer-events-none">
      <div 
        className="h-full bg-red-800 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}