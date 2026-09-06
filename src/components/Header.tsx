import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { BRAND } from '@/lib/brand';

const TwitchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

const socialLinks = [
  { label: 'Instagram', href: BRAND.socials.instagram.url, icon: Instagram },
  { label: 'Twitter', href: BRAND.socials.twitter.url, icon: Twitter },
  { label: 'Twitch', href: BRAND.socials.twitch.url, icon: TwitchIcon },
  { label: 'YouTube', href: BRAND.youtube, icon: Youtube },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/sorteios', label: 'Sorteios' },
    { href: '/parceiros', label: 'Parceiros' },
    { href: '/videos', label: 'Vídeos' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-border/40 bg-background/80 backdrop-blur-md
        ${scrolled ? 'bg-background/95 shadow-sm shadow-black/20' : ''}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-16 md:h-[4.5rem]">
          <Link to="/" className="flex items-center gap-2.5 justify-self-start group">
            <img
              src={logo}
              alt={BRAND.name}
              className="w-8 h-8 md:w-9 md:h-9 rounded-md object-cover ring-1 ring-border group-hover:ring-primary/40 transition-all"
            />
            <span className="text-lg md:text-xl font-black tracking-tight font-display leading-none text-foreground/90 group-hover:text-primary transition-colors">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 text-sm font-medium tracking-wide transition-colors rounded-md
                    ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-1 justify-self-end">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors justify-self-end"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="flex items-center gap-1 pt-3 mt-2 border-t border-border/40">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
