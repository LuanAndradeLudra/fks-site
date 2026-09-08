import { Award, TrendingUp, Loader2, Trophy, CheckCircle, Clock, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchAllGiveaways, type GiveawayItem } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkinImage from '@/components/SkinImage';
import csgoSkinsLogo from '@/assets/sponsors/csgo-skins.png';
import { BRAND } from '@/lib/brand';

const formatCurrency = (valueInCents: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100);
};

const Sorteios = () => {
  const [allGiveaways, setAllGiveaways] = useState<GiveawayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);
  const [filter, setFilter] = useState<'all' | 'active' | 'finished'>('all');

  // Stats
  const activeCount = allGiveaways.filter(g => g.winner === null).length;
  const finishedCount = allGiveaways.filter(g => g.winner !== null).length;
  const totalValue = allGiveaways.reduce((sum, g) => sum + g.convertedValue, 0);

  // Filtered giveaways
  const filteredGiveaways = allGiveaways.filter(g => {
    if (filter === 'active') return g.winner === null;
    if (filter === 'finished') return g.winner !== null;
    return true;
  });

  useEffect(() => {
    const loadGiveaways = async () => {
      try {
        setLoading(true);
        setError(null);
        const gifts = await fetchAllGiveaways('BRL');
        setAllGiveaways(gifts);
      } catch (err) {
        console.error('Error fetching giveaways:', err);
        setError('Erro ao carregar sorteios');
      } finally {
        setLoading(false);
      }
    };

    loadGiveaways();
  }, [reloadTick]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Todos os Sorteios</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Sorteios <span className="text-primary">CSGO Skins</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Participe dos sorteios e ganhe skins incríveis
            </p>
          </div>

          {/* Info Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="card-gaming p-6">
              <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={csgoSkinsLogo} 
                    alt="CSGO-SKINS" 
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Como participar dos sorteios?</h3>
                  <span className="text-xs text-primary font-medium uppercase tracking-wide">CSGO-SKINS</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Os sorteios são 100% automáticos e integrados à plataforma do CSGO-SKINS. Para participar, basta depositar utilizando o CUPOM {BRAND.coupon} no CSGO-SKINS. Cada depósito gera novas entradas no sorteio, ou seja, quanto mais você deposita, maiores são suas chances de ganhar. O sistema registra tudo automaticamente, escolhe o vencedor de forma transparente e envia o prêmio na hora.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-black text-green-500">{activeCount}</div>
              <div className="text-sm text-muted-foreground">Ativos</div>
            </div>
            
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-3xl font-black text-foreground">{finishedCount}</div>
              <div className="text-sm text-muted-foreground">Encerrados</div>
            </div>
            
            <div className="card-gaming text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-primary">{formatCurrency(totalValue)}</div>
              <div className="text-sm text-muted-foreground">Valor Total</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all inline-flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Todos ({allGiveaways.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all inline-flex items-center gap-2 ${
                filter === 'active'
                  ? 'bg-green-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Clock className="w-4 h-4" />
              Ativos ({activeCount})
            </button>
            <button
              onClick={() => setFilter('finished')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all inline-flex items-center gap-2 ${
                filter === 'finished'
                  ? 'bg-muted-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Encerrados ({finishedCount})
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">{error}</p>
              <button
                type="button"
                onClick={() => setReloadTick((v) => v + 1)}
                className="btn-gaming-outline mt-6 inline-flex items-center gap-2 text-sm py-3 px-6"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Giveaways Grid */}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGiveaways.map((giveaway) => {
                const isActive = giveaway.winner === null;
                const colorParts = giveaway.item.color?.split(',').map(Number) || [235, 75, 75];
                const [r, g, b] = colorParts.length >= 3 ? colorParts : [235, 75, 75];
                
                return (
                  <a
                    key={giveaway.id}
                    href={BRAND.csgoSkins}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-gaming group overflow-hidden block cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {isActive ? (
                        <span className="status-badge-active">Ativo</span>
                      ) : (
                        <span className="status-badge-finished">Finalizado</span>
                      )}
                    </div>

                    {/* Image */}
                    <div 
                      className="relative h-48 flex items-center justify-center mb-4 rounded-lg overflow-hidden bg-background/50"
                      style={{
                        background: `linear-gradient(135deg, rgba(${r},${g},${b},0.2) 0%, rgba(${r},${g},${b},0.05) 100%)`
                      }}
                    >
                      <SkinImage
                        name={giveaway.item.name}
                        image={giveaway.item.image}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-bold text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                        {giveaway.item.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Valor</span>
                          <span 
                            className="font-bold"
                            style={{ color: `rgb(${r},${g},${b})` }}
                          >
                            {formatCurrency(giveaway.convertedValue)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Depósito mínimo</span>
                          <span className="text-sm text-foreground">
                            {formatCurrency(giveaway.convertedMinDepositValue)}
                          </span>
                        </div>
                      </div>

                      {!isActive && giveaway.winner && (
                        <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-background/50">
                          <img
                            src={giveaway.winner.avatar}
                            alt={giveaway.winner.name}
                            className="w-6 h-6 rounded-full"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.dataset.fallbackApplied === 'true') return;
                              img.dataset.fallbackApplied = 'true';
                              img.src = '/placeholder.svg';
                            }}
                          />
                          <span className="text-xs text-muted-foreground truncate">
                            Vencedor: {giveaway.winner.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredGiveaways.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Nenhum sorteio encontrado com esse filtro</p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href={BRAND.csgoSkins}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gaming-primary inline-flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Ver no Site Oficial
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sorteios;
