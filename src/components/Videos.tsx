import { Play, Youtube, ArrowRight } from "lucide-react";
import { useYoutubeVideos } from "@/hooks/use-youtube-videos";
import { Skeleton } from "@/components/ui/skeleton";
import { BRAND } from "@/lib/brand";

const Videos = () => {
  const { data: videos, isLoading } = useYoutubeVideos({
    limit: 6,
    videosOnly: true,
  });

  return (
    <section id="videos" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-destructive/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-6 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
            <Youtube className="w-4 h-4 text-destructive" />
            <span className="text-xs font-bold text-destructive uppercase tracking-wider">
              Canal Oficial
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Últimos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-red-500">
              Vídeos
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Acompanhe as melhores jogadas, dicas e novidades diretamente do
            nosso canal.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-2xl border border-white/5 bg-background/40 overflow-hidden"
                >
                  <Skeleton className="aspect-video w-full rounded-none bg-white/5" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-full mb-3 bg-white/5" />
                    <Skeleton className="h-5 w-2/3 bg-white/5" />
                  </div>
                </div>
              ))
            : videos?.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-2xl bg-background/60 backdrop-blur-md border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-destructive/30 hover:shadow-[0_15px_40px_-10px_rgba(220,38,38,0.25)] z-10"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={
                        video.thumbnail_url ||
                        `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
                      }
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.includes("hqdefault")) {
                          img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-500 delay-75">
                        <Play
                          className="w-7 h-7 text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow bg-gradient-to-t from-background via-background/95 to-transparent relative z-20">
                    <h3 className="font-bold text-base line-clamp-2 text-foreground/90 group-hover:text-white transition-colors duration-300 mb-4">
                      {video.title}
                    </h3>

                    <div className="mt-auto flex items-center gap-2 text-destructive text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Assistir agora <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
        </div>

        <div className="text-center mt-16">
          <a
            href={BRAND.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
            style={{
              background: "linear-gradient(90deg, #DC2626 0%, #EF4444 100%)",
            }}
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <Youtube className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Inscreva-se no Canal</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Videos;
