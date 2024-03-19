import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import useFetchUserData from '../../data/userData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const userData = useFetchUserData();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (accessToken) {
        if (userData.name === null) {
          setUserName('Name not updated!');
        } else {
          setUserName(userData.name);
        }
      }
    };
    setTimeout(() => {
      fetchUserData();
    }, 200);
  }, [userData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NavHeader title={'My Profile'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>My Details</Text>
          <View style={styles.profileContainer}>
            {/* <View style={styles.profileImage}>
              <Image source={re} />
            </View> */}
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Email : </Text>
              <Text style={styles.userName}>{userData.email}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Name : </Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID : </Text>
              <Text style={styles.userName}>{userData.userId}</Text>
            </View>
            {/* <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Position : </Text>
              <Text style={styles.userName}>{userData.position}</Text>
            </View> */}
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>User : </Text>
              <Text style={styles.userName}>{userData.userType}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
  },
  profileContainer: {
    gap: 16,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingHorizontal: 40,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dataLabel: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
  },
  userName: {
    fontSize: 18,
    color: '#000',
  },
});
