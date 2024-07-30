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
import {RootStackParamList} from '../../navigator/RootNavigator';

const windowHeight = Dimensions.get('window').height;

function CustomDrawer(props: any) {
  const {setNavigateToHome} = useContext(AppContext);
  const [userDP, setUserDP] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const drawerNavigation =
    useNavigation<StackNavigationProp<DrawerParamList>>();
  const {userData} = useFetchUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('AccessToken');
        if (accessToken) {
          setToken(accessToken);
          if (
            userData.profileImage === null ||
            userData.profileImage === undefined
          ) {
            setUserDP(false);
          } else {
            setUserDP(true);
          }
          if (userData.name === undefined || userData.name === null) {
            if (userData.userType === 'superAdmin') {
              setUserName('Super admin');
            } else if (userData.userType === 'admin') {
              setUserName('Admin');
            } else if (userData.userType === 'post-admin') {
              setUserName('Post admin');
            } else if (userData.userType === 'member') {
              setUserName('Member');
            } else if (userData.userType === 'joined') {
              setUserName('Joined');
            } else if (userData.userType === 'user') {
              setUserName('User');
            }
          } else {
            abbreviateFullName(userData.name);
          }
        }
      } catch (error) {
        console.error('Error accessing token:', error);
      }
    };
    setTimeout(() => {
      fetchUserData();
    }, 80);
  }, [userData]);

  // Display abbreviate name
  const abbreviateFullName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length === 1) {
      setUserName(fullName);
      return;
    }
    const firstNameInitial = parts[0][0].toUpperCase() + '.';
    let abbreviatedName = firstNameInitial;
    if (parts.length > 2) {
      for (let i = 1; i < parts.length - 1; i++) {
        abbreviatedName += ' ' + parts[i][0].toUpperCase() + '.';
      }
    }
    abbreviatedName += ' ' + parts[parts.length - 1];
    setUserName(abbreviatedName);
  };

  const {navigation} = props;
  const navigationJD = useNavigation<StackNavigationProp<RootStackParamList>>();
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
            <View style={styles.userDataContainer}>
              {userDP ? (
                <Image
                  source={{uri: userData.profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/profile-user.png')}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userID}>ID: {userData.userId}</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.profileContainer}>
            <LinearGradient
              style={styles.gradient}
              colors={['#FF671F', '#fff', '#046A38']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            />
            <View style={styles.partyDataContainer}>
              <Image
                source={require('../../assets/images/PartyEmblem.png')}
                style={{height: 80, width: 120, opacity: 0.8}}
              />
              <Text style={styles.partyName}>Bodoland Peoples' Front</Text>
            </View>
          </View>
        )}
        <ScrollView style={styles.navItemListContainer}>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('History')}>
            <Text style={styles.navLinkText}>History of BTC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Committee')}>
            <Text style={styles.navLinkText}>BPF Committee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Achievement')}>
            <Text style={styles.navLinkText}>Achievements</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Constitution')}>
            <Text style={styles.navLinkText}>Constitution</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('SixthSchedule')}>
            <Text style={styles.navLinkText}>6th Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Vision')}>
            <Text style={styles.navLinkText}>Vision</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigation.navigate('Gallery')}>
            <Text style={styles.navLinkText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItemContainer}
            onPress={() => navigationJD.navigate('Donate')}>
            <Text style={styles.navLinkText}>Donate us</Text>
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
    position: 'relative',
    marginTop: -10,
  },
  partyDataContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  userDataContainer: {
    paddingTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  profileImage: {
    height: 60,
    width: 60,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 50,
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
  partyName: {
    fontSize: 22,
    paddingTop: 20,
    fontWeight: '600',
    color: '#000',
  },
  userName: {
    fontSize: 22,
    paddingTop: 10,
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
