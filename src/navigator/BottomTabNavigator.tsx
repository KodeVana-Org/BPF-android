import React, {useEffect, useState} from 'react';
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
  const [partyMember, setPartyMember] = useState(false);
  const userData = useFetchUserData();

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      if (
        userData.userType === 'admin' ||
        userData.userType === 'superAdmin' ||
        userData.userType === 'member'
      ) {
        setPartyMember(true);
      } else {
        setPartyMember(false);
      }
    }
  }, [userData]);

  const Tab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <Tab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostsScreen} />
      <Tab.Screen name="Video" component={VideosScreen} />
      {partyMember ? (
        <Tab.Screen name="Conference" component={ConferenceLobbyScreen} />
      ) : null}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
