import React, {useEffect, useState} from 'react';
import {Dimensions, Image, View, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {get_banners} from '../../api/app_data_apis';

function BannerCarousal() {
  const width = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await get_banners();
        if (response.data) {
          const reversedImages = response.data.image.reverse();
          setBannerImages(reversedImages.slice(0, 6));
        } else {
          console.error('Banners data not found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const handleSnapToItem = index => {
    setActiveIndex(index);
  };

  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width + 20}
        autoPlay={true}
        data={bannerImages} // Use bannerImages directly
        scrollAnimationDuration={1000}
        onSnapToItem={handleSnapToItem}
        renderItem={(
          {item}, // Use item directly
        ) => (
          <View style={{flex: 1}}>
            <Image
              source={{uri: item.ImageUrl}} // Use item.ImageUrl
              style={{width: width, height: width + 20, resizeMode: 'contain'}}
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
