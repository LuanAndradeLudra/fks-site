import csgoSkinsLogo from '@/assets/sponsors/csgo-skins.png';
import pirateSwapLogo from '@/assets/sponsors/pirate-swap.png';
import { BRAND } from '@/lib/brand';

const sponsors = [
  {
    name: 'CSGOSkins',
    logo: csgoSkinsLogo,
    url: BRAND.csgoSkins,
  },
  {
    name: 'Pirate Swap',
    logo: pirateSwapLogo,
    url: BRAND.pirateSwap,
  },
];

const Sponsors = () => {
  return (
    <section className="py-14 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-black mb-8">
          Patrocinadores
        </h2>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden ring-1 ring-primary/25 hover:ring-primary hover:shadow-[0_0_30px_hsl(186_100%_50%/0.25)] transition-all duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
