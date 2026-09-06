import { Youtube, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.jpg';
import { BRAND } from '@/lib/brand';

const TwitchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
  </svg>
);

const socialLinks = [
  {
    label: 'Instagram',
    handle: BRAND.socials.instagram.handle,
    href: BRAND.socials.instagram.url,
    icon: Instagram,
  },
  {
    label: 'Twitter',
    handle: BRAND.socials.twitter.handle,
    href: BRAND.socials.twitter.url,
    icon: Twitter,
  },
  {
    label: 'Twitch',
    handle: BRAND.socials.twitch.handle,
    href: BRAND.socials.twitch.url,
    icon: TwitchIcon,
  },
  {
    label: 'YouTube',
    handle: BRAND.handle,
    href: BRAND.youtube,
    icon: Youtube,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-primary/15 bg-card/40">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.4fr_1fr_auto]">
          <div className="max-w-lg">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt={BRAND.name}
                className="w-10 h-10 rounded-lg object-cover ring-1 ring-primary/30"
              />
              <div>
                <p className="text-lg font-black font-display tracking-tight leading-none">
                  {BRAND.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{BRAND.bio.title}</p>
              </div>
            </Link>

            <p className="text-sm font-semibold text-foreground mb-2">
              {BRAND.bio.fullName}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {BRAND.bio.text}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Redes sociais
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="w-8 h-8 rounded-md bg-muted/60 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                      <social.icon className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="block text-foreground/90 group-hover:text-primary font-medium">
                        {social.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{social.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1 lg:self-end lg:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
