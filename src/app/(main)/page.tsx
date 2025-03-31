import { getAllPosts } from '@/lib/strapi/client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Inicio | Blog Builder',
  description: 'Un blog privado y álbum de recuerdos para dos personas especiales',
};

export default async function HomePage() {
  // Get the posts from Strapi
  let posts = [];
  try {
    const response = await getAllPosts(1, 10);
    posts = response.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Bienvenido a nuestro Blog</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Este es un espacio privado para compartir nuestros recuerdos, pensamientos y momentos especiales.
        </p>
        
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article 
                key={post.id} 
                className="border rounded-lg p-6 hover:border-primary transition-colors duration-200"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  <Link 
                    href={`/blog/${post.attributes.slug}`}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {post.attributes.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.attributes.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {post.attributes.tags.data.map((tag) => (
                      <Link 
                        key={tag.id}
                        href={`/tag/${tag.attributes.slug}`}
                        className="text-xs bg-muted px-2 py-1 rounded-md hover:bg-primary/20 transition-colors duration-200"
                      >
                        {tag.attributes.name}
                      </Link>
                    ))}
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/blog/${post.attributes.slug}`}>
                      Leer más
                    </Link>
                  </Button>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay posts disponibles. ¡Vuelve pronto!</p>
            </div>
          )}
        </div>
        
        {posts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                Ver todos los posts
              </Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
} 