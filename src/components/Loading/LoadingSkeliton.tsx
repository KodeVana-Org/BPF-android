
import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoadingSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Image placeholder */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.imagePlaceholder}
      />

      {/* Title placeholder */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.textPlaceholder}
      />

      {/* Subtitle placeholder */}
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={[styles.textPlaceholder, { width: '60%' }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  textPlaceholder: {
    height: 20,
    borderRadius: 4,
    width: '80%',
  },
});

export default LoadingSkeleton;
