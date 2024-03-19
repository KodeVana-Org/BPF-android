import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  EditMemberScreen,
  EditBannerScreen,
  UploadPostScreen,
  UploadGalleryScreen,
} from '../screens';

export type AdminParamList = {
  EditMember: undefined;
  EditBanner: undefined;
  UploadPost: undefined;
  UploadGallery: undefined;
};

export default function AuthNavigator() {
  const Stack = createStackNavigator<AdminParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditMember" component={EditMemberScreen} />
      <Stack.Screen name="EditBanner" component={EditBannerScreen} />
      <Stack.Screen name="UploadPost" component={UploadPostScreen} />
      <Stack.Screen name="UploadGallery" component={UploadGalleryScreen} />
    </Stack.Navigator>
  );
}
