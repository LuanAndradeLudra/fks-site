import { MonitorPlay } from "lucide-react";

const TWITCH_PANELS = [
  {
    id: "csgobig",
    link: "https://csgobig.com/r/nizo",
    image:
      "https://panels.twitch.tv/panel-224534947-image-84d92b74-90bc-46e7-a03f-6cbbd7e67870",
    alt: "CSGOBIG",
  },
  {
    id: "pirateswap",
    link: "https://pirateswap.com/?ref=fks",
    image:
      "https://panels.twitch.tv/panel-224534947-image-f86e1952-5bec-424d-a3ad-e39edcc32f94",
    alt: "Pirate Swap",
  },
  {
    id: "viresub",
    link: "https://www.twitch.tv/subs/fkswp",
    image:
      "https://panels.twitch.tv/panel-224534947-image-49de1f0b-c7cf-4d9c-8b60-477cb9d69a4a",
    alt: "Vire Sub",
  },
  {
    id: "donate",
    link: "https://streamelements.com/fkswp/tip",
    image:
      "https://panels.twitch.tv/panel-224534947-image-1ab0536f-ca01-4971-b76c-e56ca5a7b906",
    alt: "Faça sua Donate",
  },
  {
    id: "lojinha",
    link: "https://streamelements.com/fkswp/store",
    image:
      "https://panels.twitch.tv/panel-224534947-image-a6a6fed8-625f-4810-b23a-ad82b1862324",
    alt: "Lojinha",
  },
  {
    id: "setup",
    link: null,
    image:
      "https://panels.twitch.tv/panel-224534947-image-1f66c44a-2d0c-4899-8301-705a669d76a2",
    alt: "Meu Setup",
    description:
      "Processador Ryzen 9 5900x 4.8 GHz\nPlaca de video RTX 3080\n32 GB RAM 3600MHZ\nHD 4GB SSD 240GB\nPlaca mae X570 AORUS ELITE\nMonitor Alienware 240hz",
  },
  {
    id: "horario",
    link: null,
    image:
      "https://panels.twitch.tv/panel-224534947-image-838bebe2-c092-4407-89c4-23c5d14b4f54",
    alt: "Horário",
  },
  {
    id: "youtube",
    link: "https://www.youtube.com/c/fkSCSGO",
    image:
      "https://panels.twitch.tv/panel-224534947-image-feddf6f0-bcea-4927-b744-56fc1c5af5b2",
    alt: "YouTube",
  },
] as const;

const TwitchPanels = () => {
  return (
    <section
      id="links"
      className="py-16 md:py-24 relative overflow-hidden bg-card/30"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Apoie o <span className="text-primary">Canal</span> na Twitch
          </h2>
          <p className="text-muted-foreground">
            Confira nossos patrocinadores, benefícios de sub e plataformas.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {TWITCH_PANELS.map((panel) => {
            const className =
              "group relative block w-full break-inside-avoid overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.2)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background bg-black/20";

            const content = (
              <>
                <img
                  src={panel.image}
                  alt={panel.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {"description" in panel && panel.description && (
                  <div className="p-4 bg-background/90 backdrop-blur border-t border-white/5 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {panel.description}
                  </div>
                )}

                {panel.link && (
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />
                )}
              </>
            );

            if (panel.link) {
              return (
                <a
                  key={panel.id}
                  href={panel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={panel.id} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TwitchPanels;
