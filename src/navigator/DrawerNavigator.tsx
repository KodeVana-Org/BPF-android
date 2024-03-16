import React from 'react';
import {
  // DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator.tsx';
import {
  ProfileScreen,
  HistoryScreen,
  CommitteeScreen,
  AchievementScreen,
  ConstitutionScreen,
  SixthSheduleScreen,
  VissionScreen,
  GalleryScreen,
  AboutScreen,
} from '../screens';
import CustomDrawer from '../components/Drawer/CustomDrawer.tsx';

export type DrawerParamList = {
  BottomTabNavigator: undefined;
  Profile: undefined;
  History: undefined;
  Committee: undefined;
  Achievement: undefined;
  Constitution: undefined;
  SixthShedule: undefined;
  Vission: undefined;
  Gallery: undefined;
  About: undefined;
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Committee" component={CommitteeScreen} />
      <Drawer.Screen name="Achievement" component={AchievementScreen} />
      <Drawer.Screen name="Constitution" component={ConstitutionScreen} />
      <Drawer.Screen name="SixthShedule" component={SixthSheduleScreen} />
      <Drawer.Screen name="Vission" component={VissionScreen} />
      <Drawer.Screen name="Gallery" component={GalleryScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
