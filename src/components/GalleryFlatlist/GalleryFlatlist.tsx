import React from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { get_gallery, GalleryItem } from '../../api/app_data_apis';

const { width } = Dimensions.get('window');

interface GalleryProps {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
  isHomeScreen?: boolean; // Set to true when rendered on Home Screen
}

const GalleryFlatlist = ({
  horizontal,
  marginType,
  isHomeScreen = false,
}: GalleryProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['gallery'],
    queryFn: ({ pageParam }) => get_gallery({ cursor: pageParam, limit: 10 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: any) => {
      // Disable pagination completely on the Home Screen
      if (isHomeScreen) return undefined;

      const pagination = lastPage?.data?.pagination;
      return pagination?.hasMore ? pagination?.nextCursor : undefined;
    },
  });

  // Extract items cleanly
  const galleryList = React.useMemo(() => {
    if (!data?.pages) return [];

    const items = data.pages
      .flatMap((page: any) => page?.data?.gallery ?? [])
      .filter((item): item is GalleryItem => Boolean(item && item._id));

    // If on Home Screen, slice strictly to max 10 items
    return isHomeScreen ? items.slice(0, 10) : items;
  }, [data, isHomeScreen]);

  const calculateMargin = () => {
    return marginType === 'bottom' ? { marginBottom: 20 } : { marginRight: 20 };
  };

  const handleLoadMore = () => {
    // Only fetch next page if NOT on Home Screen
    if (!isHomeScreen && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (isHomeScreen || !isFetchingNextPage) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Failed to load gallery.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, calculateMargin()]}>
      <FlatList<GalleryItem>
        data={galleryList}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?._id ?? `gallery-item-${index}`}
        contentContainerStyle={{ paddingRight: horizontal ? 16 : 0 }}
        
        // --- PAGINATION (Enabled only on Full Gallery screen) ---
        onEndReached={isHomeScreen ? undefined : handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        
        onRefresh={refetch}
        refreshing={isLoading}
        renderItem={({ item }) => {
          if (!item || !item.imageUrl || item.imageUrl.length === 0) return null;

          return (
            <View style={[styles.postContainer, calculateMargin()]}>
              <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: width - 20,
  },
  image: {
    width: width - 40,
    height: width - 60,
    borderRadius: 7,
  },
  text: {
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default GalleryFlatlist;
