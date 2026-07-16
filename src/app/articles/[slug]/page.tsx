// src/app/articles/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleDataBySlug } from '@/core/fileSystemReader';

interface ArticleDynamicRouteProps {
  readonly params: {
    readonly slug: string;
  };
}

export default function ArticleReadPage({ params }: ArticleDynamicRouteProps) {
  const currentArticleData = getArticleDataBySlug(params.slug);

  if (!currentArticleData) {
    return notFound();
  }

  // Extraemos el valor a una variable local: esto permite el estrechamiento de tipos
  const rawCover = currentArticleData.coverImageUrl;

  // Ahora TypeScript puede deducir que rawCover es string en la rama verdadera
  const verifiedCoverImageUrl: string =
    typeof rawCover === 'string' && rawCover.trim() !== ''
      ? rawCover
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
          Redacción:{' '}
          <span className="text-gray-900 font-bold">
            {currentArticleData.authorName}
          </span>{' '}
          // Sincronización:{' '}
          {new Date(currentArticleData.publicationTimestamp).toLocaleDateString(
            'es-ES'
          )}
        </p>
      </header>

      {/* Imagen de portada con URL sanitizada */}
      <span className="block w-full my-12 h-[300px] md:h-[500px] relative rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200">
        <Image
          src={verifiedCoverImageUrl}
          alt={`Portada: ${currentArticleData.headline}`}
          fill
          priority
          sizes="(max-w-768px) 100vw, 896px"
          className="object-cover"
        />
      </span>

      {/* Cuerpo del Artículo (Markdown renderizado) */}
      <div
        className="prose prose-lg prose-neutral font-playfair text-gray-800 leading-relaxed max-w-none prose-p:mb-6 prose-headings:font-black prose-headings:text-gray-950"
        dangerouslySetInnerHTML={{
          __html: currentArticleData.htmlContent || '',
        }}
      />
    </article>
  );
}