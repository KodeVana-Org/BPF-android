import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AgoraUIKit from 'agora-rn-uikit';
import {useNavigation} from '@react-navigation/native';
import {leave_room} from '../../api/conference_api';
import Toast from 'react-native-toast-message';

const ConferenceStreamScreen = ({route}: any) => {
  const navigation = useNavigation();
  // Agora props data
  const APP_ID = 'afa63cc771b247ee92f5d493c231362f';
  const CHANNEL_NAME = route.params.roomName;
  const USER_ID = route.params.userID;

  const connectionData = {
    appId: APP_ID,
    channel: CHANNEL_NAME,
  };

  const callbacks = {
    ActiveSpeaker: () => {},
    EndCall: async () => {
      try {
        const result = await leave_room({
          roomName: CHANNEL_NAME,
          userId: USER_ID,
        });
        navigation.goBack();
        if (result.data) {
          showToast();
          console.log('Left room successfully!');
        } else if (result.status !== 200) {
          console.log('Error leaving room');
        }
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    },
  };

  // Toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Left room successfully',
    });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
    </SafeAreaProvider>
  );
};

export default ConferenceStreamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});
