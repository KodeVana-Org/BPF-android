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
import LinearGradient from 'react-native-linear-gradient';
import ChevronLeftLight from '../../assets/icons/ChevronLeftLight';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigator/AuthNavigator';
import {AppContext} from '../../navigator/AppContext';
import {user_login_otp} from '../../api/auth_apis';
import {validateEmailPhone} from '../../validation/validateInputDetails';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginOtpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();

  /// Handle navigation to HomeScreen
  const {setNavigateToHome} = useContext(AppContext);
  const handleSkipButton = () => {
    setNavigateToHome(true);
  };

  // Handle saving form data
  const [emailPhone, setEmailPhone] = useState('');
  const handleEmailPhoneInputChange = (text: string) => {
    setEmailPhone(text.trim());
  };

  // Handle input field error messages
  const [emailPhoneErrorMessage, setEmailPhoneErrorMessage] = useState('');
  const [emailPhoneErrorMessageVisible, setEmailPhoneErrorMessageVisible] =
    useState(false);
  const emailPhoneErrorMessageType = (message: string) => {
    setEmailPhoneErrorMessage(message);
  };

  // Handle form data validation
  const handlesendOTPButton = async () => {
    const emailPhoneValidationResult = validateEmailPhone(emailPhone);
    if (emailPhoneValidationResult?.success) {
      passUserData();
    }
    if (!emailPhoneValidationResult?.success) {
      emailPhoneErrorMessageType(emailPhoneValidationResult?.message || '');
      setEmailPhoneErrorMessageVisible(true);
    } else {
      emailPhoneErrorMessageType(emailPhoneValidationResult?.message || '');
      setEmailPhoneErrorMessageVisible(false);
    }
  };

  // Pass user data to the server
  const passUserData = async () => {
    try {
      const result = await user_login_otp({
        emailPhone: emailPhone.toLocaleLowerCase(),
      });
      if (result.data) {
        navigation.navigate('VerifyOTP', {
          EmailPhone: emailPhone,
          Password: '',
          Purpose: 'login',
        } as any);
      } else if (result.status !== 200) {
        emailPhoneErrorMessageType('Invalid input details!');
        setEmailPhoneErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error logging user:', error);
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
        <Text style={styles.formHeader}>Login</Text>
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
          <View style={styles.sendOTPContainer}>
            <TouchableOpacity
              style={styles.sendOTP}
              onPress={handlesendOTPButton}>
              <Text style={styles.sendOTPLebel}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerBtnLebel}>Don't have an account? </Text>
            <Pressable style={styles.registerBtn}>
              <Text
                style={styles.registerBtnText}
                onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </Pressable>
          </View>
          <Pressable style={styles.passLoginBtn}>
            <Text
              style={styles.passLoginText}
              onPress={() => navigation.navigate('LoginPass')}>
              Login with Password
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity onPress={handleSkipButton} style={styles.skipBtn}>
          <Text style={styles.skipBtnLebel}>Skip</Text>
          <ChevronLeftLight width={16} height={16} style={styles.skipIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginOtpScreen;

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
  forgotPassBtn: {
    alignItems: 'flex-end',
    padding: 0,
    margin: 0,
  },
  forgotPassLebel: {
    color: '#000',
    fontSize: 14,
    marginRight: 7,
    fontWeight: '500',
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
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerBtnLebel: {
    color: '#000',
    fontSize: 14,
  },
  registerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  registerBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  passLoginBtn: {
    padding: 0,
    marginTop: 0,
    alignItems: 'center',
  },
  passLoginText: {
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
