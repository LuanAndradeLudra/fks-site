import { Sparkles, Trophy } from "lucide-react";
import banner from "@/assets/banner.jpg";
import { BRAND } from "@/lib/brand";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative pt-16 md:pt-[4.5rem] overflow-hidden"
    >
      <div className="relative w-full">
        <img
          src={banner}
          alt={`${BRAND.name} ${BRAND.handle}`}
          className="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 -mt-10 md:-mt-14 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            {BRAND.tagline}
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Use o cupom{" "}
            <span className="text-primary font-bold">{BRAND.coupon}</span> nos
            patrocinadores, entre nos sorteios e recupere o que a caixa comeu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#ofertas"
              className="btn-gaming-primary flex items-center justify-center gap-2"
            >
              Patrocinadores
            </a>
            <a
              href="#sorteios"
              className="btn-gaming-outline flex items-center justify-center gap-2"
            >
              Sorteios
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary font-display">
                500+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Sorteios
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary font-display">
                50K+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Participantes
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary font-display">
                R$ 100K+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Em prêmios
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
