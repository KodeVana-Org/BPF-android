import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {get_users} from '../../api/auth_apis';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AdminParamList} from '../../navigator/AdminNavigator';
import {TextInput} from 'react-native-gesture-handler';

export default function EditUsersScreen() {
  const navigation = useNavigation<StackNavigationProp<AdminParamList>>();
  const [searchQuery, setSearchQuery] = useState();

  // Fetch user data
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

  // Set user type
  const getUserType = (text: string) => {
    switch (text) {
      case 'superAdmin':
        return 'Super admin';
      case 'admin':
        return 'Admin';
      case 'post-admin':
        return 'Post admin';
      case 'member':
        return 'Member';
      case 'joined':
        return 'Joined';
      case 'user':
        return 'User';
      default:
        return 'User';
    }
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    console.log(query); // TODO remove
  };

  // Handle user click
  const handleUserClick = (userId: string) => {
    navigation.navigate('EditUserData', {userId: userId});
  };

  const renderUserItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        handleUserClick(item._id);
      }}
      style={styles.dataContainer}>
      <View style={styles.idWrapper}>
        <Text style={styles.UserLebel}>ID: </Text>
        <Text style={styles.userId}>{item.userID}</Text>
        <Text style={styles.UserLebel}> | </Text>
        <Text style={styles.UserLebel}>{getUserType(item.userType)}</Text>
      </View>
      <Text style={styles.userName}>
        {item.name || item.email || item.phone}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'Members list'} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={'gray'}
        style={styles.searchBar}
        clearButtonMode="always"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={query => handleSearch(query)}
      />
      <FlatList
        data={allUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    borderWidth: 0.4,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    color: 'gray',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 7,
  },
  listContainer: {
    paddingTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dataContainer: {
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  idWrapper: {
    flexDirection: 'row',
  },
  UserLebel: {
    fontSize: 17,
    color: '#000',
  },
  userId: {
    fontSize: 16,
    color: 'blue',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});
