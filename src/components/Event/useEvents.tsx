// useEvents.ts
import {useQuery} from '@tanstack/react-query';
import ApiManager from '../../api/ApiManager';
import {AxiosError} from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

interface Event {
  _id: string;
  banner: string;
  desc: string;
  location: string;
  dateOfEvent: string;
  timeOfEvent: string;
}

interface EventPayload {
  desc: string;
  location: string;
  dateOfEvent: string;
  timeOfEvent: string;
  creator: string;
}

//fetcing events
export const useEvents = () =>
  useQuery<Event[], AxiosError>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await ApiManager.get('/event/get-event');
      if (!response?.data?.events || !Array.isArray(response.data.events)) {
        throw new Error('Invalid response format');
      }
      return response.data.events;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Don’t refetch automatically on focus
  });

//creating event
export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (newEvent: EventPayload) => {
      const response = await ApiManager.post(
        `/event/create-event/${newEvent.creator}`,
        newEvent,
      );
      return response.data;
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventId: string) => {
      const response = await ApiManager.delete(
        `/event/delete-event/${eventId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']); // Refetch updated list
    },
    onError: (error: any) => {
      console.error('Error deleting event:', error);
    },
  });
};
