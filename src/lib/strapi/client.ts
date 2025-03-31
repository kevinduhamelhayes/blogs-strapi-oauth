/**
 * Función para hacer peticiones a la API de Strapi
 */
export async function fetchAPI(path: string, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const url = `${apiUrl}${path}`;

  try {
    const res = await fetch(url, mergedOptions);
    
    if (!res.ok) {
      throw new Error(`Error al hacer fetch a: ${url}. Status: ${res.status}`);
    }
    
    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
}

/**
 * Obtiene todos los posts del blog
 */
export async function getAllPosts(page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
  return data;
}

/**
 * Obtiene un post específico por su slug
 */
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`/api/posts?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0] || null;
}

/**
 * Obtiene posts por etiqueta
 */
export async function getPostsByTag(tag: string, page = 1, pageSize = 10) {
  const data = await fetchAPI(
    `/api/posts?filters[tags][slug][$eq]=${tag}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
  return data;
}

/**
 * Obtiene todas las etiquetas disponibles
 */
export async function getAllTags() {
  const data = await fetchAPI('/api/tags?populate=*');
  return data;
}

/**
 * Obtiene el contenido de una página estática por su slug
 */
export async function getStaticPage(slug: string) {
  const data = await fetchAPI(`/api/pages?filters[slug][$eq]=${slug}&populate=*`);
  return data.data[0] || null;
} 