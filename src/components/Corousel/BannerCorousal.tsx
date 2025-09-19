import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View, StyleSheet, ActivityIndicator} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {get_banners} from '../../api/app_data_apis';
import {useQuery, useQueryClient} from '@tanstack/react-query';

function BannerCarousal() {
  const width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ React Query for fetching banners
  const {
    data: bannerData,
    isLoading: isBannerLoading,
    isError,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: get_banners,
  });

  // ✅ Extract and reverse banners
  const bannerImages = bannerData?.data?.image
    ? [...bannerData.data.image].reverse().slice(0, 6)
    : [];

  if (isBannerLoading) {
    return (
      <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (isError || bannerImages.length === 0) {
    return (
      <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>Failed to load banners</Text>
      </View>
    );
  }
  const handleSnapToItem = index => {
    setActiveIndex(index);
  };


  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={bannerImages}
        scrollAnimationDuration={1000}
        onSnapToItem={handleSnapToItem}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <Image
              source={{uri: item.ImageUrl}}
              style={{width: width, height: width, resizeMode: 'contain'}}
            />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {bannerImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    width: 14,
    height: 12,
    borderRadius: 7,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF671F',
  },
});

export default BannerCarousal;
