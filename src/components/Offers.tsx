import { Gift, Copy } from 'lucide-react';
import { useState } from 'react';
import csgoSkinsLogo from '@/assets/sponsors/csgo-skins.png';
import pirateSwapLogo from '@/assets/sponsors/pirate-swap.png';
import { BRAND } from '@/lib/brand';

const offers = [
  {
    id: 1,
    name: 'CSGO Skins',
    logo: csgoSkinsLogo,
    bonus: '10% de BÔNUS no depósito',
    extra: 'e participe dos melhores sorteios',
    codeLabel: 'CUPOM',
    code: BRAND.coupon,
    url: BRAND.csgoSkins,
  },
  {
    id: 2,
    name: 'Pirate Swap',
    logo: pirateSwapLogo,
    bonus: '35% de BÔNUS no depósito',
    extra: 'Troca e venda de skins',
    codeLabel: 'CUPOM',
    code: BRAND.coupon,
    url: BRAND.pirateSwap,
  },
];

const Offers = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="ofertas" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cupom {BRAND.coupon}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Ofertas <span className="text-primary">exclusivas</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Bônus dos patrocinadores oficiais com o cupom {BRAND.coupon}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {offers.map((offer) => (
            <div key={offer.id} className="card-gaming overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6 -mx-2">
                  <img
                    src={offer.logo}
                    alt={offer.name}
                    className="w-full max-h-56 object-contain rounded-xl"
                  />
                </div>

                <div className="text-center mb-6">
                  <p className="text-xl md:text-2xl font-bold text-foreground">{offer.bonus}</p>
                  <p className="text-sm text-muted-foreground mt-1">{offer.extra}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    {offer.codeLabel}
                  </p>
                  <button
                    onClick={() => copyCode(offer.id, offer.code)}
                    className="code-box w-full flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    <span>{offer.code}</span>
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedId === offer.id && (
                    <p className="text-xs text-primary text-center mt-2 animate-fade-in">
                      Código copiado!
                    </p>
                  )}
                </div>

                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gaming-primary w-full text-center block text-sm py-3"
                >
                  Garantir bônus
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
