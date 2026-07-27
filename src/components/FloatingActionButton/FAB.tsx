/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import GalleryIcon from '../../assets/icons/Gallery';
import PostIcon from '../../assets/icons/Post';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminParamList } from '../../navigator/AdminNavigator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FAB = () => {
  const [isOpenState, setIsOpenState] = useState(false); // Used to mount/unmount the backdrop

  const width = useSharedValue(60);
  const height = useSharedValue(60);
  const borderRadius = useSharedValue(50);
  const isOpen = useSharedValue(false);

  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );

  const handleOpen = () => {
    width.value = withSpring(200);
    height.value = withSpring(310);
    borderRadius.value = withSpring(10);
    isOpen.value = true;
    setIsOpenState(true);
  };

  const handleClose = () => {
    width.value = withTiming(60);
    height.value = withTiming(60);
    borderRadius.value = withTiming(50);
    isOpen.value = false;
    setIsOpenState(false);
  };

  const toggleFAB = () => {
    if (isOpen.value) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const navigation = useNavigation<StackNavigationProp<AdminParamList>>();

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
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
    <>
      {/* Backdrop covers the screen and closes FAB when pressed */}
      {isOpenState && (
        <Pressable style={styles.backdrop} onPress={handleClose} />
      )}

      <View style={styles.wrapper}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Pressable style={styles.iconContainer} onPress={toggleFAB}>
            <Animated.View style={[styles.iconContainer, plusIcon]}>
              <Image
                source={require('../../assets/icons/PlusIcon.png')}
                style={styles.icon}
              />
            </Animated.View>
          </Pressable>

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              handleClose();
              navigation.navigate('EditUsers');
            }}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/icons/PenIcon.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.text}>Edit Users</Text>
          </Pressable>

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              handleClose();
              navigation.navigate('EditBanner');
            }}>
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
            onPress={() => {
              handleClose();
              navigation.navigate('UploadPost');
            }}>
            <View style={styles.iconContainer}>
              <PostIcon height={25} width={25} fill="white" />
            </View>
            <Text style={styles.text}>Upload Post</Text>
          </Pressable>

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              handleClose();
              navigation.navigate('UploadGallery');
            }}>
            <View style={styles.iconContainer}>
              <GalleryIcon height={25} width={25} fill="white" />
            </View>
            <Text style={styles.text}>Upload Gallery</Text>
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
};

export default FAB;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: -SCREEN_HEIGHT * 2,
    left: -SCREEN_WIDTH * 2,
    right: -SCREEN_WIDTH * 2,
    bottom: -SCREEN_HEIGHT * 2,
    backgroundColor: 'transparent', // Change to 'rgba(0,0,0,0.2)' if you want a dim background
    zIndex: 99,
  },
  wrapper: {
    zIndex: 100,
  },
  container: {
    backgroundColor: '#046A38',
    position: 'absolute',
    bottom: 90,
    right: 30,
    overflow: 'hidden',
    zIndex: 100,
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