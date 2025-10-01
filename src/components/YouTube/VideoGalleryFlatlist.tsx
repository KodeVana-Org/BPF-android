import React, {useCallback, useRef, useState} from 'react';
import YouTube from 'react-native-youtube-iframe';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {useYoutubeVideos} from './useYoutubeVideo';

const YoutubeScreen = () => {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useYoutubeVideos();
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  const videos = data?.pages?.flat() || [];

  // Handle visibility changes to auto-pause videos
  // const onViewableItemsChanged = useCallback(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     const visibleItem = viewableItems[0].item; // Play the topmost visible video
  //     setCurrentlyPlayingId(visibleItem.videoId);
  //   } else {
  //     setCurrentlyPlayingId(null); // Pause if no video is visible
  //   }
  // }, []);

  // const viewabilityConfig = useRef({
  //   itemVisiblePercentThreshold: 80, // Consider item visible if 80% is in view
  // });

  const renderItem = useCallback(
    ({item}) => (
      <YoutubeVideoItem
        item={item}
        currentlyPlayingId={currentlyPlayingId}
        setCurrentlyPlayingId={setCurrentlyPlayingId}
      />
    ),
    [currentlyPlayingId],
  );

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0].item;
      setCurrentlyPlayingId(visibleItem.videoId);
    } else {
      setCurrentlyPlayingId(null);
    }
  });

  const viewConfigRef = useRef({itemVisiblePercentThreshold: 80});

  // ✅ Show loading
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // ✅ Show error
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load videos.</Text>
        <Text style={styles.errorText}>
          {error?.message ?? 'Something went wrong.'}
        </Text>
      </View>
    );
  }

  // ✅ Show empty state
  if (videos.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No YouTube videos found.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.videoId}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#999" />
          ) : null
        }
        viewabilityConfigCallbackPairs={
          useRef([
            {
              onViewableItemsChanged: onViewRef.current,
              viewabilityConfig: viewConfigRef.current,
            },
          ]).current
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
      {videos.length === 0 ? <Text>no youtube videos</Text> : null}
    </View>
  );
};

export default YoutubeScreen;

const formatDuration = seconds => {
  if (seconds === 'upcoming') return 'UPCOMING';
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
};

const YoutubeVideoItem = React.memo(
  ({item, currentlyPlayingId, setCurrentlyPlayingId}) => {
    const isPlaying = currentlyPlayingId === item.videoId;

    const handlePlay = () => {
      setCurrentlyPlayingId(item.videoId);
    };

    return (
      <View style={styles.video}>
        {isPlaying ? (
          <YouTube
            videoId={item.videoId}
            play={true}
            style={styles.videoPlayer}
          />
        ) : (
          <TouchableOpacity onPress={handlePlay} activeOpacity={0.9}>
            <FastImage
              source={{
                uri: item.thumbnailUrl,
                priority: FastImage.priority.normal,
              }}
              style={styles.thumbnail}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.durationOverlay}>
              <Text style={styles.durationText}>
                {formatDuration(item.duration)}
              </Text>
            </View>
            <View style={styles.playIconContainer}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.publishDate}>
            {/* Published on: {item?.publishedAt?.substring(0, 10) ?? 'Unknown'} */}
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 0,
  },
  video: {
    marginBottom: 20,
    // borderRadius: 10,
    overflow: 'hidden',
  },

  playIconContainer: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    // borderRadius: 0,
  },
  durationOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  textContainer: {
    paddingHorizontal: 30,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  publishDate: {
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // or light gray if preferred
  },
  errorText: {
    color: '#D32F2F', // Material Red 700
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});
