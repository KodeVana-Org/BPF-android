import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {ModelsParamList} from '../../navigator/ModelNavigator';
import {useNavigation} from '@react-navigation/native';

const ConferenceLobbyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  const [newRoomName, setNewRoomName] = useState('test');
  const [joinRoomName, setJoinRoomName] = useState('test');
  const [placeholderCreate, setPlaceholderCreate] = useState(
    'Enter new room name',
  );
  const [placeholderJoin, setPlaceholderJoin] = useState('Room name');
  const [inputFieldColor, setInputFieldColor] = useState('gray');

  // Handle new room name input field
  const handleNewRoomNameInputChange = (text: string) => {
    setNewRoomName(text.trim().toLowerCase());
    setInputFieldColor('gray');
  };

  // Handle join room name input field
  const handleJoinRoomNameInputChange = (text: string) => {
    setJoinRoomName(text.trim().toLowerCase());
    setInputFieldColor('gray');
  };

  // Handle create room
  const createRoom = () => {
    if (newRoomName === '') {
      setPlaceholderCreate('Room name is required!');
      setInputFieldColor('red');
    } else {
      navigateToConference(newRoomName);
    }
  };

  // Handle join room
  const joinRoom = () => {
    if (joinRoomName === '') {
      setPlaceholderJoin('Required!');
      setInputFieldColor('red');
    } else {
      navigateToConference(joinRoomName);
    }
  };

  // Handle navigate to video stream screen
  const navigateToConference = roomName => {
    navigation.navigate('ConferenceStream', {roomName});
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // fetchRooms();  //TODO create function to fetch room list
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <Header title="Bodoland Peoples' Front" drawerNavigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Create a new room</Text>
          <TextInput
            inputMode="text"
            onChangeText={handleNewRoomNameInputChange}
            value={newRoomName}
            style={styles.inputFieldCreate}
            placeholder={placeholderCreate}
            placeholderTextColor={inputFieldColor}
          />
          <TouchableOpacity style={styles.createButton} onPress={createRoom}>
            <Text style={styles.createButtonText}>Create Room</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Join a room</Text>
          <View style={styles.roomListWrapper}>
            <View style={styles.room}>
              <Text style={styles.roomListText}>Test room - </Text>
              <TextInput
                inputMode="text"
                onChangeText={handleJoinRoomNameInputChange}
                value={joinRoomName}
                style={styles.inputFieldJoin}
                placeholder={placeholderJoin}
                placeholderTextColor={inputFieldColor}
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
    </SafeAreaProvider>
  );
};

