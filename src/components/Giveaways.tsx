import { Award, TrendingUp, Loader2, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllGiveaways, type GiveawayItem } from "@/lib/api";
import { BRAND } from "@/lib/brand";

const formatCurrency = (valueInCents: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInCents / 100);
};

const Giveaways = () => {
  const [giveaways, setGiveaways] = useState<GiveawayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const loadGiveaways = async (retryCount = 0): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const gifts = await fetchAllGiveaways("BRL");

        if (gifts.length > 0) {
          setGiveaways(gifts.slice(0, 12));
          setLoading(false);
          return;
        }

        if (retryCount < 3) {
          setTimeout(
            () => loadGiveaways(retryCount + 1),
            1000 * (retryCount + 1),
          );
          return;
        }
        setError("Nenhum sorteio encontrado");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching giveaways:", err);
        if (retryCount < 3) {
          setTimeout(
            () => loadGiveaways(retryCount + 1),
            1000 * (retryCount + 1),
          );
          return;
        }
        setError("Erro ao carregar sorteios");
        setLoading(false);
      }
    };

    loadGiveaways();
  }, [reloadTick]);

  return (
    <section id="sorteios" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Sorteios{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              em destaque
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Skins lendárias e prêmios exclusivos esperando por você.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-background/50 backdrop-blur-sm rounded-2xl border border-destructive/20 max-w-md mx-auto">
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              type="button"
              onClick={() => setReloadTick((v) => v + 1)}
              className="btn-gaming-outline inline-flex items-center gap-2 text-sm py-3 px-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {giveaways.map((giveaway) => {
              const isActive = giveaway.winner === null;
              const colorParts = giveaway.item.color
                ?.split(",")
                .map(Number) || [235, 75, 75];
              const [r, g, b] =
                colorParts.length >= 3 ? colorParts : [235, 75, 75];
              const rgbString = `${r}, ${g}, ${b}`;

              return (
                <div
                  key={giveaway.id}
                  className="group relative flex flex-col rounded-2xl bg-background/60 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 z-10"
                  style={{
                    boxShadow: `0 0 40px -15px rgba(${rgbString}, 0.0)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 15px 40px -10px rgba(${rgbString}, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 40px -15px rgba(${rgbString}, 0.0)`;
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(${rgbString}, 0.2), transparent 70%)`,
                    }}
                  />

                  <div className="absolute top-4 right-4 z-20">
                    {isActive ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-green-500/30 text-xs font-bold text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                        <Circle className="w-2 h-2 fill-current animate-pulse" />
                        Ativo
                      </div>
                    ) : (
                      <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-muted-foreground">
                        Finalizado
                      </div>
                    )}
                  </div>

                  <div
                    className="relative h-56 flex items-center justify-center p-6 overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, rgba(${rgbString},0.15) 0%, rgba(${rgbString},0.02) 100%)`,
                    }}
                  >
                    <img
                      src={giveaway.item.image}
                      alt={giveaway.item.name}
                      className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2 group-hover:drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied === "true") return;
                        img.dataset.fallbackApplied = "true";
                        img.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-t from-background via-background/95 to-transparent relative z-20">
                    <h3 className="font-bold text-base mb-4 line-clamp-2 min-h-[3rem] text-foreground/90 group-hover:text-foreground transition-colors">
                      {giveaway.item.name}
                    </h3>

                    <div className="space-y-3 mt-auto">
                      <div className="flex items-end justify-between p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                            Valor Estimado
                          </span>
                          <span
                            className="text-lg font-black tracking-tight"
                            style={{ color: `rgb(${rgbString})` }}
                          >
                            {formatCurrency(giveaway.convertedValue)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2">
                        <span className="text-xs text-muted-foreground font-medium">
                          Depósito mínimo
                        </span>
                        <span className="text-sm font-bold text-foreground/80">
                          {formatCurrency(giveaway.convertedMinDepositValue)}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <a
                        href={BRAND.csgoSkins}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 w-full relative overflow-hidden rounded-lg font-bold text-sm py-3 flex items-center justify-center text-white transition-all duration-300 group/btn"
                        style={{
                          background: `linear-gradient(90deg, rgba(${rgbString}, 0.8), rgba(${rgbString}, 1))`,
                          boxShadow: `0 4px 15px rgba(${rgbString}, 0.3)`,
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Participar Agora
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      </a>
                    )}

                    {!isActive && giveaway.winner && (
                      <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <img
                          src={giveaway.winner.avatar}
                          alt={giveaway.winner.name}
                          className="w-8 h-8 rounded-full border border-white/20"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.dataset.fallbackApplied === "true") return;
                            img.dataset.fallbackApplied = "true";
                            img.src = "/placeholder.svg";
                          }}
                        />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                            Vencedor
                          </span>
                          <span className="text-sm font-bold text-foreground truncate">
                            {giveaway.winner.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Giveaways;
