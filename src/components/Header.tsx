import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { BRAND } from '@/lib/brand';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/sorteios', label: 'Sorteios' },
    { href: '/parceiros', label: 'Parceiros' },
    { href: '/videos', label: 'Vídeos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-xl border-b border-primary/20">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-16 md:h-[4.5rem]">
          <Link to="/" className="flex items-center gap-3 justify-self-start">
            <img
              src={logo}
              alt={BRAND.name}
              className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover ring-1 ring-primary/40"
            />
            <span className="text-2xl md:text-3xl font-black tracking-tight font-display leading-none">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex justify-self-end">
            <Link to="/sorteios" className="btn-gaming-primary text-sm py-2 px-6">
              Participar
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground justify-self-end"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold py-2 px-2 rounded-md transition-colors ${
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/sorteios"
                onClick={() => setIsMenuOpen(false)}
                className="btn-gaming-primary text-center text-sm py-3 mt-2"
              >
                Participar
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
