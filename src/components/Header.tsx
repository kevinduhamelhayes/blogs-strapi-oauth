'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { sendGAEvent, gaEvents } from '@/lib/ga-utils';
import DarkModeToggle from './DarkModeToggle';
import { useRouter } from 'next/navigation';

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre-mi', label: 'Sobre Mi' },
  { href: '/sobre-ti', label: 'Sobre Ti' },
  { href: '/nuestro-amor', label: 'Nuestro Amor' },
];

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      
      // Clear user data from localStorage
      localStorage.removeItem('supabase-user');
      
      // Send event to GA
      sendGAEvent(gaEvents.LOGOUT, {
        user_email: user.email,
      });
      
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavClick = (link: NavLink) => {
    sendGAEvent(gaEvents.CLICK_NAV_LINK, {
      link_location: 'header',
      link_href: link.href,
      link_text: link.label,
    });
  };

  // Get the first letter of the email for the avatar
  const getInitial = (email: string) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="border-b sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight"
            onClick={() => handleNavClick({ href: '/', label: 'Logo' })}
          >
            Blog Builder
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitial(user.email || '')}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-muted-foreground">
                {user.email}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/perfil">Mi Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 