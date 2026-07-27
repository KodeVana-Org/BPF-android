import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppContextProvider } from './src/navigator/AppContext';
import InternetConnectionAlert from './src/components/Toast/InternetConnectionAlert';
import Toast from 'react-native-toast-message';

import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wakeServer } from './src/api/join-donate_apis';

// ✅ Setup the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// ✅ Create the AsyncStorage persister
export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const App = () => {
  // for walking up the server 
  // i am using render free server 
  // so it required to wake up 
  // so this is dummy api 
  useEffect(() => {
    // console.log("WAKING UP SERVER..");
    wakeServer();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}>
      <SafeAreaProvider>
        <AppContextProvider>
          <NavigationContainer>
            <InternetConnectionAlert />
            <RootNavigator />
          </NavigationContainer>
          <Toast />
        </AppContextProvider>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
};

export default App;
