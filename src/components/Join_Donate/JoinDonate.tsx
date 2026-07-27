import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useFetchUserData from '../../data/userData';
import { AppContext } from '../../navigator/AppContext';
import { check_join_status } from '../../api/join-donate_apis';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const JoinDonate = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userData, member } = useFetchUserData();
  const { setNavigateToHome } = useContext(AppContext);

  const { data: joinStatus, isLoading } = useQuery({
    queryKey: ['joinStatus'],
    queryFn: check_join_status,
  });

  const handleJoinPress = () => {
    // 1. Backend Feature Toggle Check
    if (!joinStatus?.join) {
      Toast.show({
        type: 'info',
        text1: 'Notice',
        text2: joinStatus?.message || 'Join action is currently disabled.',
      });
      return;
    }

    // 2. Unauthenticated User Check
    if (!userData?.id) {
      setNavigateToHome(false);
      Toast.show({
        type: 'info',
        text1: 'Authentication Required',
        text2: 'Please log in to join BPF.',
      });
      return;
    }

    // 3. Already Joined / Member Check
    if (member || userData.userType === 'joined') {
      Toast.show({
        type: 'info',
        text1: 'Already a Member',
        text2: 'You have already joined BPF!',
      });
      return;
    }

    // 4. Eligible to Join -> Navigate
    navigation.navigate('Join');
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
        <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Member</Text>
        </TouchableOpacity>
      ) : userData.userType === 'superAdmin' ? (
        <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Super Admin</Text>
        </TouchableOpacity>
      ) : userData.userType === 'joined' ? (
        <TouchableOpacity style={[styles.button, styles.JoinButton, { opacity: 0.6 }]} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Joined</Text>
        </TouchableOpacity>
      ) : userData.userType === 'admin' ? (
        <TouchableOpacity onPress={handleJoinPress} style={[styles.button, styles.JoinButton]}>
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleJoinPress}
          disabled={isLoading}
          activeOpacity={!joinStatus?.join || isLoading ? 0.8 : 0.6}
          style={[
            styles.button,
            styles.JoinButton,
            (isLoading || !joinStatus?.join) && styles.disabledJoinButton,
          ]}>
          <Text
            style={[
              styles.buttonText,
              (isLoading || !joinStatus?.join) && styles.disabledButtonText,
            ]}>
            {isLoading ? 'Checking...' : 'Join BPF'}
          </Text>
        </TouchableOpacity>
      )}

      {userData.userType !== 'superAdmin' ? (
        <TouchableOpacity
          onPress={handleDonatePress}
          style={[styles.button, styles.DonateButton]}>
          <Text style={styles.buttonText}>Donate us</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default JoinDonate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    textAlign: 'center',
  },
  disabledJoinButton: {
    backgroundColor: '#81A391',
    opacity: 0.6,
  },
  disabledButtonText: {
    color: '#E0E0E0',
  },
});
