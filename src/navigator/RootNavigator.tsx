import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';

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
} from '../screens';
import {AppContext} from './AppContext';

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
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const {navigateToHome} = useContext(AppContext);
  const [tokenExist, setTokenExist] = useState(false);

  useEffect(() => {
    handleGetToken();
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
