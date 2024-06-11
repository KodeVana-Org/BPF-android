import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import GalleryFlatlist from '../../components/GalleryFlatlist/GalleryFlatlist';

const GalleryScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader title={'Gallery'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.imageContainer}>
          <GalleryFlatlist horizontal={false} marginType="bottom" />
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 10,
  },
});
