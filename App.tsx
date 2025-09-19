import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContextProvider} from './src/navigator/AppContext';
import InternetConnectionAlert from './src/components/Toast/InternetConnectionAlert';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer>
          {/* <SystemBars animated={true} barStyle={'dark-content'} /> */}
          <InternetConnectionAlert />
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </AppContextProvider>
    </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
