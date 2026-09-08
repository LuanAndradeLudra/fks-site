const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const TENANT = 'fks';

export interface GiveawayItem {
  id: string;
  item: {
    name: string;
    color: string;
    image: string;
  };
  value: number;
  minDepositValue: number;
  convertedValue: number;
  convertedMinDepositValue: number;
  availableFrom: number;
  boostCount: number;
  winner: {
    id: number;
    name: string;
    avatar: string;
  } | null;
  wonAt: number | null;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  duration?: string;
  isShort?: boolean;
  /** Compatibility with previous Supabase shape */
  thumbnail_url?: string | null;
  is_short?: boolean;
}

function buildUrl(path: string, params?: Record<string, string>) {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchDepositGifts(options?: {
  isActive?: 'true' | 'false';
  currency?: string;
}): Promise<GiveawayItem[]> {
  const data = await getJson<{ gifts?: GiveawayItem[] }>(
    buildUrl(`/api/${TENANT}/csgoskins/deposit-gifts`, {
      isActive: options?.isActive ?? 'true',
      currency: options?.currency ?? 'BRL',
    }),
  );
  return data.gifts ?? [];
}

/** Active + finished giveaways, sorted (active first by value, then finished by wonAt). */
export async function fetchAllGiveaways(currency = 'BRL'): Promise<GiveawayItem[]> {
  const [active, finished] = await Promise.all([
    fetchDepositGifts({ isActive: 'true', currency }),
    fetchDepositGifts({ isActive: 'false', currency }),
  ]);

  const byId = new Map<string, GiveawayItem>();
  [...active, ...finished].forEach((gift) => {
    byId.set(gift.id, {
      ...gift,
      winner: gift.winner ?? null,
      wonAt: gift.wonAt ?? null,
    });
  });

  return [...byId.values()].sort((a, b) => {
    const aActive = a.winner === null;
    const bActive = b.winner === null;
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;
    if (aActive && bActive) return b.convertedValue - a.convertedValue;
    return (b.wonAt ?? 0) - (a.wonAt ?? 0);
  });
}

export async function fetchYoutubeVideos(options?: {
  maxResults?: number;
  includeShorts?: boolean;
}): Promise<YoutubeVideo[]> {
  const params: Record<string, string> = {
    maxResults: String(options?.maxResults ?? 6),
    includeShorts: options?.includeShorts === false ? 'false' : 'true',
  };

  const data = await getJson<{ videos?: YoutubeVideo[] }>(
    buildUrl(`/api/${TENANT}/youtube/videos`, params),
  );

  return (data.videos ?? []).map((video) => ({
    ...video,
    is_short: video.isShort ?? false,
    thumbnail_url: video.thumbnail_url ?? null,
  }));
}
