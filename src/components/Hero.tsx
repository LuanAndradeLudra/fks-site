import bannerRender from "@/assets/hero.png";
import { BRAND } from "@/lib/brand";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[700px] lg:min-h-[800px] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={bannerRender}
          alt={`${BRAND.name} ${BRAND.handle}`}
          className="w-full h-full object-cover object-center md:object-right"
          fetchPriority="high"
        />

        <div className="absolute inset-0 bg-background/80 md:bg-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 md:via-background/80 to-transparent md:w-3/4 lg:w-2/3" />

        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
        <div className="max-w-3xl text-left">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            A Valve nunca vai te dar uma Dragon Lore.
            <br />
            <span className="text-primary">Mas a gente pode.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl">
            Abra suas caixas no site certo. Cada depósito te coloca
            automaticamente nos maiores sorteios de skins do Brasil — 100%
            transparente, em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-12">
            <a
              href="#ofertas"
              className="btn-gaming-primary flex items-center justify-center gap-2 min-w-[200px]"
            >
              Patrocinadores
            </a>
            <a
              href="#sorteios"
              className="btn-gaming-outline flex items-center justify-center gap-2 min-w-[200px] bg-background/30 backdrop-blur-sm"
            >
              Sorteios
            </a>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10 max-w-2xl">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                500+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
                Sorteios
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                1000+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
                Ganhadores
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                R$ 1.000.000,00+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
                Em skins
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
