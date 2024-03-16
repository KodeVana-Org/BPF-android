import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import MenuIcon from '../../assets/icons/Hamburger.js';
import BellIcon from '../../assets/icons/BellIcon.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigator/RootNavigator';

type HeaderProps = {
  title: string;
  drawerNavigation: any;
};

const Header = ({drawerNavigation, title}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={[
        styles.container,
        //If you're not using react-native-bars, you can remove these edges
        {paddingTop: insets.top},
        {paddingTop: Platform.OS === 'ios' ? insets.top : 12},
      ]}>
      <View style={styles.leftHeader}>
        <TouchableOpacity
          onPress={() => drawerNavigation.openDrawer()}
          style={styles.menuIcon}>
          <MenuIcon fill="#fff" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={styles.notificationIcon}>
        <BellIcon fill="#fff" width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#046A38',
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuIcon: {
    marginRight: 20,
  },
  notificationIcon: {},
});

export default Header;
