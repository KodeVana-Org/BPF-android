import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';

const YouTubeVideoFLatlist = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        'http://13.235.94.196:6969/youtube/videos',
      );
      const videosData = response.data.map((video: any) => ({
        ...video,
        duration: Math.round(video.duration / 60),
      }));
      setVideos(videosData);
    } catch (error) {
      console.log('Error fetching videos:', error);
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.video}>
      {/* Displaying duration in minutes */}
      <WebView
        style={styles.videoPlayer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: `https://www.youtube.com/embed/${item.videoId}`}}
      />
      <Text style={styles.videoDuration}>
        Duration: {item.duration} minutes
      </Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.publishDate}>Published in: {item.publishedAt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  video: {
    marginBottom: 30,
  },
  videoDuration: {
    color: '#000',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thumbnail: {
    width: 200,
    height: 100,
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

export default YouTubeVideoFLatlist;
