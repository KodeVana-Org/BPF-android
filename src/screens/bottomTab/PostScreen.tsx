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
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <Header title="Posts" drawerNavigation={navigation} />
      <GestureHandlerRootView style={{flex: 1}}>
        <SystemBars animated={true} barStyle={'light-content'} />
        <PostFlatList
          horizontal={false}
          marginType="bottom"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </GestureHandlerRootView>
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
