/* eslint-disable react/react-in-jsx-scope */
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../navigator/AppContext';
import {useContext, useEffect, useState} from 'react';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerParamList} from '../../navigator/DrawerNavigator';
import useFetchUserData from '../../data/userData';

const windowHeight = Dimensions.get('window').height;

function CustomDrawer(props: any) {
  const {setNavigateToHome} = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const drawerNavigation =
    useNavigation<StackNavigationProp<DrawerParamList>>();
  const userData = useFetchUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('AccessToken');
        if (accessToken) {
          setToken(accessToken);
          if (userData.name === null) {
            if (userData.userType === 'superAdmin') {
              setUserName('Super Admin');
            } else if (userData.userType === 'admin') {
              setUserName('Admin');
            } else if (userData.userType === 'post-admin') {
              setUserName('Post Admin');
            } else if (userData.userType === 'member') {
              setUserName('Party member');
            } else {
              setUserName('User');
            }
          } else {
            setUserName(userData.name);
          }
        } else {
          console.log('Access token is null');
        }
      } catch (error) {
        console.error('Error accessing token:', error);
      }
    };
    setTimeout(() => {
      fetchUserData();
    }, 200);
  }, [userData]);

  const {navigation} = props;
  return (
    <DrawerContentScrollView
      {...props}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.topContainer}>
        {token ? (
          <Pressable
            style={styles.profileContainer}
            onPress={() => drawerNavigation.navigate('Profile')}>
            <LinearGradient
              style={styles.gradient}
              colors={['#FF671F', '#fff', '#046A38']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
            <Image
              source={require('../../assets/images/PartyEmblem.png')}
              style={{height: 80, width: 120, opacity: 50}}
            />
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userID}>ID: {userData.userId}</Text>
          </Pressable>
        ) : (
          <View style={styles.profileContainer}>
            <LinearGradient
              style={styles.gradient}
              colors={['#FF671F', '#fff', '#046A38']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
            <Image
              source={require('../../assets/images/PartyEmblem.png')}
              style={{height: 80, width: 120, opacity: 50}}
            />
            <Text style={styles.userName}>Bodoland Peoples' Front</Text>
          </View>
        )}
        <ScrollView style={styles.navItemListContainer}>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('History')}>
            <Text style={styles.navLinkText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Committee')}>
            <Text style={styles.navLinkText}>BPF Committee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Achievement')}>
            <Text style={styles.navLinkText}>Achievement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Constitution')}>
            <Text style={styles.navLinkText}>Constitution</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('SixthShedule')}>
            <Text style={styles.navLinkText}>6th Shedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Vission')}>
            <Text style={styles.navLinkText}>Vission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Gallery')}>
            <Text style={styles.navLinkText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('About')}>
            <Text style={styles.navLinkText}>About</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {token ? (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => {
              AsyncStorage.removeItem('AccessToken');
              setNavigateToHome(false);
            }}>
            <Text style={styles.logoutText}>Logout</Text>
            <LogoutIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => {
              setNavigateToHome(false);
            }}>
            <Text style={styles.logoutText}>Login</Text>
            {/* <LogoutIcon /> */}
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
}
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: windowHeight,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    backgroundColor: '#046A38',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: -10,
  },
  gradient: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  userAvatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 30,
  },
  userName: {
    fontSize: 22,
    paddingTop: 20,
    fontWeight: '600',
    color: '#000',
  },
  userID: {
    fontSize: 16,
    paddingBottom: 20,
    color: '#000',
  },
  navItemListContainer: {},
  navItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  navLinkText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    marginRight: 7,
  },
});
