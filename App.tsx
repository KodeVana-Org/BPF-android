import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigator/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContextProvider} from './src/navigator/AppContext';
import InternetConnectionAlert from './src/components/Toast/InternetConnectionAlert';
import Toast from 'react-native-toast-message';

import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Setup the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
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
