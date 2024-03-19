import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ConferenceStreamScreen} from '../screens';

export type ModelsParamList = {
  ConferenceStream: undefined;
};

export default function ModelNavigator() {
  const Stack = createStackNavigator<ModelsParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ConferenceStream"
        component={ConferenceStreamScreen}
      />
    </Stack.Navigator>
  );
}
