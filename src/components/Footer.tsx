import { Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { BRAND } from '@/lib/brand';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-primary/15 bg-card/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt={BRAND.name}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-primary/40"
            />
            <span className="text-xl font-black font-display tracking-tight">{BRAND.name}</span>
          </Link>

          <a
            href={BRAND.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
