import React from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';

import Header from '../../components/Header/Header';
import EventFlatList from '../../components/Event/EventList';
import useFetchUserData from '../../data/userData';
import FAB from '../../components/FloatingActionButton/FAB';
import FAB_Poster from '../../components/FloatingActionButton/FAB_Poster';
import {useQuery} from '@tanstack/react-query';
import {useEvents} from '../../components/Event/useEvents';

const EventScreen = ({navigation}: any) => {
  const {admin, eventAdmin} = useFetchUserData();
  const [refreshing, setRefreshing] = React.useState(false);
  const {refetch, isFetching} = useEvents(); //

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return (
    <SafeAreaProvider>
      <Header title="Events" drawerNavigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={styles.container}>
            <EventFlatList />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      {admin ? <FAB /> : eventAdmin ? <FAB_Poster /> : null}
    </SafeAreaProvider>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
    paddingTop: 20,
  },
});
