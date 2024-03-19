import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_users} from '../../api/auth_apis';

export default function EditMemberScreen() {
  // Fetch users
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
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
    fetchUsers();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <NavHeader title={'Members list'} />
        <View style={styles.container}>
          {allUsers.map((user, index) => (
            <View key={index} style={styles.listContainer}>
              <View style={styles.dataContainer}>
                <Text style={styles.userName}>{user.email}</Text>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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
