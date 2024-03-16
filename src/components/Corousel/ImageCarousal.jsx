import {
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import React from 'react';
import CustomImageCarousal from './CustomImageCarousal';

const ImageCarousal = () => {
  const data = [
    {
      image: require('../../assets/images/BannerImages/CorouselImage1.jpg'),
    },
    {
      image: require('../../assets/images/BannerImages/CorouselImage2.jpg'),
    },
    {
      image: require('../../assets/images/BannerImages/CorouselImage3.jpg'),
    },
    {
      image: require('../../assets/images/BannerImages/CorouselImage4.jpg'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <CustomImageCarousal data={data} autoPlay={true} pagination={true} />
      </View>
    </SafeAreaView>
  );
};

export default ImageCarousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 16,
  },
});
