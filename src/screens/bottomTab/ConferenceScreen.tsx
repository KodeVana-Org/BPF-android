import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModelsParamList} from '../../navigator/ModelNavigator';
import {useNavigation} from '@react-navigation/native';

const ConferenceScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();

  // Handle navigate to video stream screen
  const navigateToCnference = (route: string, data: any) => {
    navigation.navigate(route, {data});
  };

  return (
    <SafeAreaProvider>
      <Header title="Bodoland Peoples' Front" drawerNavigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Create a new room</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Room</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Join a room</Text>
          <View style={styles.roomListWrapper}>
            <View style={styles.room}>
              <Text style={styles.roomListText}>1. Room Name - </Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() =>
                  navigateToCnference('ConferenceStream', {roomId: '11111'})
                }>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.room}>
              <Text style={styles.roomListText}>2. Room Name - </Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() =>
                  navigateToCnference('ConferenceStream', {roomId: '22222'})
                }>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default ConferenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    paddingVertical: 30,
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
  roomListWrapper: {
    flex: 1,
  },
  room: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomListText: {
    color: 'blue',
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
