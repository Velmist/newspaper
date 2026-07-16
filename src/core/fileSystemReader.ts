// src/core/fileSystemReader.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleMetadata, FullArticle } from '@/types/article.types';

// Determinación estricta de la ruta del directorio de almacenamiento en memoria física
const articlesDirectory = path.join(process.cwd(), 'content/articles');

/**
 * Función Motor 1: Escanea el directorio, extrae metadatos y ordena.
 * Usada por src/app/page.tsx para construir la portada estática.
 */
export function getSortedArticlesMetadata(): ArticleMetadata[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  
  const allArticlesData = fileNames.map((fileName): ArticleMetadata => {
    const targetSlug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const rawFileContent = fs.readFileSync(fullPath, 'utf8');
    const frontMatterParserResult = matter(rawFileContent);

    return {
      id: targetSlug,
      targetSlug,
      headline: frontMatterParserResult.data.headline,
      shortExcerpt: frontMatterParserResult.data.shortExcerpt,
      coverImageUrl: frontMatterParserResult.data.coverImageUrl,
      authorName: frontMatterParserResult.data.authorName,
      publicationTimestamp: frontMatterParserResult.data.publicationTimestamp,
      categoryTags: frontMatterParserResult.data.categoryTags || [],
      // Evaluamos explícitamente el booleano. Si no existe, por defecto es false.
      isFeatured: frontMatterParserResult.data.isFeatured === true, 
    };
  });

  return allArticlesData.sort((articleA, articleB) => {
    if (articleA.publicationTimestamp < articleB.publicationTimestamp) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleDataBySlug(slug: string): FullArticle {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);
  const rawFileContent = fs.readFileSync(fullPath, 'utf8');

  const frontMatterParserResult = matter(rawFileContent);

  return {
    id: slug,
    targetSlug: slug,
    headline: frontMatterParserResult.data.headline,
    shortExcerpt: frontMatterParserResult.data.shortExcerpt,
    coverImageUrl: frontMatterParserResult.data.coverImageUrl,
    authorName: frontMatterParserResult.data.authorName,
    publicationTimestamp: frontMatterParserResult.data.publicationTimestamp,
    categoryTags: frontMatterParserResult.data.categoryTags || [],
    rawMarkdownBody: frontMatterParserResult.content, // Entregamos el string en crudo para ser interceptado por markdown-to-jsx
  };
}