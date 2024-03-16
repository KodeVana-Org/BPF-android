/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import BottomTabIcon from './BottomTabIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomBottomTab = ({state, navigation}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  // Calculate the bottomPadding and height based on whether the system navigation bar is present
  const bottomPadding = Platform.OS === 'android' ? insets.bottom - 7 : 0;
  const tabBarHeight = Platform.OS === 'android' ? 65 + insets.bottom - 7 : 60;

  return (
    <View
      style={[
        styles.tabBarContainer,
        {paddingBottom: bottomPadding, height: tabBarHeight},
      ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View style={styles.contentContainer}>
              <BottomTabIcon route={route.name} isFocused={isFocused} />
              <Text
                style={{color: isFocused ? '#FF671F' : 'gray', fontSize: 12}}>
                {route.name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: 15,
    paddingRight: 20,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#ededed',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2.5,
  },
});
