import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useFetchUserData from '../../data/userData';
import {AppContext} from '../../navigator/AppContext';

const JoinDonate = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {userData, member} = useFetchUserData();
  const {setNavigateToHome} = useContext(AppContext);

  const handleJoinPress = () => {
    if (userData.id === undefined) {
      setNavigateToHome(false);
    } else if (member || userData.userType === 'joined') {
      // TODO Only non joined && non members can join
    } else {
      navigation.navigate('Join');
    }
  };

  const handleDonatePress = () => {
    if (userData.id === undefined) {
      setNavigateToHome(false);
    } else {
      navigation.navigate('Donate');
    }
  };

  return (
    <View style={styles.container}>
        {userData.userType === 'member' ? (
          <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]}>
            <Text style={styles.buttonText}>Member</Text>
          </TouchableOpacity>
        ) : userData.userType === 'superAdmin' ? (
          <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]}>
          </TouchableOpacity>
        ) : userData.userType === 'joined' ? (
          <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]}>
            <Text style={styles.buttonText}>Joined</Text>
          </TouchableOpacity>
        ) : userData.userType==="admin" ? (
          <TouchableOpacity onPress={handleJoinPress} style={[styles.button, styles.JoinButton]}>
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        ): (
          <TouchableOpacity onPress={handleJoinPress} style={[styles.button, styles.JoinButton]}>
            <Text style={styles.buttonText}>Join BPF</Text>
          </TouchableOpacity>)
        }

        {
            userData.userType !=="superAdmin" ? (
                <TouchableOpacity
                    onPress={handleDonatePress}
                    style={[styles.button, styles.DonateButton]}>
                    <Text style={styles.buttonText}>Donate us</Text>
                </TouchableOpacity>
            ): null
        }

    </View>
  );
};

export default JoinDonate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
  gradient: {
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
  },
  JoinButton: {
    backgroundColor: '#046A38',
  },
  DonateButton: {
    backgroundColor: '#FF671F',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
  },
});
