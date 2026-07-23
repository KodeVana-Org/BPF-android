/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import PostIcon from '../../assets/icons/Gallery';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AdminParamList} from '../../navigator/AdminNavigator';

const FAB_Poster = () => {
  const width = useSharedValue(60);
  const height = useSharedValue(60);
  const borderRadius = useSharedValue(50);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );
  const handleOpen = () => {
    if (!isOpen.value) {
      width.value = withSpring(200);
      height.value = withSpring(250);
      borderRadius.value = withSpring(10);
      isOpen.value = true;
    }
  };

  const handleClose = () => {
    if (isOpen.value) {
      width.value = withTiming(60);
      height.value = withTiming(60);
      borderRadius.value = withTiming(50);
      isOpen.value = false;
    }
  };

  const navigation = useNavigation<StackNavigationProp<AdminParamList>>();

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${progress.value * 45}deg`}],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    };
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            handleOpen();
            handleClose();
          }}>
          <Animated.View style={[styles.iconContainer, plusIcon]}>
            <Image
              source={require('../../assets/icons/PlusIcon.png')}
              style={styles.icon}
            />
          </Animated.View>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('EditBanner')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/icons/FileIcon.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.text}>Edit Banner</Text>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('UploadPost')}>
          <View style={styles.iconContainer}>
            <PostIcon height={25} width={25} fill="white" />
          </View>
          <Text style={styles.text}>Upload Post</Text>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('UploadGallery')}>
          <View style={styles.iconContainer}>
            <PostIcon height={25} width={25} fill="white" />
          </View>
          <Text style={styles.text}>Upload Gallery</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default FAB_Poster;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#046A38',
    position: 'absolute',
    bottom: 90,
    right: 30,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
