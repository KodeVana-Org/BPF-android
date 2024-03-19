import React, {useState} from 'react';
import {
  // ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  // View,
} from 'react-native';
// import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AgoraUIKit from 'react-native-agora';
import {PropsInterface} from 'react-native-agora';

const ConferenceStreamScreen = ({route}: any) => {
  // Agora props data
  const APP_ID = 'd6fea84d1a2644779f993113db640989';
  const STREAM_TOKEN = '007eJxTYPh6YqVT1hbTrohLW9xmBSQq3gqfknt+oUyPYdM3i6s1gkEKDClmaamJFiYpholGZiYm5uaWaZaWxoaGxilJZiYGlhaWN5t/pjYEMjI89w1iZGSAQBCflaEktbjEkIEBAKSBIF0=';
  const CHANNEL_NAME = 'test1';

  const {roomId} = route.params.data;
  const [videoCall, setVideoCall] = useState(true);
  const props: PropsInterface = {
    rtcProps: {appId: APP_ID, channel: CHANNEL_NAME},
    callBacks: {endCall: () => setVideoCall(false)},
  };

  return videoCall ? (
    <SafeAreaProvider style={styles.container}>
      <AgoraUIKit rtcProps={props.rtcProps} callBacks={props.callBacks} />
    </SafeAreaProvider>
  ) : null;
};

export default ConferenceStreamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  streamWrapper: {
    flex: 1,
  },
  videoStreams: {
    // TODO Add styles for camera views
  },
  streamControls: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  leaveButton: {
    backgroundColor: '#FF671F',
  },
  micButton: {
    backgroundColor: '#046A38',
  },
  cameraButton: {
    backgroundColor: '#046A38',
  },
  buttonText: {
    color: '#FFF',
  },
});
