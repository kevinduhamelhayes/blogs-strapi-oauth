import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog Builder',
    default: 'Blog Builder',
  },
  description: 'Un blog privado y álbum de recuerdos para dos personas especiales',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/40">
      {children}
    </div>
  );
} 