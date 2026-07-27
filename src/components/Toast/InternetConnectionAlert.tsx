// InternetConnectionAlert.tsx
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetConnectionAlert: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert(
        'Oops! no Internet Connection.',
        'Please check your internet connection and try again.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }, [isConnected]);

  // Render null if isConnected is null
  if (isConnected === null) {
    return null;
  }

  // Render a View if isConnected is false (for testing purposes)
  if (isConnected === false) {
    return <View />;
  }

  return null;
};

export default InternetConnectionAlert;
