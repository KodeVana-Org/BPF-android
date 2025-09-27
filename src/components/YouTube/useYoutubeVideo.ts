import {useInfiniteQuery, QueryKey} from '@tanstack/react-query';
import ApiManager from '../../api/ApiManager';

interface YoutubePage {
  items: any[];
  nextPageToken?: string;
}
type YoutubeError = Error;

const YOUTUBE_VIDEOS_QUERY_KEY: QueryKey = ['youtubeVideos'];

export const useYoutubeVideos = () => {
  return useInfiniteQuery<
    YoutubePage, // Data type
    YoutubeError, // Error type
    YoutubePage, // Paginated data structure
    QueryKey, // Query key
    string | undefined // pageParam type
  >({
    queryKey: YOUTUBE_VIDEOS_QUERY_KEY,

    queryFn: async ({pageParam}): Promise<YoutubePage> => {
      const params: any = {};
      if (pageParam) {
        params.pageToken = pageParam;
      }
      const response = await ApiManager.get('youtube/videos', {params});
      return response.data as YoutubePage;
    },

    initialPageParam: undefined,

    getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
  });
};
