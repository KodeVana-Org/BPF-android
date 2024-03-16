import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginPassScreen,
  LoginOTPScreen,
  ForgotPassScreen,
  VerifyOTPScreen,
  RegisterScreen,
  SetPassScreen,
} from '../screens';

export type AuthParamList = {
  LoginPass: undefined;
  LoginOtp: undefined;
  ForgotPass: undefined;
  VerifyOTP: undefined;
  Register: undefined;
  SetPass: undefined;
};

export default function AuthNavigator() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginPass" component={LoginPassScreen} />
      <Stack.Screen name="LoginOtp" component={LoginOTPScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SetPass" component={SetPassScreen} />
    </Stack.Navigator>
  );
}
