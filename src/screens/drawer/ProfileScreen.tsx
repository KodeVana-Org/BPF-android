import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import useFetchUserData from '../../data/userData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PenIcon from '../../assets/icons/PenIcon';

const ProfileScreen = () => {
  const {userData} = useFetchUserData();
  const [editing, setEditing] = useState(false);
  const [userDP, setUserDP] = useState(false);
  const [emailExit, setEmailExit] = useState(false);
  const [phoneExit, setPhoneExit] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPosition, setUserPosition] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (accessToken) {
        if (
          userData.profileImage === null ||
          userData.profileImage === undefined
        ) {
          setUserDP(false);
        } else {
          setUserDP(true);
        }
        if (userData.name === null || userData.name === undefined) {
          setUserName('Name not updated!');
        } else {
          setUserName(userData.name);
        }
        if (userData.email === null || userData.email === undefined) {
          setEmailExit(false);
          setUserEmail('Email not updated!');
        } else {
          setEmailExit(true);
          setUserEmail(userData.email);
        }
        if (userData.phone === null || userData.phone === undefined) {
          setPhoneExit(false);
          setUserPhone('Phone not updated!');
        } else {
          setPhoneExit(true);
          setUserPhone(userData.phone);
        }
        if (userData.userType === 'superAdmin') {
          setUserPosition('Super admin');
        } else if (userData.userType === 'admin') {
          setUserPosition('Admin');
        } else if (userData.userType === 'post-admin') {
          setUserPosition('Post admin');
        } else if (userData.userType === 'member') {
          if (userData.member === null || userData.member === undefined) {
            setUserPosition('Member');
          } else {
            setUserPosition(userData.member);
          }
        } else if (userData.userType === 'joined') {
          setUserPosition('Joined');
        } else if (userData.userType === 'user') {
          setUserPosition('User');
        }
      }
    };
    setTimeout(() => {
      fetchUserData();
    }, 200);
  }, [userData]);

  // Handle user data
  const handleEditingUserData = () => {
    setEditing(!editing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'My Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleEditingUserData}
              style={styles.editButton}>
              <PenIcon fill="#FF671F" width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.header}>My Details</Text>
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
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Name : </Text>
              {editing ? (
                <TextInput
                  style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                  value={userName}
                  onChangeText={text => setUserName(text)}
                />
              ) : (
                <Text style={styles.userData}>{userName}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Email : </Text>
              {!emailExit ? (
                editing ? (
                  <TextInput
                    style={[
                      styles.userData,
                      editing ? {borderWidth: 0.2} : null,
                    ]}
                    value={userEmail}
                    onChangeText={text => setUserEmail(text)}
                  />
                ) : (
                  <Text style={styles.userData}>{userEmail}</Text>
                )
              ) : (
                <Text style={styles.userData}>{userEmail}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Phone : </Text>
              {!phoneExit ? (
                editing ? (
                  <TextInput
                    style={[
                      styles.userData,
                      editing ? {borderWidth: 0.2} : null,
                    ]}
                    value={userPhone}
                    onChangeText={text => setUserPhone(text)}
                  />
                ) : (
                  <Text style={styles.userData}>{userPhone}</Text>
                )
              ) : (
                <Text style={styles.userData}>{userPhone}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID : </Text>
              <Text style={styles.userData}>{userData.userId}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Position : </Text>
              <Text style={styles.userData}>{userPosition}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  profileContainer: {
    gap: 16,
    flex: 1,
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 40,
    backgroundColor: '#dfe9ed',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 16,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40,
  },
  profileImage: {
    height: 80,
    width: 80,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dataLabel: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
  },
  userData: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 3,
    borderColor: 'gray',
    fontSize: 18,
    color: 'gray',
  },
});
