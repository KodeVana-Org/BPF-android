import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {user_register} from '../../api/auth_api';
import LinearGradient from 'react-native-linear-gradient';
import ChevronLeftLight from '../../assets/icons/ChevronLeftLight';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigator/AuthNavigator';
import EyeClose from '../../assets/icons/EyeClose';
import EyeOpen from '../../assets/icons/EyeOpen';
import {AppContext} from '../../navigator/AppContext';
import {
  validateEmailPhone,
  validatePassword,
} from '../../validation/validateInputDetails';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegisterScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  // Handle hide password
  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  /// Handle navigation to HomeScreen
  const {setNavigateToHome} = useContext(AppContext);
  const handleSkipButton = () => {
    setNavigateToHome(true);
  };

  // Handle saving form data
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailPhoneInputChange = (text: string) => {
    setEmailPhone(text);
  };
  const handlePasswordInputChange = (text: string) => {
    setPassword(text);
  };

  // Handle input field error messages
  const [emailPhoneErrorMessage, setEmailPhoneErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailPhoneErrorMessageVisible, setEmailPhoneErrorMessageVisible] =
    useState(false);
  const [passwordErrorMessageVisible, setPasswordErrorMessageVisible] =
    useState(false);
  const emailPhoneErrorMessageType = (message: string) => {
    setEmailPhoneErrorMessage(message);
  };
  const passwordErrorMessageType = (message: string) => {
    setPasswordErrorMessage(message);
  };

  // Handle form data validation
  const handlesendOTPButton = async () => {
    const emailPhoneValidationResult = validateEmailPhone(emailPhone);
    const passwordValidationResult = validatePassword(password);
    if (
      emailPhoneValidationResult?.success &&
      passwordValidationResult?.success
    ) {
      passUserData();
    }
    if (!emailPhoneValidationResult?.success) {
      emailPhoneErrorMessageType(emailPhoneValidationResult?.message || '');
      setEmailPhoneErrorMessageVisible(true);
    } else {
      emailPhoneErrorMessageType(emailPhoneValidationResult?.message || '');
      setEmailPhoneErrorMessageVisible(false);
    }
    if (!passwordValidationResult?.success) {
      passwordErrorMessageType(passwordValidationResult?.message || '');
      setPasswordErrorMessageVisible(true);
    } else {
      passwordErrorMessageType(passwordValidationResult?.message || '');
      setPasswordErrorMessageVisible(false);
    }
  };

  // Pass user data to the server
  const passUserData = async () => {
    try {
      const result = await user_register({
        emailPhone: emailPhone.toLocaleLowerCase(),
      });
      if (result.data) {
        navigation.navigate('VerifyOTP', {
          EmailPhone: emailPhone,
          Password: password,
          Purpose: 'register',
        } as any);
      } else if (result.status !== 200) {
        emailPhoneErrorMessageType('User already exist!');
        setEmailPhoneErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      console.error(error);
    }
  };

  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.flagGradient}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FF671F', '#fff', '#046A38']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View>
        <View style={styles.flagContainer}>
          <View style={[styles.flagSection, styles.flagSaffron]} />
          <View style={[styles.flagSection, styles.flagWhite]}>
            <Image
              style={styles.partyEmplem}
              source={require('../../assets/images/PartyEmblem.png')}
            />
          </View>
          <View style={[styles.flagSection, styles.flagGreen]} />
          <Text style={styles.flagLebel}>Bodoland People's Front</Text>
        </View>
        <Text style={styles.formHeader}>New Register</Text>
        <View style={styles.formContainer}>
          <View style={[styles.inputFieldContainer, styles.emailPhoneInput]}>
            <Text style={styles.inputFieldLebel}>Email or Phone Number</Text>
            <TextInput
              inputMode="email"
              onChangeText={handleEmailPhoneInputChange}
              value={emailPhone}
              style={styles.inputField}
            />
            {emailPhoneErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>
                {emailPhoneErrorMessage}
              </Text>
            ) : null}
          </View>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.inputFieldLebel}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                onChangeText={handlePasswordInputChange}
                value={password}
                secureTextEntry={hidePassword ? true : false}
                style={[styles.inputField, styles.passwordInputField]}
              />
              <Pressable
                style={styles.hidePassBtn}
                onPress={toggleHidePassword}>
                {hidePassword ? (
                  <EyeClose height={20} width={20} />
                ) : (
                  <EyeOpen height={20} width={20} />
                )}
              </Pressable>
            </View>
            {passwordErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>
                {passwordErrorMessage}
              </Text>
            ) : null}
          </View>
          <View style={styles.sendOTPContainer}>
            <TouchableOpacity
              style={styles.sendOTP}
              onPress={handlesendOTPButton}>
              <Text style={styles.sendOTPLebel}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginBtnLebel}>Already have an account?</Text>
            <Pressable style={styles.loginBtn}>
              <Text
                style={styles.loginBtnText}
                onPress={() => navigation.navigate('LoginPass')}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
        <TouchableOpacity onPress={handleSkipButton} style={styles.skipBtn}>
          <Text style={styles.skipBtnLebel}>Skip</Text>
          <ChevronLeftLight width={16} height={16} style={styles.skipIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  flagContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  flagSection: {
    width: 120,
    height: 30,
  },
  flagSaffron: {
    backgroundColor: '#FF671F',
  },
  flagWhite: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyEmplem: {
    width: 40,
    height: 30,
  },
  flagGreen: {
    backgroundColor: '#046A38',
  },
  flagLebel: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  flagGradient: {
    width: windowWidth,
    height: windowHeight - 160,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 100,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 100,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 25,
    color: '#fff',
  },
  formContainer: {
    gap: 10,
    width: windowWidth - 30,
    marginHorizontal: 50,
    marginBottom: 10,
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    opacity: 50,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {elevation: 4}),
  },
  inputFieldContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }
      : {elevation: 3}),
  },
  inputFieldLebel: {
    color: '#000',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  emailPhoneInput: {
    marginBottom: 5,
  },
  passwordInput: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputField: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 4,
    paddingTop: 0,
    paddingBottom: 3,
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    width: '100%',
  },
  passwordInputField: {
    width: '90%',
  },
  hidePassBtn: {
    justifyContent: 'flex-end',
  },
  sendOTPContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  sendOTP: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 140,
    marginHorizontal: 'auto',
    backgroundColor: '#046A38',
    borderRadius: 10,
  },
  sendOTPLebel: {
    color: '#fff',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnLebel: {
    color: '#000',
    fontSize: 14,
  },
  loginBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  loginBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  skipBtn: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#FF671F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  skipBtnLebel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  skipIcon: {
    transform: [{rotate: '180deg'}],
  },
});
