import React from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';
import Header from '../../components/Header/Header';
import PostFlatList from '../../components/PostFlatlist/PostFlatList';
import useFetchUserData from '../../data/userData';
import FAB from '../../components/FloatingActionButton/FAB';
import FAB_Poster from '../../components/FloatingActionButton/FAB_Poster';

const PostScreen = ({navigation}: any) => {
  const {admin, postAdmin} = useFetchUserData();

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
      <Header title="Posts" drawerNavigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={styles.container}>
            <PostFlatList horizontal={false} marginType="bottom" />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      {admin ? <FAB /> : postAdmin ? <FAB_Poster /> : null}
    </SafeAreaProvider>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 50,
    paddingTop: 20,
  },
  postImage: {
    height: 200,
    width: 200,
  },
});
