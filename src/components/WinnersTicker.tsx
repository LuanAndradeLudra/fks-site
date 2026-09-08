import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { fetchDepositGifts } from '@/lib/api';
import SkinImage from '@/components/SkinImage';

interface Winner {
  id: string;
  item_name: string;
  item_image: string | null;
  item_color: string | null;
  converted_value: number;
  winner_name: string | null;
  winner_avatar: string | null;
}

const WinnersTicker = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const gifts = await fetchDepositGifts({ isActive: 'false', currency: 'BRL' });
        const mapped = gifts
          .filter((g) => g.winner?.name)
          .sort((a, b) => (b.wonAt ?? 0) - (a.wonAt ?? 0))
          .slice(0, 20)
          .map((g) => ({
            id: g.id,
            item_name: g.item.name,
            item_image: g.item.image,
            item_color: g.item.color,
            converted_value: g.convertedValue,
            winner_name: g.winner?.name ?? null,
            winner_avatar: g.winner?.avatar ?? null,
          }));
        setWinners(mapped);
      } catch (error) {
        console.error('Error fetching winners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if (isLoading || winners.length === 0) return null;

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  };

  const getColorStyle = (color: string | null) => {
    if (!color) return {};
    const [r, g, b] = color.split(',').map(Number);
    return { color: `rgb(${r}, ${g}, ${b})` };
  };

  return (
    <section className="py-3 bg-gradient-to-r from-background via-card/60 to-background border-y border-primary/15 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-3 px-6 py-3 bg-primary/10 border-r border-primary/30 z-10">
          <div className="flex flex-col items-center gap-1">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              Últimos
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              Ganhadores
            </span>
          </div>
        </div>

        {/* Scrolling container */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content - two identical strips for seamless loop */}
          <div className="flex w-fit hover:[animation-play-state:paused]" style={{ animation: 'scroll-left 40s linear infinite' }}>
            {/* First set */}
            {winners.map((winner, index) => (
              <div
                key={`first-${winner.id}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-2 border-r border-border/30 hover:bg-card/30 transition-colors group"
              >
                {/* Skin Image */}
                <div className="relative w-16 h-12 flex-shrink-0">
                  {winner.item_image || winner.item_name ? (
                    <SkinImage
                      name={winner.item_name}
                      image={winner.item_image}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    {winner.winner_avatar ? (
                      <img
                        src={winner.winner_avatar}
                        alt={winner.winner_name || 'Ganhador'}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                      {winner.winner_name || 'Anônimo'}
                    </span>
                  </div>
                  <span 
                    className="text-xs truncate max-w-[140px] opacity-80"
                    style={getColorStyle(winner.item_color)}
                  >
                    {winner.item_name}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatValue(winner.converted_value)}
                  </span>
                </div>
              </div>
            ))}
            {/* Second set (duplicate for seamless loop) */}
            {winners.map((winner, index) => (
              <div
                key={`second-${winner.id}-${index}`}
                className="flex-shrink-0 flex items-center gap-4 px-6 py-2 border-r border-border/30 hover:bg-card/30 transition-colors group"
              >
                {/* Skin Image */}
                <div className="relative w-16 h-12 flex-shrink-0">
                  {winner.item_image || winner.item_name ? (
                    <SkinImage
                      name={winner.item_name}
                      image={winner.item_image}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    {winner.winner_avatar ? (
                      <img
                        src={winner.winner_avatar}
                        alt={winner.winner_name || 'Ganhador'}
                        className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-foreground truncate max-w-[120px]">
                      {winner.winner_name || 'Anônimo'}
                    </span>
                  </div>
                  <span 
                    className="text-xs truncate max-w-[140px] opacity-80"
                    style={getColorStyle(winner.item_color)}
                  >
                    {winner.item_name}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatValue(winner.converted_value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnersTicker;
