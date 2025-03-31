import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog Builder',
    default: 'Blog Builder',
  },
  description: 'Un blog privado y álbum de recuerdos para dos personas especiales',
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if user is authenticated
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Get user profile data
  const user = session.user;

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
} 