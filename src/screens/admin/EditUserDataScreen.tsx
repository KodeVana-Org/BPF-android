import React, {useEffect, useMemo, useState} from 'react';
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
} from 'react-native';
import publicIP from 'react-native-public-ip';
import NavHeader from '../../components/Header/NavHeader';
import PenIcon from '../../assets/icons/PenIcon';
import {get_single_user} from '../../api/auth_apis';
import useFetchUserData from '../../data/userData';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import {update_user} from '../../api/update_app_data_apis';
import {RefreshControl} from 'react-native-gesture-handler';
import {RadioGroup} from 'react-native-radio-buttons-group';
import Toast from 'react-native-toast-message';

const EditUserDataScreen = ({route}: any) => {
  const {superAdmin, admin, myId, myServerId} = useFetchUserData();
  const [itsMySelf, setItsMySelf] = useState(true);
  const [adminIpAddress, setAdminIpAddress] = useState('');
  const [userDPExist, setUserDPExist] = useState(false);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [userId, setUserId] = useState('');
  const [userServerId, setUserServerId] = useState('');
  const [userDPUrl, setUserDPUrl] = useState(null);
  const [userName, setUserName] = useState('');
  const [userFatherName, setUserFatherName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [selectedGenderId, setSelectedGenderId] = useState();
  const [userGender, setUserGender] = useState('');
  const [userPO, setUserPO] = useState('');
  const [userPS, setUserPS] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userPosition, setUserPosition] = useState<string | null>(null);
  const [userMemberType, setUserMemberType] = useState<string | null>(null);
  const [newMemberType, setNewMemberType] = useState('');

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await get_single_user({userId: route.params.userId});
      if (response.data) {
        const {
          _id,
          userID,
          profileImage,
          name,
          fatherName,
          gender,
          po,
          ps,
          status,
          email,
          phone,
          district,
          userType,
        } = response.data;
        console.log('USER DATA', response.data); // TODO remove
        if (
          userID !== null &&
          userID !== undefined &&
          myId !== null &&
          myId !== undefined
        ) {
          if (userID !== myId) {
            setItsMySelf(false);
          } else {
            setItsMySelf(true);
          }
        }
        setUserDPExist(!!profileImage);
        setUserId(userID);
        setUserServerId(_id);
        setUserDPUrl(profileImage || null);
        setUserName(name || null);
        setUserFatherName(fatherName || null);
        setUserGender(gender || null);
        setUserPO(po || null);
        setUserPS(ps || null);
        setUserStatus(status || null);
        setUserEmail(email || null);
        setUserPhone(phone || null);
        setUserDistrict(district || null);
        if (response.Member) {
          const {position, memberType} = response.Member;
          if (position) {
            if (position !== null && position !== undefined) {
              setUserMemberType(memberType);
              setUserPosition(position);
            } else if (
              position === null ||
              position === undefined ||
              position === 'None'
            ) {
              if (userType === 'superAdmin') {
                setUserPosition('Super admin');
              } else if (userType === 'admin') {
                setUserPosition('Admin');
              } else if (userType === 'post-admin') {
                setUserPosition('Post admin');
              } else if (userType === 'member') {
                setUserPosition('Member');
              } else if (userType === 'joined') {
                setUserPosition('Joined');
              } else if (userType === 'user') {
                setUserPosition('User');
              }
            } else {
              setUserMemberType(null);
              setUserPosition(null);
            }
          }
        } else {
          setUserMemberType(null);
          setUserPosition(null);
        }
      } else {
        console.error('Users data not found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();

    // Handle saving admin Ip address
    publicIP()
      .then(ip => {
        setAdminIpAddress(ip);
      })
      .catch(error => {
        setAdminIpAddress(myId);
        console.log(error);
      });
    fetchUserData();
  }, [route.params.userId, myId]);

  // Handle user data
  const handleEditingUserData = () => {
    setEditing(!editing);
    setEdited(!edited);
  };

  // Handle input changes
  const handleNameChange = (text: string) => {
    setUserName(text);
    setEdited(true);
  };
  const handleFatherNameChange = (text: string) => {
    setUserFatherName(text);
    setEdited(true);
  };
  const handleEmailChange = (text: string) => {
    setUserEmail(text);
    setEdited(true);
  };
  const handlePhoneChange = (text: string) => {
    setUserPhone(text);
    setEdited(true);
  };
  const handlePostOfficeChange = (text: string) => {
    setUserPO(text);
    setEdited(true);
  };
  const handlePoliceStationChange = (text: string) => {
    setUserPS(text);
    setEdited(true);
  };
  const handlePositionChange = (text: string) => {
    setUserPosition(text);
    setEdited(true);
    if (text.includes('(C.W.C)')) {
      setNewMemberType('Central member');
    } else if (text.includes('(District)')) {
      setNewMemberType('District member');
    } else if (text.includes('(Block)')) {
      setNewMemberType('Block member');
    } else if (text.includes('(Primary)')) {
      setNewMemberType('Primary member');
    } else {
      setNewMemberType('Party member');
    }
  };

  // Open image picker
  const openProfileImageSelector = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setUserDPExist(true);
      setUserDPUrl(image.path);
    });
  };

  // Handle Profile update
  const handleProfleUpdate = async () => {
    const gender =
      selectedGenderId === '1'
        ? 'male'
        : selectedGenderId === '2'
        ? 'female'
        : userGender;
    try {
      const response = await update_user({
        userDPUrl: userDPUrl,
        adminID: myServerId,
        userID: userServerId,
        name: userName,
        fatherName: userFatherName,
        email: userEmail,
        phone: userPhone,
        gender: gender,
        postOffice: userPO,
        policeStation: userPS,
        position: userPosition,
        district: userDistrict,
        memberType: newMemberType,
        ipAddress: adminIpAddress,
        editTime: Date(),
      });
      if (response.status === 200) {
        showToast();
        setEditing(false);
        setEdited(false);
        console.log('User updated successfully');
      }
    } catch (error) {
      const response = await update_user({
        userDPUrl: userDPUrl,
        adminID: myServerId,
        userID: userServerId,
        name: userName,
        fatherName: userFatherName,
        email: userEmail,
        phone: userPhone,
        gender: gender,
        postOffice: userPO,
        policeStation: userPS,
        position: userPosition,
        district: userDistrict,
        memberType: newMemberType,
        ipAddress: adminIpAddress,
        editTime: Date(),
      });
      if (response.status === 200) {
        setEditing(false);
        setEdited(false);
        console.log('User updated successfully');
        return;
      }
      console.log('Failed to update user', error);
    }
  };

  // Radio button
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Male',
        color: '#046A38',
        borderSize: 2,
        borderColor: '#000',
        size: 24,
        labelStyle: {color: '#000', fontSize: 18},
      },
      {
        id: '2',
        label: 'Female',
        color: '#046A38',
        borderSize: 2,
        borderColor: '#000',
        size: 24,
        labelStyle: {color: '#000', fontSize: 18},
      },
    ],
    [],
  );

  // District list
  const districts = ['Kokrajhar', 'Chirang', 'Udalguri', 'Baksa', 'Tamulpur'];

  // Member position
  const adminAccessPositions = [
    'None',
    'President (District)',
    'President (Block)',
    'President (Primary)',
    'Vice President (District)',
    'Vice President (Block)',
    'Vice President (Primary)',
    'General Secretary (District)',
    'General Secretary (Block)',
    'General Secretary (Primary)',
    'Secretary (District)',
    'Secretary (Block)',
    'Secretary (Primary)',
    'Organising Secretary (District)',
    'Organising Secretary (Block)',
    'Organising Secretary (Primary)',
    'Treasurer (District)',
    'Treasurer (Block)',
    'Treasurer (Primary)',
    'Village Member (Primary)',
    'Member (District)',
    'Member (Block)',
    'Member (Primary)',
  ];
  const allPositions = [
    'None',
    'President (C.W.C)',
    'President (District)',
    'President (Block)',
    'President (Primary)',
    'Vice President (C.W.C)',
    'Vice President (District)',
    'Vice President (Block)',
    'Vice President (Primary)',
    'General Secretary (C.W.C)',
    'General Secretary (District)',
    'General Secretary (Block)',
    'General Secretary (Primary)',
    'Assistant General Secretary (C.W.C)',
    'Secretary (C.W.C)',
    'Secretary (District)',
    'Secretary (Block)',
    'Secretary (Primary)',
    'Organising Secretary (C.W.C)',
    'Organising Secretary (District)',
    'Organising Secretary (Block)',
    'Organising Secretary (Primary)',
    'Treasurer (C.W.C)',
    'Treasurer (District)',
    'Treasurer (Block)',
    'Treasurer (Primary)',
    'Party Spoke-person (C.W.C)',
    'Publicity Cell (C.W.C)',
    'Village Member (Primary)',
    'Member (C.W.C)',
    'Member (District)',
    'Member (Block)',
    'Member (Primary)',
  ];

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'User updated successfully',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'User info'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.wrapper}>
          <View style={styles.profileContainer}>
            {!itsMySelf ? (
              <TouchableOpacity
                onPress={handleEditingUserData}
                style={styles.editButton}>
                <PenIcon fill="#FF671F" width={24} height={24} />
              </TouchableOpacity>
            ) : null}
            {editing ? (
              userDPExist ? (
                <TouchableOpacity
                  onPress={openProfileImageSelector}
                  style={styles.editProfileButton}>
                  <Image
                    source={{uri: userDPUrl}}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={openProfileImageSelector}
                  style={styles.editProfileButton}>
                  <Image
                    source={require('../../assets/icons/profile-user.png')}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              )
            ) : userDPExist ? (
              <Image source={{uri: userDPUrl}} style={styles.profileImage} />
            ) : (
              <Image
                source={require('../../assets/icons/profile-user.png')}
                style={styles.profileImage}
              />
            )}
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Name : </Text>
              <TextInput
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userName}
                placeholder={editing ? 'Enter Name!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handleNameChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Father name : </Text>
              <TextInput
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userFatherName}
                placeholder={editing ? 'Enter Father Name!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handleFatherNameChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Email : </Text>
              <TextInput
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userEmail}
                placeholder={editing ? 'Enter email address!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handleEmailChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Phone : </Text>
              <TextInput
                inputMode="numeric"
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userPhone}
                placeholder={editing ? 'Enter phone number!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handlePhoneChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Gender : </Text>
              {editing ? (
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setSelectedGenderId}
                  selectedId={selectedGenderId}
                  layout="row"
                />
              ) : (
                <Text style={styles.userData}>{userGender}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>ID : </Text>
              <Text style={styles.userData}>{userId}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Position : </Text>
              {editing ? (
                <SelectDropdown
                  data={superAdmin ? allPositions : adminAccessPositions}
                  onSelect={(selectedItem, index) => {
                    handlePositionChange(selectedItem);
                  }}
                  renderButton={(selectedItem, isOpen) => {
                    return (
                      <View style={[styles.selectButton, {height: 50}]}>
                        <Text style={styles.dropdownButtonText}>
                          {selectedItem ||
                            userPosition ||
                            '---Select position---'}
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItem,
                          ...(isSelected && {backgroundColor: '#D2D9DF'}),
                        }}>
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </View>
                    );
                  }}
                  dropdownStyle={styles.positionDropdownMenu}
                />
              ) : (
                <Text style={styles.userData}>{userPosition}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>District : </Text>
              {editing ? (
                <SelectDropdown
                  data={districts}
                  onSelect={(selectedItem, index) => {
                    setUserDistrict(selectedItem);
                  }}
                  renderButton={(selectedItem, isOpen) => {
                    return (
                      <View style={[styles.selectButton, {height: 40}]}>
                        <Text style={styles.dropdownButtonText}>
                          {selectedItem ||
                            userDistrict ||
                            '---Select district---'}
                        </Text>
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItem,
                          ...(isSelected && {backgroundColor: '#D2D9DF'}),
                        }}>
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </View>
                    );
                  }}
                  dropdownStyle={styles.districtDropdownMenu}
                />
              ) : (
                <Text style={styles.userData}>{userDistrict}</Text>
              )}
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Post office : </Text>
              <TextInput
                inputMode="text"
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userPO}
                placeholder={editing ? 'Enter post office!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handlePostOfficeChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Police station : </Text>
              <TextInput
                inputMode="text"
                style={[styles.userData, editing ? {borderWidth: 0.2} : null]}
                value={userPS}
                placeholder={editing ? 'Enter police station!' : ''}
                placeholderTextColor={'gray'}
                onChangeText={handlePoliceStationChange}
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.dataLabel}>Status : </Text>
              <Text style={styles.userData}>{userStatus}</Text>
            </View>
            {edited && editing ? (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleProfleUpdate}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditUserDataScreen;

const styles = StyleSheet.create({
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
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
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
  editProfileButton: {
    height: 80,
    width: 80,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
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
  selectButton: {
    width: 230,
    backgroundColor: '#E9ECEF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 5,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  positionDropdownMenu: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 300,
  },
  districtDropdownMenu: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  saveButton: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#FF671F',
    borderRadius: 10,
    marginTop: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
