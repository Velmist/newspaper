// src/components/ui/NewsTicker.tsx
import { ArticleMetadata } from '@/types/article.types';
import Link from 'next/link';

interface NewsTickerProperties {
  readonly latestArticles: ArticleMetadata[];
}

export default function NewsTicker({ latestArticles }: NewsTickerProperties) {
  if (latestArticles.length === 0) return null;

  return (
    <div className="w-full bg-red-900 text-white overflow-hidden flex items-center h-10 border-b-4 border-gray-950">
      <div className="px-4 bg-red-950 h-full flex items-center z-10 shadow-[10px_0_10px_-5px_rgba(0,0,0,0.5)]">
        <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
          Último Minuto
        </span>
      </div>
      
      {/* Contenedor del Marquee */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {/* Renderizamos la lista dos veces para crear un bucle infinito perfecto */}
          {[...latestArticles, ...latestArticles].map((articleItem, index) => (
            <div key={`${articleItem.id}-${index}`} className="flex items-center">
              <span className="mx-4 text-red-500">•</span>
              <Link 
                href={`/articles/${articleItem.targetSlug}`}
                className="text-xs font-medium uppercase tracking-wider hover:text-gray-300 transition-colors"
              >
                {articleItem.headline}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}