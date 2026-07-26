import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { get_banners, get_posts } from '../api/app_data_apis';

import DrawerNavigator from './DrawerNavigator';
import {
  SplashScreen,
  NotificationScreen,
  EditBannerScreen,
  EditUsersScreen,
  EditUserDataScreen,
  UploadPostScreen,
  UploadGalleryScreen,
  ConferenceStreamScreen,
  ViewPostScreen,
  JoinScreen,
  DonateScreen,
  EditPostScreen,
} from '../screens';
import { AppContext } from './AppContext';
import { check_join_status } from '../api/join-donate_apis';

export type RootStackParamList = {
  AuthNavigator: undefined;
  DrawerNavigator: undefined;
  Splash: undefined;
  Join: undefined;
  Donate: undefined;
  Notification: undefined;
  EditUsers: undefined;
  EditUserData: undefined;
  EditBanner: undefined;
  UploadPost: undefined;
  UploadGallery: undefined;
  ConferenceStream: undefined;
  ViewPost: undefined;
  EditPost: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { navigateToHome } = useContext(AppContext);
  const [tokenExist, setTokenExist] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    handleGetToken();

    // ✅ Prefetch Join Status in advance
    queryClient.prefetchQuery({
      queryKey: ['joinStatus'],
      queryFn: check_join_status,
    });

    // ✅ Prefetch Banners
    queryClient.prefetchQuery({
      queryKey: ['banner'],
      queryFn: get_banners
    });
    // ✅ Prefetch Posts
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => get_posts({ cursor: pageParam }),
      initialPageParam: null,
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Give it 1.5s minimum

    return () => clearTimeout(timer);
  }, []);

  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    if (token) {
      setTokenExist(true);
    } else {
      setTokenExist(false);
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showSplash ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : navigateToHome || tokenExist ? (
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="EditBanner" component={EditBannerScreen} />
      <Stack.Screen name="EditUsers" component={EditUsersScreen} />
      <Stack.Screen name="EditUserData" component={EditUserDataScreen} />
      <Stack.Screen name="UploadPost" component={UploadPostScreen} />
      <Stack.Screen name="UploadGallery" component={UploadGalleryScreen} />
      <Stack.Screen name="EditPost" component={EditPostScreen} />

      <Stack.Screen
        name="ConferenceStream"
        component={ConferenceStreamScreen}
      />
      <Stack.Screen name="ViewPost" component={ViewPostScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="Donate" component={DonateScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