export default ConferenceLobbyScreen;

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
  roomListWrapper: {
    flex: 1,
  },
  room: {
    paddingHorizontal: 5,
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

// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// // import RtcEngine, {
// //   RtcRemoteView,
// //   RtcLocalView,
// //   VideoRenderMode,
// // } from 'react-native-agora';
// import RtcEngine from 'react-native-agora';
// import RtcLocalView from 'react-native-agora';
// import RtcRemoteView from 'react-native-agora';
// import VideoRenderMode from 'react-native-agora';
// import RtmEngine from 'agora-react-native-rtm';

// interface Room {
//   [name: string]: number;
// }

// const App: React.FC = () => {
//   const [appId] = useState('d6fea84d1a2644779f993113db640989');
//   const [token, setToken] = useState<string | null>(null);
//   const [NewRoomName, setNewRoomName] = useState('');
//   const [inCall, setInCall] = useState(false);
//   const [input, setInput] = useState('');
//   const [inLobby, setInLobby] = useState(false);
//   const [peerIds, setPeerIds] = useState<number[]>([]);
//   const [seniors, setSeniors] = useState<string[]>([]);
//   const [myUsername] = useState('' + new Date().getTime());
//   const [rooms, setRooms] = useState<Room>({});

//   let _rtcEngine: RtcEngine | undefined;
//   let _rtmEngine: RtmEngine | undefined;

//   useEffect(() => {
//     const initRTC = async () => {
//       _rtcEngine = await RtcEngine.create(appId);
//       await _rtcEngine.enableVideo();

//       _rtcEngine.addListener('Error', (err: any) => {
//         console.log('Error', err);
//       });

//       _rtcEngine.addListener('UserJoined', (uid: number) => {
//         if (peerIds.indexOf(uid) === -1) {
//           if (inCall && seniors.length < 2) {
//             _rtmEngine?.sendMessageByRoomId(
//               'lobby',
//               `${NewRoomName}:${peerIds.length + 2}`,
//             );
//           }
//           setPeerIds([...peerIds, uid]);
//         }
//       });

//       _rtcEngine.addListener('UserOffline', (uid: number) => {
//         setPeerIds(peerIds.filter(id => id !== uid));
//       });

//       _rtcEngine.addListener(
//         'JoinRoomSuccess',
//         (room: any, uid: any, elapsed: any) => {
//           console.log('JoinRoomSuccess', room, uid, elapsed);
//           setInCall(true);
//         },
//       );
//     };

//     const initRTM = async () => {
//       _rtmEngine = new RtmEngine();

//       _rtmEngine.on('error', evt => {
//         console.log(evt);
//       });

//       _rtmEngine.on('roomMessageReceived', evt => {
//         let {text} = evt;
//         let data = text.split(':');
//         setRooms({...rooms, [data[0]]: Number(data[1])});
//       });

//       _rtmEngine.on('messageReceived', evt => {
//         let {text} = evt;
//         let data = text.split(':');
//         setRooms({...rooms, [data[0]]: Number(data[1])});
//       });

//       _rtmEngine.on('roomMemberJoined', evt => {
//         let {roomId, uid} = evt;
//         if (inCall && roomId === 'lobby' && seniors.length < 2) {
//           _rtmEngine
//             ?.sendMessageToPeer({
//               peerId: uid,
//               text: `${NewRoomName}:${peerIds.length + 1}`,
//               offline: false,
//             })
//             .catch(e => console.log(e));
//         }
//       });

//       _rtmEngine.on('roomMemberLeft', evt => {
//         let {roomId, uid} = evt;
//         if (NewRoomName === roomId) {
//           setSeniors(seniors.filter(id => id !== uid));
//           setRooms({...rooms, [NewRoomName]: peerIds.length});
//           if (inCall && seniors.length < 2) {
//             _rtmEngine
//               ?.sendMessageByRoomId(
//                 'lobby',
//                 `${NewRoomName}:${peerIds.length + 1}`,
//               )
//               .catch(e => console.log(e));
//           }
//         }
//       });

//       await _rtmEngine.createClient(appId).catch(e => console.log(e));
//       await _rtmEngine?.login({uid: myUsername}).catch(e => console.log(e));
//       await _rtmEngine?.joinRoom('lobby').catch(e => console.log(e));
//       setInLobby(true);
//     };

//     initRTC();
//     initRTM();

//     return () => {
//       _rtmEngine?.destroyClient();
//       _rtcEngine?.destroy();
//     };
//   }, []);

//   const joinCall = async (NewRoomName: string) => {
//     setNewRoomName(NewRoomName);
//     // Join RTC Room using null token and room name
//     await _rtcEngine?.joinRoom(token, NewRoomName, null, 0);
//     await _rtmEngine?.joinRoom(NewRoomName).catch(e => console.log(e));
//     let {members} = await _rtmEngine?.getRoomMembersByroomId(NewRoomName);
//     if (members.length === 1) {
//       await _rtmEngine
//         ?.sendMessageByRoomId('lobby', `${NewRoomName}:1`)
//         .catch(e => console.log(e));
//     }
//     setInLobby(false);
//     setSeniors(members.map((m: any) => m.uid));
//   };

//   const endCall = async () => {
//     if (seniors.length < 2) {
//       await _rtmEngine
//         ?.sendMessageByRoomId('lobby', `${NewRoomName}:${peerIds.length}`)
//         .catch(e => console.log(e));
//     }
//     await _rtcEngine?.leaveRoom();
//     await _rtmEngine?.logout();
//     await _rtmEngine?.login({uid: myUsername});
//     await _rtmEngine?.joinRoom('lobby');

//     setPeerIds([]);
//     setInCall(false);
//     setInLobby(true);
//     setSeniors([]);
//     setNewRoomName('');
//   };

//   const renderRooms = () => {
//     return inLobby ? (
//       <View style={styles.fullView}>
//         <Text style={styles.subHeading}>Room List</Text>
//         <ScrollView>
//           {Object.keys(rooms).map((key, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => joinCall(key)}
//               style={styles.roomsBtn}>
//               <Text>
//                 <Text style={styles.roomHead}>{key}</Text>
//                 <Text style={styles.whiteText}>
//                   {' (' + rooms[key] + ' users)'}
//                 </Text>
//               </Text>
//             </TouchableOpacity>
//           ))}
//           <Text>
//             {Object.keys(rooms).length === 0
//               ? 'No active rooms, please create new room'
//               : null}
//           </Text>
//         </ScrollView>
//         <TextInput
//           value={input}
//           onChangeText={val => setInput(val)}
//           style={styles.input}
//           placeholder="Enter Room Name"
//         />
//         <TouchableOpacity
//           onPress={async () => {
//             input ? await joinCall(input) : null;
//           }}
//           style={styles.button}>
//           <Text style={styles.buttonText}>Create Room</Text>
//         </TouchableOpacity>
//       </View>
//     ) : null;
//   };

//   const renderCall = () => {
//     return inCall ? (
//       <View style={styles.fullView}>
//         <RtcLocalView.SurfaceView
//           style={styles.video}
//           roomId={NewRoomName}
//           renderMode={VideoRenderMode.Hidden}
//         />
//         <ScrollView>
//           {peerIds.map((key, index) => (
//             <RtcRemoteView.SurfaceView
//               roomId={NewRoomName}
//               renderMode={VideoRenderMode.Hidden}
//               key={index}
//               uid={key}
//               style={styles.video}
//             />
//           ))}
//         </ScrollView>
//         <TouchableOpacity onPress={endCall} style={styles.button}>
//           <Text style={styles.buttonText}>Leave Room</Text>
//         </TouchableOpacity>
//       </View>
//     ) : null;
//   };

//   return (
//     <SafeAreaView style={styles.max}>
//       <View style={styles.spacer}>
//         <Text style={styles.roleText}>
//           {inCall ? `You're in ${NewRoomName}` : 'Lobby: Join/Create a room'}
//         </Text>
//       </View>
//       {renderRooms()}
//       {renderCall()}
//       {!inLobby && !inCall ? (
//         <Text style={styles.waitText}>Please wait, joining room...</Text>
//       ) : null}
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   max: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//   },
//   button: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#38373A',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#000',
//     textAlign: 'center',
//   },
//   fullView: {
//     flex: 5,
//     alignContent: 'center',
//     marginHorizontal: 24,
//   },
//   subHeading: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 10,
//   },
//   waitText: {
//     color: '#000',
//     marginTop: 50,
//     fontSize: 16,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   roleText: {
//     textAlign: 'center',
//     // fontWeight: '700',
//     color: '#fbfbfb',
//     fontSize: 18,
//   },
//   spacer: {
//     width: '100%',
//     padding: '2%',
//     marginBottom: 32,
//     // borderWidth: 1,
//     backgroundColor: '#38373A',
//     color: '#fbfbfb',
//     // borderColor: '#38373A',
//   },
//   input: {
//     height: 40,
//     borderColor: '#38373A',
//     borderWidth: 1.5,
//     width: '100%',
//     alignSelf: 'center',
//     padding: 10,
//     marginBottom: 10,
//   },
//   roomsBtn: {
//     padding: 8,
//     marginBottom: 4,
//     backgroundColor: '#38373A',
//     color: '#000',
//   },
//   roomHead: {fontWeight: 'bold', color: '#000', fontSize: 16},
//   whiteText: {color: '#000'},
//   video: {width: 150, height: 150},
// });
