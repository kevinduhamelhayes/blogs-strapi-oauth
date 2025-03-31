// Tipos básicos de Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
        small: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        large: {
          url: string;
          width: number;
          height: number;
        };
      };
      url: string;
    };
  };
}

// Tipos para las relaciones
export interface StrapiRelation<T> {
  data: StrapiEntity<T>[];
}

export interface StrapiSingleRelation<T> {
  data: StrapiEntity<T>;
}

// Tipos para nuestros modelos específicos
export interface Tag {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  title: string;
  slug: string;
  content: string;
  description: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage: StrapiMedia;
  tags: StrapiRelation<Tag>;
  carouselImages?: StrapiRelation<StrapiMedia>;
}

export interface Page {
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: StrapiRelation<StrapiMedia>;
} 