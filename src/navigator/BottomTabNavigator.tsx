import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  PostsScreen,
  VideosScreen,
  ConferenceLobbyScreen,
} from '../screens';
import CustomBottomTab from '../components/BottomButton/CustomBottomTab';
import useFetchUserData from '../data/userData';

export type BottomTabParamList = {
  Home: undefined;
  Post: undefined;
  Video: undefined;
  Conference: undefined;
};

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  const {conferenceAccess} = useFetchUserData();

  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostsScreen} />
      <Tab.Screen name="Video" component={VideosScreen} />
      {conferenceAccess ? (
        <Tab.Screen name="Conference" component={ConferenceLobbyScreen} />
      ) : null}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
