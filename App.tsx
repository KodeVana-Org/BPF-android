import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContextProvider} from './src/navigator/AppContext';
import InternetConnectionAlert from './src/components/Toast/InternetConnectionAlert';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer>
          {/* <SystemBars animated={true} barStyle={'dark-content'} /> */}
          <InternetConnectionAlert />
          <RootNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
