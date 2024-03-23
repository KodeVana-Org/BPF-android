import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';
import Header from '../../components/Header/Header';
import YouTubeVideoFLatlist from '../../components/YouTube/VideoGalleryFlatlist';
import FAB from '../../components/FloatingActionButton/FAB';
import useFetchUserData from '../../data/userData';
import FAB_Poster from '../../components/FloatingActionButton/FAB_Poster';

const Videocreen = ({navigation}: any) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPostAdmin, setIsPostAdmin] = useState(false);
  const userData = useFetchUserData();
  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      if (userData.userType === 'admin' || userData.userType === 'superAdmin') {
        setIsAdmin(true);
      } else if (userData.userType === 'post-admin') {
        setIsPostAdmin(true);
      } else {
        setIsPostAdmin(false);
        setIsAdmin(false);
      }
    }
  }, [userData]);

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <Header title="Video Gallery" drawerNavigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={[styles.container]}>
            <YouTubeVideoFLatlist />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      {isAdmin ? <FAB /> : isPostAdmin ? <FAB_Poster /> : null}
    </SafeAreaProvider>
  );
};

export default Videocreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 750,
  },
});
