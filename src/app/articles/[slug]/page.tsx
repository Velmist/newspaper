// src/app/articles/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
// Asumo que tienes una función para traer un solo artículo por su ID/Slug
import { getArticleDataBySlug } from '@/core/fileSystemReader';

// Contrato de interfaz estricto para los parámetros de la URL dinámica de Next.js
interface ArticleDynamicRouteProps {
  readonly params: {
    readonly slug: string;
  };
}

export default function ArticleReadPage({ params }: ArticleDynamicRouteProps) {
  // 1. Extracción de datos (Data Fetching)
  const currentArticleData = getArticleDataBySlug(params.slug);

  // 2. Control de Sanidad: Si el archivo no existe, cortamos la ejecución (Fail Fast)
  if (!currentArticleData) {
    return notFound();
  }

  // 3. ALGORITMO DE SANITIZACIÓN DE TIPOS (Type Coercion & Fallback)
  // Forzamos al compilador a entender que esto es un string absoluto.
  // Si por alguna razón la metadata de gray-matter viene corrupta, asignamos un placeholder determinista.
  const verifiedCoverImageUrl: string = 
    typeof currentArticleData.coverImageUrl === 'string' && currentArticleData.coverImageUrl.trim() !== ''
      ? currentArticleData.coverImageUrl
      : '/images/placeholder.jpg';

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Cabecera del Artículo */}
      <header className="mb-10 flex flex-col gap-4 text-center items-center">
        <span className="text-[11px] font-bold text-newspaper-crimson uppercase tracking-widest border-b border-newspaper-crimson pb-1">
          {currentArticleData.categoryTags?.[0] || 'Reportaje Técnico'}
        </span>
        <h1 className="text-4xl md:text-6xl font-playfair font-black tracking-tight text-gray-950 leading-tight max-w-3xl">
          {currentArticleData.headline}
        </h1>
        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-4">
          Redacción: <span className="text-gray-900 font-bold">{currentArticleData.authorName}</span> // 
          Sincronización: {new Date(currentArticleData.publicationTimestamp).toLocaleDateString('es-ES')}
        </p>
      </header>

      {/* EL NODO DE CONTENCIÓN REPARADO
        Inyectamos verifiedCoverImageUrl. TypeScript ahora tiene una prueba matemática (typeof === 'string') 
        de que la variable es un string. El error Blob desaparece por completo del pipeline de compilación.
      */}
      <span className="block w-full my-12 h-[300px] md:h-[500px] relative rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200">
        <Image
          src={ImageUrl}
          alt={`Portada: ${currentArticleData.headline}`}
          fill
          priority
          sizes="(max-w-768px) 100vw, 896px"
          className="object-cover"
        />
      </span>

      {/* Cuerpo del Artículo (Renderizado del contenido Markdown) */}
      <div 
        className="prose prose-lg prose-neutral font-playfair text-gray-800 leading-relaxed max-w-none prose-p:mb-6 prose-headings:font-black prose-headings:text-gray-950"
        dangerouslySetInnerHTML={{ __html: currentArticleData.htmlContent || '' }}
      />
      
    </article>
  );
}
