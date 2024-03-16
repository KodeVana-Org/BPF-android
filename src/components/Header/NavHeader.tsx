import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIconLight from '../../assets/icons/ChevronLeftLight.js';
import {useNavigation} from '@react-navigation/native';
type HeaderProps = {
  title: string;
};
const NavHeader = ({title}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        //If you're not using react-native-bars, you can remove these edges
        {paddingTop: insets.top},
        {paddingTop: Platform.OS === 'ios' ? insets.top : 12},
      ]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}>
        <BackIconLight width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#046A38',
  },
  backIcon: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
