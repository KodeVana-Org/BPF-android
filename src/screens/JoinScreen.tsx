/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {join_bpf} from '../api/join-donate_apis';
import useFetchUserData from '../data/userData';
import SelectDropdown from 'react-native-select-dropdown';
import Toast from 'react-native-toast-message';

const JoinScreen = () => {
  const {userData} = useFetchUserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [villageTown, setVillageTown] = useState('');
  const [postOffice, setPostOffice] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedGenderId, setSelectedGenderId] = useState();
  const [preLoginCridential, setPreLoginCridential] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);

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

  // Set user data
  useEffect(() => {
    if (userData.email) {
      setEmail(userData.email);
      setPreLoginCridential('email');
    } else if (userData.phone) {
      setPhone(userData.phone.substring(3));
      setPreLoginCridential('phone');
    }
  }, [userData]);

  // Handle input changes
  const handleNameInputChange = (text: string) => {
    setName(text);
    if (text === '') {
      setVisible1(true);
    } else {
      setVisible1(false);
    }
  };
  const handleEmailInputChange = (text: string) => {
    setEmail(text);
    if (text === '') {
      setVisible2(true);
    } else {
      setVisible2(false);
    }
  };
  const handlePhoneInputChange = (number: number) => {
    setPhone(number.toString());
    if (number.toString() === '') {
      setVisible3(true);
    } else {
      setVisible3(false);
    }
  };
  const handleFatherNameInputChange = (text: string) => {
    setFatherName(text);
    if (text === '') {
      setVisible5(true);
    } else {
      setVisible5(false);
    }
  };
  const handleVillageTownInputChange = (text: string) => {
    setVillageTown(text);
    if (text === '') {
      setVisible6(true);
    } else {
      setVisible6(false);
    }
  };
  const handlePostOfficeInputChange = (text: string) => {
    setPostOffice(text);
    if (text === '') {
      setVisible8(true);
    } else {
      setVisible8(false);
    }
  };
  const handlePoliceStationInputChange = (text: string) => {
    setPoliceStation(text);
    if (text === '') {
      setVisible9(true);
    } else {
      setVisible9(false);
    }
  };

  // Handle join
  const handleJoinButton = async () => {
    const gender =
      selectedGenderId === '1'
        ? 'male'
        : selectedGenderId === '2'
        ? 'female'
        : null;
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      fatherName === '' ||
      villageTown === '' ||
      postOffice === '' ||
      policeStation === '' ||
      gender === null ||
      district === ''
    ) {
      if (name === '') {
        setVisible1(true);
      } else {
        setVisible1(false);
      }
      if (email === '') {
        setVisible2(true);
      } else {
        setVisible2(false);
      }
      if (phone === '') {
        setVisible3(true);
      } else {
        setVisible3(false);
      }
      if (fatherName === '') {
        setVisible5(true);
      } else {
        setVisible5(false);
      }
      if (villageTown === '') {
        setVisible6(true);
      } else {
        setVisible6(false);
      }
      if (postOffice === '') {
        setVisible8(true);
      } else {
        setVisible8(false);
      }
      if (policeStation === '') {
        setVisible9(true);
      } else {
        setVisible9(false);
      }
      if (gender === null) {
        setVisible4(true);
      } else {
        setVisible4(false);
      }
      if (district === '') {
        setVisible7(true);
      } else {
        setVisible7(false);
      }
      return;
    }
    try {
      const result = await join_bpf({
        id: userData.id,
        name: name,
        gender: gender,
        fatherName: fatherName,
        villTown: villageTown,
        po: postOffice,
        ps: policeStation,
        district: district,
      });
      if (result.status === 200) {
        showToast();
        console.log('Joined successfully');
      } else if (result.status === 404) {
        console.log('User not found');
      } else if (result.status === 401) {
        console.log('Only users can join');
      } else if (result.status === 400) {
        console.log('Invalid district');
      }
      console.log(result);
    } catch (error) {
      console.error('Error logging user:', error);
    }
  };

  // District list
  const districts = ['Kokrajhar', 'Chirang', 'Udalguri', 'Baksa', 'Tamulpur'];

  // Toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Joined BPF successfully',
    });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <NavHeader title={'Join BPF'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Join BPF</Text>

          {/**  Name Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Name*</Text>
              {visible1 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              onChangeText={handleNameInputChange}
              value={name}
              style={styles.inputField}
            />
          </View>

          {/**  Email Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Email*</Text>
              {visible2 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              editable={preLoginCridential === 'email' ? false : true}
              onChangeText={handleEmailInputChange}
              value={email}
              style={styles.inputField}
            />
          </View>

          {/**  Phone Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Phone*</Text>
              {visible3 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="numeric"
              editable={preLoginCridential === 'phone' ? false : true}
              onChangeText={handlePhoneInputChange}
              value={phone}
              style={styles.inputField}
            />
          </View>

          {/**  Gender Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Gender*</Text>
              {visible4 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedGenderId}
              selectedId={selectedGenderId}
              layout="row"
            />
          </View>

          {/** Father Name Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>FatherName*</Text>
              {visible5 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              onChangeText={handleFatherNameInputChange}
              value={fatherName}
              style={styles.inputField}
            />
          </View>

          {/** Village/Town Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Village/Town*</Text>
              {visible6 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              onChangeText={handleVillageTownInputChange}
              value={villageTown}
              style={styles.inputField}
            />
          </View>

          {/** District Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>District*</Text>
              {visible7 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <SelectDropdown
              data={districts}
              onSelect={(selectedItem, index) => {
                setDistrict(selectedItem);
                if (visible7 && selectedItem) {
                  setVisible7(false);
                }
              }}
              renderButton={(selectedItem, isOpen) => {
                return (
                  <View style={styles.selectDistrictButton}>
                    <Text style={styles.dropdownButtonText}>
                      {selectedItem || '---Select your district---'}
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
              dropdownStyle={styles.dropdownMenu}
            />
          </View>

          {/** Post Office Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Post office*</Text>
              {visible8 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              onChangeText={handlePostOfficeInputChange}
              value={postOffice}
              style={styles.inputField}
            />
          </View>

          {/** Police Station Input Field **/}
          <View style={styles.inputFieldContainer}>
            <View style={{flex: 1, flexDirection: 'row', gap: 20}}>
              <Text style={styles.inputFieldLebel}>Police station*</Text>
              {visible9 ? (
                <Text style={{fontSize: 16, color: 'red'}}>Required field</Text>
              ) : null}
            </View>
            <TextInput
              inputMode="text"
              onChangeText={handlePoliceStationInputChange}
              value={policeStation}
              style={styles.inputField}
            />
          </View>

          {/* Join Button */}
          <TouchableOpacity onPress={handleJoinButton} style={styles.joinBtn}>
            <Text style={styles.joinBtnLebel}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formHeader: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputFieldContainer: {
    width: Dimensions.get('window').width - 50,
    marginTop: 20,
  },
  inputFieldLebel: {
    color: '#000',
    fontSize: 18,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingTop: 0,
    paddingBottom: 3,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
    width: '100%',
    marginTop: 4,
  },
  fatherNameInputField: {},
  joinBtnContainer: {},
  joinBtn: {
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: '#FF671F',
  },
  joinBtnLebel: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectDistrictButton: {
    width: 250,
    height: 40,
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
  dropdownMenu: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItem: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
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
});
