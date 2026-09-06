import { Handshake, Copy, ExternalLink, Star, Gift } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import csgoSkinsLogo from '@/assets/sponsors/csgo-skins.png';
import pirateSwapLogo from '@/assets/sponsors/pirate-swap.png';
import { BRAND } from '@/lib/brand';

const partners = [
  {
    id: 1,
    name: 'CSGO Skins',
    logo: csgoSkinsLogo,
    url: BRAND.csgoSkins,
    description: 'Sorteios e promoções oficiais de skins CS2',
    bonus: '10% de BÔNUS no depósito',
    code: BRAND.coupon,
    codeLabel: 'CUPOM',
    features: ['Sorteios diários', 'Bônus de depósito', 'Suporte 24/7'],
  },
  {
    id: 2,
    name: 'Pirate Swap',
    logo: pirateSwapLogo,
    url: BRAND.pirateSwap,
    description: 'Troca e venda de skins com as melhores taxas',
    bonus: '35% de BÔNUS no depósito',
    code: BRAND.coupon,
    codeLabel: 'CUPOM',
    features: ['Melhores taxas', 'Troca instantânea', 'Segurança garantida'],
  },
];

const Parceiros = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Handshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Parceiros oficiais</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Nossos <span className="text-primary">parceiros</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Sites oficiais com bônus exclusivos no cupom {BRAND.coupon}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Handshake className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary">{partners.length}</div>
              <div className="text-sm text-muted-foreground">Parceiros</div>
            </div>

            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-primary">45%</div>
              <div className="text-sm text-muted-foreground">Em bônus</div>
            </div>

            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl font-black text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Confiáveis</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.id} className="card-gaming overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-50" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-20 w-auto object-contain"
                    />
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{partner.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-background/50 border border-border text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 mb-6 border border-primary/20">
                    <p className="text-xs text-muted-foreground text-center mb-1">BÔNUS EXCLUSIVO</p>
                    <p className="text-xl md:text-2xl font-bold text-primary text-center">
                      {partner.bonus}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      {partner.codeLabel}
                    </p>
                    <button
                      onClick={() => copyCode(partner.id, partner.code)}
                      className="code-box w-full flex items-center justify-center gap-3 hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <span className="font-bold">{partner.code}</span>
                      <Copy className="w-4 h-4" />
                    </button>
                    {copiedId === partner.id && (
                      <p className="text-xs text-primary text-center mt-2 animate-fade-in">
                        Código copiado!
                      </p>
                    )}
                  </div>

                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gaming-primary w-full text-center flex items-center justify-center gap-2 py-4"
                  >
                    <Gift className="w-5 h-5" />
                    Acessar e ganhar bônus
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="card-gaming max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Quer ser nosso parceiro?</h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato para discutir oportunidades de parceria
              </p>
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gaming-outline inline-flex items-center gap-2"
              >
                <Handshake className="w-5 h-5" />
                Entre em contato
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiros;
