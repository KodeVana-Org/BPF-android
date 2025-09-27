import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useYoutubeVideos} from './useYoutubeVideo';

const YoutubeScreen = () => {
  const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useYoutubeVideos();

  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  const videos = data?.pages.flatMap(page => page.videos) || [];
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const renderItem = ({item}) => (
    <YoutubeVideoItem
      item={item}
      currentlyPlayingId={currentlyPlayingId}
      setCurrentlyPlayingId={setCurrentlyPlayingId}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#999" />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
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

const YoutubeVideoItem = ({
  item,
  currentlyPlayingId,
  setCurrentlyPlayingId,
}) => {
  const isPlaying = currentlyPlayingId === item.videoId;

  const handlePlay = () => {
    setCurrentlyPlayingId(item.videoId);
  };

  return (
    <View style={styles.video}>
      {isPlaying ? (
        <WebView
          style={styles.videoPlayer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: `https://www.youtube.com/embed/${item.videoId}?autoplay=1`,
          }}
        />
      ) : (
        <TouchableOpacity onPress={handlePlay} activeOpacity={0.9}>
          <Image
            source={{uri: item.thumbnailUrl}}
            style={styles.thumbnail}
            resizeMode="cover"
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
          Published on: {item.publishedAt.substring(0, 10)}
        </Text>
      </View>
    </View>
  );
};

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
});
