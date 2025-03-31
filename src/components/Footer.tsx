'use client';

import Link from 'next/link';
import { sendGAEvent, gaEvents } from '@/lib/ga-utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string, text: string) => {
    sendGAEvent(gaEvents.CLICK_NAV_LINK, {
      link_location: 'footer',
      link_href: href,
      link_text: text,
    });
  };

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Blog Builder. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              href="/terminos" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              onClick={() => handleLinkClick('/terminos', 'Términos')}
            >
              Términos
            </Link>
            <Link 
              href="/sobre-mi" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              onClick={() => handleLinkClick('/sobre-mi', 'Sobre Mi')}
            >
              Sobre Mi
            </Link>
            <Link 
              href="/sobre-ti" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              onClick={() => handleLinkClick('/sobre-ti', 'Sobre Ti')}
            >
              Sobre Ti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 