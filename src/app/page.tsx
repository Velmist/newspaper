// src/app/page.tsx
import { getSortedArticlesMetadata } from '@/core/fileSystemReader';
import NewsTicker from '@/components/ui/NewsTicker';
import Link from 'next/link';
import Image from 'next/image';

export default function NewspaperLandingPage() {
  const allArticlesData = getSortedArticlesMetadata();

  if (allArticlesData.length === 0) {
    return (
      <div className="text-center py-24 border border-dashed border-gray-300 bg-white">
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
          Base de datos vacía. Inyecte archivos .md en content/articles/
        </p>
      </div>
    );
  }

  // ALGORITMO EDITORIAL (Data Slicing)
  const leadArticle = allArticlesData.find(article => article.isFeatured) || allArticlesData[0];
  const remainingArticles = allArticlesData.filter(article => article.id !== leadArticle.id);
  const secondaryArticles = remainingArticles.slice(0, 2);
  const sidebarArticles = remainingArticles.slice(2, 7);

  return (
    <div className="flex flex-col w-full">
      <NewsTicker latestArticles={allArticlesData.slice(0, 5)} />

      {/* EL MOTOR DE ESTADO DE CSS PURO (El Checkbox Hack)
        Colocamos este input oculto al inicio del árbol de componentes.
        El ID 'thanks-modal-trigger' será el puntero de control.
      */}
      <input 
        type="checkbox" 
        id="thanks-modal-trigger" 
        className="peer hidden" 
      />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10">
        
        {/* BLOQUE PRINCIPAL (Izquierda, 8 columnas) */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Portada Principal (Lead Story) */}
          <article className="flex flex-col gap-6 border-b-2 border-gray-900 pb-12">
            <Link href={`/articles/${leadArticle.targetSlug}`} className="group">
              <div className="w-full h-[400px] bg-gray-100 relative rounded-sm overflow-hidden mb-6">
                <Image 
                  src={leadArticle.coverImageUrl || '/images/placeholder.jpg'}
                  alt={leadArticle.headline}
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-red-800 uppercase tracking-widest">
                  {leadArticle.categoryTags[0] || 'Reportaje Principal'} {leadArticle.isFeatured && '★ DESTACADO'}
                </span>
                <h2 className="text-5xl md:text-6xl font-playfair font-black tracking-tighter leading-[1.05] text-gray-950 group-hover:text-newspaper-crimson transition-colors">
                  {leadArticle.headline}
                </h2>
                <p className="text-xl text-gray-700 font-playfair italic mt-2 leading-relaxed border-l-2 border-newspaper-crimson pl-4">
                  {leadArticle.shortExcerpt}
                </p>
              </div>
            </Link>
            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
              Despacho de: <span className="text-gray-900">{leadArticle.authorName}</span> // {new Date(leadArticle.publicationTimestamp).toLocaleDateString('es-ES')}
            </div>
          </article>

          {/* Sub-rejilla Secundaria */}
          {secondaryArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b lg:border-b-0 border-gray-200 pb-12 lg:pb-0">
              {secondaryArticles.map((articleItem) => (
                <article key={articleItem.id} className="flex flex-col gap-3 group cursor-pointer">
                  <Link href={`/articles/${articleItem.targetSlug}`}>
                    <div className="w-full h-48 bg-gray-100 relative rounded-sm overflow-hidden mb-3">
                      <Image 
                        src={articleItem.coverImageUrl || '/images/placeholder.jpg'}
                        alt={articleItem.headline}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-newspaper-crimson uppercase tracking-widest mb-1 block">
                      {articleItem.categoryTags[0]}
                    </span>
                    <h3 className="text-2xl font-playfair font-bold text-gray-950 leading-tight group-hover:text-newspaper-crimson transition-colors">
                      {articleItem.headline}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                      {articleItem.shortExcerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* BLOQUE LATERAL (Derecha, 4 columnas) */}
        <aside className="lg:col-span-4 flex flex-col gap-8 lg:pl-8 lg:border-l lg:border-gray-300 relative">
          <div className="sticky top-8">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Lo Más Reciente</h3>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-6 mb-12">
              {sidebarArticles.length > 0 ? (
                sidebarArticles.map((articleItem, index) => (
                  <article key={articleItem.id} className={`flex flex-col gap-2 ${index !== sidebarArticles.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
                    <Link href={`/articles/${articleItem.targetSlug}`} className="group flex gap-4">
                      <span className="text-3xl font-playfair font-black text-gray-300">
                        0{index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-newspaper-crimson uppercase tracking-widest mb-1">
                          {articleItem.categoryTags[0]}
                        </span>
                        <h4 className="text-lg font-playfair font-bold text-gray-900 leading-snug group-hover:text-newspaper-crimson transition-colors">
                          {articleItem.headline}
                        </h4>
                      </div>
                    </Link>
                  </article>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No hay suficientes registros secundarios.</p>
              )}
            </div>

            {/* CAJA DE SUSCRIPCIÓN ESTÁTICA */}
            <div className="bg-newspaper-ink text-white p-6 rounded-sm flex flex-col items-center text-center border border-neutral-800 shadow-sm">
              <h4 className="text-xl font-playfair font-black mb-2 text-newspaper-paper uppercase tracking-tight">
                Periodico Kids
              </h4>
              <p className="text-xs text-neutral-450 mb-6 leading-relaxed">
                Apoye el periodismo de alta gama, llevado a ustedes por nuestros estudiantes.
              </p>
              
              {/* EL DISPARADOR DE CSS 
                Este <label> actúa físicamente como el botón. Al hacerle clic, 
                activa el estado 'checked' del input superior mediante el 'htmlFor'.
              */}
              <label 
                htmlFor="thanks-modal-trigger"
                className="px-6 py-2.5 bg-white text-newspaper-ink text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors w-full cursor-pointer inline-block text-center select-none"
              >
                Apoyar Proyecto
              </label>
            </div>
          </div>
        </aside>

      </section>

      {/* EL MODAL (Controlado por CSS)
        Utiliza el selector de hermano 'peer-checked'.
        Si el checkbox inicial está activo (checked), esta capa cambia a 'flex', de lo contrario permanece 'hidden'.
      */}
      <div className="fixed inset-0 z-50 items-center justify-center bg-black/85 backdrop-blur-xs p-4 hidden peer-checked:flex transition-all duration-200">
        
        {/* Contenedor Físico de la Alerta */}
        <div className="bg-newspaper-paper text-newspaper-ink p-8 border-4 border-double border-newspaper-ink max-w-sm w-full relative shadow-2xl">
          
          {/* Botón de Cierre superior */}
          <label 
            htmlFor="thanks-modal-trigger"
            className="absolute top-2 right-4 text-newspaper-ink hover:text-newspaper-crimson font-black text-2xl leading-none transition-colors cursor-pointer select-none"
            aria-label="Cerrar ventana"
          >
            ×
          </label>

          {/* Cuerpo Editorial del Modal */}
          <div className="flex flex-col items-center text-center mt-2">
            <span className="text-4xl text-newspaper-crimson mb-4 font-playfair">✓</span>
            <h3 className="text-xl font-playfair font-black uppercase tracking-widest mb-2">
              Agradecimiento
            </h3>
            <p className="text-xs font-mono text-neutral-600 leading-relaxed mb-8 border-t border-neutral-300 pt-4">
              Agradecemos a todo el plantel administrastivo de nuestro colegio David Ausubel y a usted representante que siempre esta apoyando a su representado. ¡Muchas Gracias!
            </p>
            
            {/* Botón de Confirmación / Cierre */}
            <label 
              htmlFor="thanks-modal-trigger"
              className="px-8 py-2 bg-newspaper-ink text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors w-full cursor-pointer inline-block text-center select-none"
            >
              Cerrar Aviso
            </label>
          </div>
        </div>
        
      </div>

    </div>
  );
}