import {StyleSheet, ScrollView, Text, View, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_users} from '../../api/auth_apis';

export default function EditUsersScreen() {
  // Fetch users
  const [allUsers, setAllUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await get_users();
      if (response.data) {
        setAllUsers(response.data);
      } else {
        console.error('Users data not found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'Members list'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.userContainer}>
          {allUsers.map((user, index) => (
            <View key={index} style={styles.listContainer}>
              <View style={styles.dataContainer}>
                <Text style={styles.userName}>{user.email}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  userContainer: {},
  userProfile: {
    height: 100,
    width: 100,
    borderRadius: 30,
  },
  listContainer: {
    gap: 10,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
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
