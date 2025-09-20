import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import useFetchUserData from '../../data/userData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PenIcon from '../../assets/icons/PenIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { update_user_details, update_user_profile } from '../../api/app_data_apis';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const {userData, myServerId} = useFetchUserData();
  const [editing, setEditing] = useState(false);
  const [userDP, setUserDP] = useState(false);
  const [emailExit, setEmailExit] = useState(false);
  const [nameExist, setNameExit] = useState(false);
  const [phoneExit, setPhoneExit] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const queryClient = useQueryClient();

    //for profile only
 const updateProfileImageMutation = useMutation({
    mutationFn: ({ userId, formData }) => update_user_profile(userId, formData),
    onSuccess: () => {
      Toast.show({ type: 'success', text1: 'Profile image updated!' });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('Upload failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Please try again.',
      });
    },
  });

//for details update only
const updateUserMutation = useMutation({
  mutationFn: ({ userId, data }) => update_user_details(userId, data),
  onSuccess: (response) => {
    Toast.show({
      type: 'success',
      text1: 'User updated successfully!',
    });

    // Refetch user data if needed
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });

    // Close editing if applicable
    setEditing(false);
  },
  onError: (error) => {
    console.error('Update failed:', error);
    Toast.show({
      type: 'error',
      text1: 'Update failed',
      text2: 'Something went wrong!',
    });
  },
});


  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (accessToken) {
        if (!userData?.profileImage) {
          setUserDP(false);
        } else {
          setUserDP(true);
        }

        if (userData.name === null || userData.name=== undefined) {
          setUserName('');  // <-- Set empty string, not 'Name not updated!'
          setNameExit(false);
        } else {
          setNameExit(true)
          setUserName(userData.name);
        }
        if (userData.email === null || userData.email === undefined) {
          setUserEmail(''); // <-- Empty string
          setEmailExit(false);
        } else {
          setEmailExit(true);
          setUserEmail(userData.email);
        }
        if (userData.phone === null || userData.phone === undefined) {
          setUserPhone('');  // <-- Empty string
          setPhoneExit(false);
        } else {
          setPhoneExit(true);
          setUserPhone(userData.phone);
        }

        switch (userData?.userType) {
          case 'superAdmin':
            setUserPosition('Super admin');
            break;
          case 'admin':
            setUserPosition('Admin');
            break;
          case 'post-admin':
            setUserPosition('Post admin');
            break;
          case 'member':
            setUserPosition(userData?.member ?? 'Member');
            break;
          case 'joined':
            setUserPosition('Joined');
            break;
          case 'user':
            setUserPosition('User');
            break;
          default:
            setUserPosition('Unknown');
        }
      }
    };
    setTimeout(() => {
      fetchUserData();
    }, 200);
  }, [userData]);

  // 🔧 Save handler (implement your API call here)
  const saveUserChanges = () => {

  const updatedData = {};

  if (userName && userName !== userData.name) {
    updatedData.userName = userName;
  }
  if (userEmail && userEmail !== userData.email) {
    updatedData.userEmail = userEmail;
  }
  if (userPhone && userPhone !== userData.phone) {
    updatedData.userPhone = userPhone;
  }


  updateUserMutation.mutate({ userId: myServerId, data: updatedData});
        setEditing(false);
   };
   const { isPending } = updateUserMutation;

  const handleToggleEditing = () => {
    setEditing(prev => !prev);
  };


const handleProfileImageChange = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
    });

    // ✅ Convert to FormData
    const formData = new FormData();
    formData.append('profileImage', {
      uri: image.path,
      type: image.mime,
      name: `profile_${Date.now()}.jpg`,
    });

    //using mutation here
    updateProfileImageMutation.mutate({userId: myServerId, formData})

  } catch (error) {
    if (error?.code !== 'E_PICKER_CANCELLED') {
      console.error('Image upload failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Please try again.',
      });
    }
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'My Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleToggleEditing}
              style={styles.editButton}>
              <PenIcon fill="#FF671F" width={24} height={24} />
            </TouchableOpacity>

            <Text style={styles.header}>My Details</Text>

            {/* profile image upload */}
        <TouchableOpacity onPress={handleProfileImageChange}>
          <View style={styles.profileImageWrapper}>
            {userDP ? (
              <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../../assets/icons/profile-user.png')} style={styles.profileImage} />
            )}

            {/* 🔁 Show spinner while uploading */}
            {updateProfileImageMutation.isPending && (
              <View style={styles.imageOverlay}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Name : </Text>
          {editing ? (
            <TextInput
              style={[styles.userData, styles.inputEditable]}
              value={userName === 'Name not updated!' ? '' : userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.userData}>
              {userName || 'Name not updated!'}
            </Text>
          )}
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Email : </Text>
          {editing ? (
            <TextInput
              style={[styles.userData, styles.inputEditable]}
              value={userEmail === 'Email not updated!' ? '' : userEmail}
              onChangeText={setUserEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.userData}>
              {userEmail || 'Email not updated!'}
            </Text>
          )}
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Phone : </Text>
          {editing ? (
            <TextInput
              style={[styles.userData, styles.inputEditable]}
              value={userPhone === 'Phone not updated!' ? '' : userPhone}
              onChangeText={setUserPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.userData}>
              {userPhone || 'Phone not updated!'}
            </Text>
          )}
        </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID : </Text>
              <Text style={styles.userData}>{userData.userId}</Text>
            </View>

            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Position : </Text>
              <Text style={styles.userData}>{userPosition}</Text>
            </View>

            { userData?.dist ? (
                <View style={styles.dataContainer}>
                  <Text style={styles.dataLabel}>Distic : </Text>
                  <Text style={styles.userData}>{userData?.dist}</Text>
                </View>
                 ) :null
            }

            {/* ✅ Save Button */}
        {editing && (
          <TouchableOpacity
            onPress={saveUserChanges}
            style={[
              styles.saveButton,
              isPending && { opacity: 0.6 } // Reduce opacity during loading
            ]}
            disabled={isPending} // Optional: disable button during update
          >
            {isPending ? (
              <ActivityIndicator color="#fff" /> // Show spinner
            ) : (
              <Text style={styles.saveButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

profileImageWrapper: {
  height: 80,
  width: 80,
  borderRadius: 40,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden', // Ensures the spinner doesn't spill out
},

imageOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dimming
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
},

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  profileContainer: {
    gap: 16,
    flex: 1,
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 40,
    backgroundColor: '#dfe9ed',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 16,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40,
  },
  profileImage: {
    height: 80,
    width: 80,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dataLabel: {
    fontWeight: '500',
    fontSize: 18,
    color: '#000',
  },
  userData: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 3,
    borderColor: 'gray',
    fontSize: 18,
    color: 'gray',
  },

inputEditable: {
  borderWidth: 0.5,
  borderColor: 'gray',
  backgroundColor: '#fff',
  width: '70%',
},

saveButton: {
  marginTop: 20,
  backgroundColor: '#046A38',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignSelf: 'center',
},

saveButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});
