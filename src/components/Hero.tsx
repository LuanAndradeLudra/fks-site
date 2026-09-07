import { Sparkles } from "lucide-react";
import bannerRender from "@/assets/hero.png";
import { BRAND } from "@/lib/brand";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[700px] lg:min-h-[850px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerRender}
          alt={`${BRAND.name} ${BRAND.handle}`}
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />

        {/* Camada para escurecer a imagem e garantir a leitura do texto central */}
        <div className="absolute inset-0 bg-background/80 md:bg-background/70 backdrop-blur-[2px]" />

        {/* Brilho (Glow) Central na cor primária para destacar o conteúdo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

        {/* Gradiente inferior para fundir com a próxima seção */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 flex flex-col items-center text-center mt-10">
        {/* Título */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight max-w-4xl tracking-tight">
          A Valve nunca vai te dar uma Dragon Lore.
          <br />
          <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.4)]">
            Mas a gente pode.
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Abra suas caixas no site certo. Cada depósito te coloca
          automaticamente nos maiores sorteios de skins do Brasil — 100%
          transparente, em tempo real.
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-16">
          <a
            href="#ofertas"
            className="btn-gaming-primary flex items-center justify-center gap-2 min-w-[200px]"
          >
            Patrocinadores
          </a>
          <a
            href="#sorteios"
            className="btn-gaming-outline flex items-center justify-center gap-2 min-w-[200px] bg-background/50 backdrop-blur-sm"
          >
            Sorteios
          </a>
        </div>

        {/* Estatísticas */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 max-w-3xl border-t border-white/10 pt-10">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              500+
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
              Sorteios
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              1000+
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
              Ganhadores
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-black text-primary font-display drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              R$1.000.000,00+
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-semibold tracking-wider uppercase mt-1">
              Em skins
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
