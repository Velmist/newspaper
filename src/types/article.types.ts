export interface ArticleMetadata {
  readonly id: string;
  readonly targetSlug: string;
  readonly headline: string;
  readonly shortExcerpt: string;
  readonly coverImageUrl: string;
  readonly authorName: string;
  readonly publicationTimestamp: string; // ISO 8601
  readonly categoryTags: string[];
  readonly isFeatured?: boolean; // Nueva directiva editorial
}

export interface FullArticle extends ArticleMetadata {
  readonly rawMarkdownBody: string; 
}