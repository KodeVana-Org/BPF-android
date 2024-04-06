import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SystemBars} from 'react-native-bars';

import Header from '../../components/Header/Header';
import BannerCarousal from '../../components/Corousel/BannerCorousal';
import PostFlatList from '../../components/PostFlatlist/PostFlatList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList} from '../../navigator/BottomTabNavigator';
import {DrawerParamList} from '../../navigator/DrawerNavigator';
import GalleryFlatlist from '../../components/GalleryFlatlist/GalleryFlatlist';
import useFetchUserData from '../../data/userData';
import FAB from '../../components/FloatingActionButton/FAB';
import FAB_Poster from '../../components/FloatingActionButton/FAB_Poster';
import LinearGradient from 'react-native-linear-gradient';
import JoinDonate from '../../components/Join_Donate/JoinDonate';

const HomeScreen = ({navigation}: any) => {
  const bottomNavigation =
    useNavigation<StackNavigationProp<BottomTabParamList>>();
  const drawerNavigation =
    useNavigation<StackNavigationProp<DrawerParamList>>();
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
      <Header title="Bodoland Peoples' Front" drawerNavigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <GestureHandlerRootView style={{flex: 1}}>
          {/* If you're not using react-native-bars, you can remove SystemBars */}
          <SystemBars animated={true} barStyle={'light-content'} />
          <Animated.View style={[styles.container]}>
            {/* Banner carousal */}
            <BannerCarousal />
            {/* Join Donate */}
            <JoinDonate />
            {/* PostList */}
            <View style={styles.postListContainer}>
              <View style={styles.headerNav}>
                <View>
                  <Text style={styles.sectionheader}>Recent Posts</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      bottomNavigation.navigate('Post');
                    }}
                    style={styles.viewAllBtn}>
                    <Text style={styles.viewAllBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal style={styles.image}>
                <PostFlatList horizontal={true} marginType="right" />
              </ScrollView>
            </View>
            {/* Gallery */}
            <View style={styles.galleryListContainer}>
              <View style={styles.headerNav}>
                <View>
                  <Text style={styles.sectionheader}>Gallery</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      drawerNavigation.navigate('Gallery');
                    }}
                    style={styles.viewAllBtn}>
                    <Text style={styles.viewAllBtnText}>View All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView horizontal style={styles.image}>
                <GalleryFlatlist horizontal={true} marginType="right" />
              </ScrollView>
            </View>
            {/* Temporery filer section */}
            <View style={styles.tempSection}>
              <LinearGradient
                style={styles.gradient}
                colors={['#FF671F', '#fff', '#046A38']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              />
              <View style={styles.tempTextContainer}>
                <Text style={styles.tempText}>Peace</Text>
                <Text style={styles.tempText}>Unity</Text>
                <Text style={styles.tempText}>Prosperity</Text>
              </View>
            </View>
          </Animated.View>
        </GestureHandlerRootView>
      </ScrollView>
      {admin ? <FAB /> : postAdmin ? <FAB_Poster /> : null}
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 80,
  },
  postListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  galleryListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionheader: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  image: {
    marginTop: 10,
  },
  viewAllBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 7,
    marginTop: 7,
    padding: 0,
    width: 80,
    backgroundColor: '#046A38',
  },
  viewAllBtnText: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 0,
  },
  tempSection: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 0.2,
    // backgroundColor: '#046A38',
    width: Dimensions.get('window').width - 40,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 16,
  },
  tempTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  tempText: {
    color: '#000',
    fontSize: 24,
    fontWeight: '800',
  },
});
