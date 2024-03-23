import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AgoraUIKit from 'agora-rn-uikit';
import {useNavigation} from '@react-navigation/native';

const ConferenceStreamScreen = ({route}: any) => {
  const navigation = useNavigation();
  // Agora props data
  const APP_ID = 'd6fea84d1a2644779f993113db640989';
  const STREAM_TOKEN =
    '007eJxTYGjY/2te2xzjW8Wx5wXKZr/WM86cNLWg8tcqsSUXXX886WNQYEgxS0tNtDBJMUw0MjMxMTe3TLO0NDY0NE5JMjMxsLSwnLjvX6oAHwPDlCuVDIxAyALEID4TmGQGkyxQsiS1uISLwcjCwsjYxNDI3BgAYqkjAg==';
  const CHANNEL_NAME = route.params.roomName;
  console.log('Channel name', CHANNEL_NAME);
  // TODO: invalid data props
  const USERNAME = 'username';
  const UID = 123;

  const connectionData = {
    appId: APP_ID,
    channel: CHANNEL_NAME,
    token: STREAM_TOKEN,
    // username: USERNAME,
    uid: UID,
  };

  const callbacks = {
    ActiveSpeaker: () => {},
    EndCall: () => {
      navigation.goBack();
    },
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
