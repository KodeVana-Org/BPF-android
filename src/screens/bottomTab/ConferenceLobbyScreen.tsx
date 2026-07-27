import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModelsParamList} from '../../navigator/ModelNavigator';
import {useNavigation} from '@react-navigation/native';
import {create_room, join_room} from '../../api/conference_api';
import useFetchUserData from '../../data/userData';
import FAB from '../../components/FloatingActionButton/FAB';
import FAB_Poster from '../../components/FloatingActionButton/FAB_Poster';
import Toast from 'react-native-toast-message';

const ConferenceLobbyScreen = () => {
  const {userData, admin, postAdmin} = useFetchUserData();
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  const [newRoomName, setNewRoomName] = useState('');
  const [userId, setUserId] = useState('');
  const [joinRoomName, setJoinRoomName] = useState('');
  const [placeholderCreate, setPlaceholderCreate] = useState(
    'Enter new room name',
  );
  const [placeholderJoin, setPlaceholderJoin] = useState('');
  const [createInputFieldColor, setCreateInputFieldColor] = useState('gray');
  const [joinInputFieldColor, setJoinInputFieldColor] = useState('gray');
  // Set user data
  useEffect(() => {
    setUserId(userData.id);
  }, [userData]);

  // Handle new room name input field
  const handleNewRoomNameInputChange = (text: string) => {
    setNewRoomName(text.trim().toLowerCase());
    setCreateInputFieldColor('gray');
  };

  // Handle join room name input field
  const handleJoinRoomNameInputChange = (text: string) => {
    setJoinRoomName(text.trim().toLowerCase());
    setJoinInputFieldColor('gray');
  };

  // Handle create room
  const createRoom = async () => {
    if (newRoomName === '') {
      setPlaceholderCreate('Room name is required!');
      setCreateInputFieldColor('red');
    } else {
      navigateToConference(newRoomName, userId);
      showToast('Room created successfully');
      try {
        const result = await create_room({
          roomName: newRoomName,
          userId: userId,
        });
        if (result.data) {
          console.log('Room created successfully');
        } else if (result.status !== 200) {
          setPlaceholderCreate('Please try again!');
          setCreateInputFieldColor('red');
          console.log('Error creating room');
        }
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  };

  // Handle join room
  const joinRoom = async () => {
    if (joinRoomName === '') {
      setPlaceholderJoin('Required!');
      setJoinInputFieldColor('red');
    } else {
      try {
        const result = await join_room({
          roomName: joinRoomName,
          userId: userId,
        });
        if (result.data) {
          navigateToConference(joinRoomName, userId);
          showToast('Room joined successfully');
          console.log('Joined room successfully');
        } else if (result.status === 404) {
          setPlaceholderJoin('Invalid room name!');
          setJoinInputFieldColor('red');
        } else if (result.status !== 200) {
          setPlaceholderJoin('Please try again!');
          setJoinInputFieldColor('red');
          console.log('Error joining room');
        }
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  };

  // Handle navigate to video stream screen
  const navigateToConference = (roomName: string, userID: string) => {
    navigation.navigate('ConferenceStream', {roomName, userID});
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Toast
  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  };

  return (
    <SafeAreaProvider>
      <Header title="Bodoland Peoples' Front" drawerNavigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.header}>Create a new room</Text>
            <TextInput
              inputMode="text"
              onChangeText={handleNewRoomNameInputChange}
              value={newRoomName}
              style={styles.inputFieldCreate}
              placeholder={placeholderCreate}
              placeholderTextColor={createInputFieldColor}
            />
            <TouchableOpacity style={styles.createButton} onPress={createRoom}>
              <Text style={styles.createButtonText}>Create Room</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.header}>Join a room</Text>
            <View style={styles.room}>
              <Text style={styles.roomListText}>Room name - </Text>
              <TextInput
                inputMode="text"
                onChangeText={handleJoinRoomNameInputChange}
                value={joinRoomName}
                style={styles.inputFieldJoin}
                placeholder={placeholderJoin}
                placeholderTextColor={joinInputFieldColor}
              />
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => joinRoom()}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {admin ? <FAB /> : postAdmin ? <FAB_Poster /> : null}
    </SafeAreaProvider>
  );
};

export default ConferenceLobbyScreen;

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
  },
  header: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputFieldCreate: {
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    borderColor: 'gray',
    width: '100%',
    marginBottom: 20,
  },
  inputFieldJoin: {
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    borderColor: 'gray',
    width: '40%',
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    margin: 16,
    marginBottom: 0,
    borderRadius: 10,
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 10,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  room: {
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomListText: {
    color: 'gray',
    fontSize: 16,
  },
  joinButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  joinButtonText: {
    color: 'green',
    fontSize: 18,
    fontWeight: '500',
  },
});
