import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
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

  return (
    <SafeAreaProvider>
      <Header title="Posts" drawerNavigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={styles.container}>
            <PostFlatList horizontal={false} marginType="bottom" />
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      {isAdmin ? <FAB /> : isPostAdmin ? <FAB_Poster /> : null}
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
