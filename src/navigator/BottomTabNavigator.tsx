import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen, PostsScreen, VideosScreen} from '../screens';
import CustomBottomTab from '../components/BottomButton/CustomBottomTab';

export type BottomTabParamList = {
  Home: undefined;
  Post: undefined;
  Video: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostsScreen} />
      <Tab.Screen name="Video" component={VideosScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
