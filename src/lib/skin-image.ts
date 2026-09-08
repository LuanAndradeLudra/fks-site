/** Steam CDN via steamapis — more reliable than items.csgo-skins.com (Cloudflare blocks some browsers). */
export function steamItemImageUrl(marketHashName: string): string {
  return `https://api.steamapis.com/image/item/730/${encodeURIComponent(marketHashName)}`;
}

export function skinImageCandidates(item: {
  name: string;
  image?: string | null;
}): string[] {
  const candidates = [steamItemImageUrl(item.name), item.image || null, '/placeholder.svg'];
  return [...new Set(candidates.filter(Boolean))] as string[];
}
