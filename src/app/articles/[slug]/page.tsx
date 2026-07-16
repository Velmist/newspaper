// src/app/articles/[slug]/page.tsx
import { getArticleDataBySlug, getSortedArticlesMetadata } from '@/core/fileSystemReader';
import { notFound } from 'next/navigation';
import ReadingProgressBar from '@/components/ui/ReadingProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'markdown-to-jsx';

interface ArticlePageProperties {
  readonly params: Promise<{
    readonly slug: string;
  }>;
}

export async function generateStaticParams() {
  const articlesList = getSortedArticlesMetadata();
  return articlesList.map((articleItem) => ({
    slug: articleItem.targetSlug,
  }));
}

/**
 * Interceptor de Nodos AST: Captura las imágenes del Markdown y las 
 * envuelve en el motor de optimización extrema de Vercel/Next.js.
 */
const MarkdownImageInterceptor = ({ alt, src, title }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!src) return null;
  
  return (
    <span className="block w-full my-12 relative rounded-sm overflow-hidden bg-neutral-100 group">
      <Image
        src={src}
        alt={alt || 'Recurso visual del sistema'}
        width={1200}
        height={675}
        className="object-cover w-full h-auto group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
        loading="lazy"
        quality={85}
      />
      {title && (
        <span className="block w-full text-center text-[11px] text-gray-500 uppercase tracking-widest mt-3 mb-2 font-medium">
          {title}
        </span>
      )}
    </span>
  );
};

export default async function ArticleViewPage({ params }: ArticlePageProperties) {
  const resolvedParams = await params;
  
  try {
    const fullArticleData = getArticleDataBySlug(resolvedParams.slug);

    return (
      <div className="relative min-h-screen">
        <ReadingProgressBar />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          
          {/* Cabecera Maestra (Metadata Unificada y Siempre Visible) */}
          <header className="flex flex-col gap-6 mb-10">
            <div className="flex flex-wrap gap-2">
              {fullArticleData.categoryTags.map((tagItem) => (
                <span key={tagItem} className="px-3 py-1 bg-red-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {tagItem}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-black tracking-tighter leading-[1.05] text-gray-950">
              {fullArticleData.headline}
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 font-playfair italic leading-relaxed">
              {fullArticleData.shortExcerpt}
            </p>

            {/* Ficha de Autoría Reparada: Estructura robusta para cualquier dispositivo */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Redacción por
                </span>
                <span className="text-base text-gray-950 font-bold tracking-tight">
                  {fullArticleData.authorName}
                </span>
              </div>
              <div className="h-8 w-px bg-gray-300 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                  Publicación
                </span>
                <time className="text-sm text-gray-800 font-medium" dateTime={fullArticleData.publicationTimestamp}>
                  {new Date(fullArticleData.publicationTimestamp).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Cover Image (Imagen de Portada de la Noticia) */}
          <div className="w-full mb-12 rounded-sm overflow-hidden bg-gray-900 relative">
             <Image 
               src={fullArticleData.coverImageUrl || '/images/placeholder.jpg'}
               alt={`Portada: ${fullArticleData.headline}`}
               width={1200}
               height={630}
               priority // Instrucción vital: Pre-carga esta imagen porque bloquea el FCP (First Contentful Paint)
               className="w-full h-auto object-cover"
             />
          </div>

          {/* Motor de Compilación MDX-a-JSX */}
          <div className="prose prose-lg sm:prose-xl prose-stone max-w-none prose-headings:font-playfair prose-headings:font-black prose-headings:tracking-tight prose-a:text-red-800 hover:prose-a:text-red-600 prose-p:leading-relaxed prose-p:text-gray-800
                          first-letter:text-7xl first-letter:font-black first-letter:font-playfair first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-gray-900">
            <Markdown
              options={{
                overrides: {
                  img: {
                    component: MarkdownImageInterceptor,
                  },
                },
              }}
            >
              {fullArticleData.rawMarkdownBody}
            </Markdown>
          </div>
          
          {/* Footer del Artículo */}
          <footer className="mt-16 pt-8 border-t-2 border-gray-900 flex justify-between items-center">
             <Link href="/" className="text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-red-800 transition-colors">
               ← Volver al Índice Principal
             </Link>
             <span className="text-[10px] text-gray-400 font-mono">EOF // THE CHRONICLE CORE</span>
          </footer>

        </article>
      </div>
    );
  } catch (executionError) {
    notFound();
  }
}