// src/app/exposicion/page.tsx
import Image from 'next/image';

interface ExhibitionPoster {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly curator: string;
  readonly imageUrl: string;
  readonly description: string;
}

// Colección estática inmutable de metadatos para la exposición visual
const exhibitionPosters: readonly ExhibitionPoster[] = [
  {
    id: "mural-01",
    title: "Sistemas Operativos y el Fin de la Memoria Virtual",
    date: "Julio, 2026",
    curator: "Cátedra de Arquitectura I",
    imageUrl: "/images/mural-1.jpg", // Recuerda ubicar un archivo real en public/images/
    description: "Una exploración en gran formato sobre la transición hacia arquitecturas de memoria física unificada y chips neuromórficos."
  },
  {
    id: "mural-02",
    title: "La Evolución del Compilador Rust",
    date: "Junio, 2026",
    curator: "Laboratorio de Lenguajes",
    imageUrl: "/images/mural-2.jpg",
    description: "Infografía física detallando el funcionamiento del verificador de préstamos (Borrow Checker) y la generación de binarios seguros."
  },
  {
    id: "mural-03",
    title: "Brutalismo Web como Resistencia Digital",
    date: "Mayo, 2026",
    curator: "Taller de Diseño de Interfaces",
    imageUrl: "/images/mural-3.jpg",
    description: "Manifiesto impreso contra las interfaces sobrediseñadas y la saturación de trackers en la web moderna."
  }
];

export default function WallNewspapersExhibitionPage() {
  return (
    <section className="flex flex-col gap-12">
      
      {/* Encabezado Editorial de la Sección */}
      <header className="border-b-2 border-newspaper-ink pb-8">
        <span className="text-xs font-bold text-newspaper-crimson uppercase tracking-widest block mb-2">
          Galería de Arte Técnico
        </span>
        <h2 className="text-4xl sm:text-6xl font-playfair font-black tracking-tight text-gray-950 uppercase">
          Exposición Mural
        </h2>
        <p className="text-lg text-neutral-600 font-playfair italic mt-4 max-w-3xl leading-relaxed">
          Un espacio dedicado a la visualización de periódicos murales académicos. Diseños analógicos digitalizados para preservar la memoria tipográfica e informativa de nuestra comunidad.
        </p>
      </header>

      {/* Grid Asimétrico de Exposición (3 Columnas de Alta Presencia) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exhibitionPosters.map((posterItem) => (
          <article 
            key={posterItem.id} 
            className="flex flex-col bg-white border border-neutral-200/80 p-4 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.02)] group hover:border-newspaper-crimson transition-colors duration-350"
          >
            {/* Contenedor de Imagen Optimizado con Relación de Aspecto Fija (Poster Ratio 4:3) */}
            <div className="w-full h-80 bg-neutral-100 relative rounded-sm overflow-hidden mb-4 border border-neutral-100">
              <Image
                src={posterItem.imageUrl}
                alt={`Mural: ${posterItem.title}`}
                fill
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
            </div>

            {/* Metadatos Curatoriales */}
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-neutral-450 border-b border-neutral-200 pb-2 mb-3">
              <span>{posterItem.date}</span>
              <span className="text-newspaper-crimson font-bold">{posterItem.curator}</span>
            </div>

            {/* Información Textual */}
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="text-xl font-playfair font-black text-gray-950 leading-tight group-hover:text-newspaper-crimson transition-colors duration-200">
                {posterItem.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {posterItem.description}
              </p>
            </div>

            {/* Botón de Visualización de Imagen Completa (Detalle de Grado Editorial) */}
            <button className="mt-6 w-full py-2 border-2 border-newspaper-ink text-[10px] font-bold uppercase tracking-widest hover:bg-newspaper-ink hover:text-white transition-colors duration-250">
              Examinar Mural Completo
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}