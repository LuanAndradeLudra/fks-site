import { useQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos, type YoutubeVideo } from '@/lib/api';

export type { YoutubeVideo };

/** YouTube Shorts can be up to 3 minutes; API often misses the isShort flag. */
const SHORTS_MAX_SECONDS = 180;

const parseDurationSeconds = (duration?: string): number | null => {
  if (!duration) return null;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  return hours * 3600 + minutes * 60 + seconds;
};

export const isYoutubeShort = (video: YoutubeVideo): boolean => {
  if (video.isShort || video.is_short) return true;
  const seconds = parseDurationSeconds(video.duration);
  return seconds !== null && seconds > 0 && seconds <= SHORTS_MAX_SECONDS;
};

export const useYoutubeVideos = (options?: {
  limit?: number;
  shortsOnly?: boolean;
  videosOnly?: boolean;
}) => {
  const { limit, shortsOnly, videosOnly } = options || {};
  const needsFilter = Boolean(shortsOnly || videosOnly);

  return useQuery({
    queryKey: ['youtube-videos', limit, shortsOnly, videosOnly],
    queryFn: async () => {
      // Fetch a larger batch when filtering so limit still fills after excluding shorts/videos.
      const maxResults = needsFilter
        ? Math.max(limit ?? 50, 50)
        : (limit ?? 50);

      const videos = await fetchYoutubeVideos({
        maxResults,
        includeShorts: !videosOnly,
      });

      let filtered = videos;
      if (shortsOnly) {
        filtered = videos.filter(isYoutubeShort);
      } else if (videosOnly) {
        filtered = videos.filter((v) => !isYoutubeShort(v));
      }

      if (limit) {
        filtered = filtered.slice(0, limit);
      }

      return filtered;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const formatViewCount = (count: number | string): string => {
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  if (isNaN(num)) return '0';

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace('.0', '')}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace('.0', '')}K`;
  }
  return num.toString();
};
