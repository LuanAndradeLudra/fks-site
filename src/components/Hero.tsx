import { Sparkles, Trophy } from "lucide-react";
import bannerRender from "@/assets/hero.png";
import { BRAND } from "@/lib/brand";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={bannerRender}
          alt={`${BRAND.name} ${BRAND.handle}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 md:via-background/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 leading-tight">
            A CAIXA TE COMEU?
            <br />O FKS TE DEVOLVE.
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
            Use o cupom{" "}
            <span className="text-primary font-bold">{BRAND.coupon}</span> nos
            patrocinadores, entre nos sorteios e recupere o que a caixa comeu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
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

          <div className="flex flex-wrap gap-8 md:gap-12 mt-12 max-w-lg">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display">
                500+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Sorteios
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display">
                50K+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Participantes
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary font-display">
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
