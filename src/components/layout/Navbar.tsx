// src/components/layout/Navbar.tsx
import Link from 'next/link';

interface NavigationRoute {
  readonly label: string;
  readonly path: string;
}

// Menú minimalista: Reducción absoluta de la complejidad cognitiva
const navigationRoutes: readonly NavigationRoute[] = [
  { label: 'Portada Principal', path: '/' },
];

export default function Navbar() {
  const currentFormattedDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="w-full bg-transparent mt-4">
      <div className="flex flex-col items-center py-8 border-b-4 border-newspaper-ink">
        <div className="w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4 px-2">
          <span>Sincronización: Estable</span>
          <span className="hidden md:inline text-newspaper-crimson font-bold">● ARCHIVO ESTÁTICO DETERMINISTA</span>
          <span>Vol. XXVI — No. 104</span>
        </div>

        <Link href="/" className="group inline-block text-center select-none">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-playfair font-black tracking-tight uppercase leading-none text-newspaper-ink group-hover:text-newspaper-crimson transition-colors duration-300">
            Periodico Kids
          </h1>
        </Link>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-newspaper-ink mt-6 py-2 text-xs font-playfair italic text-neutral-700 text-center md:text-left gap-2 md:gap-0">
          <div className="capitalize font-semibold">{currentFormattedDate}</div>
          <div className="text-center md:border-x md:border-neutral-300 px-4 font-mono text-[11px] not-italic uppercase tracking-wider">
            Maturín, Monagas // Edición Global
          </div>
          <div className="text-center md:text-right font-bold text-newspaper-crimson">
            Precio: 0.00 USDT
          </div>
        </div>
      </div>

      <div className="w-full border-b-4 border-double border-newspaper-ink h-12 flex justify-center items-center overflow-x-auto scrollbar-none bg-neutral-100/40">
        <ul className="flex items-center gap-8 px-4 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-neutral-800">
          {navigationRoutes.map((routeItem) => (
            <li key={routeItem.label}>
              <Link 
                href={routeItem.path}
                className="relative py-1 hover:text-newspaper-crimson transition-colors before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-newspaper-crimson hover:before:w-full before:transition-all before:duration-300"
              >
                {routeItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}