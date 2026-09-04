import { useQuery } from '@tanstack/react-query';
import { fetchYoutubeVideos, type YoutubeVideo } from '@/lib/api';

export type { YoutubeVideo };

export const useYoutubeVideos = (options?: {
  limit?: number;
  shortsOnly?: boolean;
  videosOnly?: boolean;
}) => {
  const { limit, shortsOnly, videosOnly } = options || {};
  const includeShorts = !videosOnly;

  return useQuery({
    queryKey: ['youtube-videos', limit, shortsOnly, videosOnly],
    queryFn: async () => {
      const videos = await fetchYoutubeVideos({
        maxResults: limit ?? 50,
        includeShorts,
      });

      let filtered = videos;
      if (shortsOnly) {
        filtered = videos.filter((v) => v.isShort || v.is_short);
      } else if (videosOnly) {
        filtered = videos.filter((v) => !(v.isShort || v.is_short));
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
