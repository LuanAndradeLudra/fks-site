import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { BRAND } from "@/lib/brand";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/sorteios", label: "Sorteios" },
    { href: "/parceiros", label: "Parceiros" },
    { href: "/videos", label: "Vídeos" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-primary/10 bg-background
        ${scrolled ? "shadow-lg shadow-black/50" : ""}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-20">
          <Link
            to="/"
            className="flex items-center gap-3 justify-self-start group"
          >
            <div className="relative overflow-hidden rounded-lg ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
              <img
                src={logo}
                alt={BRAND.name}
                className="w-10 h-10 md:w-12 md:h-12 object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tight font-display leading-none group-hover:text-primary transition-colors">
              {BRAND.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative flex items-center h-full text-sm font-bold uppercase tracking-widest transition-colors group
                    ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[3px] w-full bg-primary rounded-t-md transition-transform duration-300 origin-left
                      ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex justify-self-end">
            <Link
              to="/sorteios"
              className="btn-gaming-primary text-sm py-2.5 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
            >
              Participar
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 text-foreground justify-self-end rounded-md hover:bg-white/5 transition-colors"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X size={28} className="text-primary" />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl border-t border-white/5 transition-all duration-300 ease-in-out origin-top
          ${isMenuOpen ? "opacity-100 pointer-events-auto flex flex-col" : "opacity-0 pointer-events-none hidden"}
        `}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between p-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all
                  ${
                    isActive
                      ? "text-primary bg-primary/10 ring-1 ring-primary/30"
                      : "text-muted-foreground bg-white/5 hover:bg-white/10 hover:text-foreground"
                  }
                `}
              >
                {link.label}
                {isActive && (
                  <ChevronRight size={20} className="text-primary" />
                )}
              </Link>
            );
          })}

          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              to="/sorteios"
              onClick={() => setIsMenuOpen(false)}
              className="btn-gaming-primary w-full text-center py-4 text-lg shadow-lg shadow-primary/20"
            >
              Participar Agora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
