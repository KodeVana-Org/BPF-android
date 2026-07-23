import {useInfiniteQuery, QueryKey} from '@tanstack/react-query';
import ApiManager from '../../api/ApiManager';

interface YoutubePage {
  items: any[];
  nextPageToken?: string;
}
type YoutubeError = {
  code: number;
  message: string;
};

const YOUTUBE_VIDEOS_QUERY_KEY: QueryKey = ['youtubeVideos'];

export const useYoutubeVideos = () => {
  return useInfiniteQuery<
    YoutubePage, // Data
    YoutubeError, // Error
    YoutubePage, // Paginated structure
    QueryKey, // Query key
    string | undefined // pageParam
  >({
    queryKey: YOUTUBE_VIDEOS_QUERY_KEY,

    queryFn: async ({pageParam}): Promise<YoutubePage> => {
      const params: any = {};
      if (pageParam) {
        params.pageToken = pageParam;
      }

      try {
        const response = await ApiManager.get('youtube/videos', {params});
        return response.data as YoutubePage;
      } catch (err: any) {
        // Extract and handle quota error
        if (
          err?.response?.status === 403 &&
          err?.response?.data?.error?.message?.includes('quota')
        ) {
          console.error('YouTube quota exceeded. Stopping further fetches.');
          throw new Error('YouTube quota exceeded. Try again later.');
        }

        // Re-throw other errors
        throw err;
      }
    },

    initialPageParam: undefined,

    getNextPageParam: lastPage => {
      // If quota was exceeded or there's no next token, stop pagination
      return lastPage?.nextPageToken ?? undefined;
    },

    retry: false, // 🔒 Disable retry on failure to avoid re-hitting the API
  });
};
