import React, {useContext, useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChevronLeftLight from '../../assets/icons/ChevronLeftLight';
import {
  forgot_pass_otp,
  verify_login_otp,
  verify_register_otp,
} from '../../api/auth_apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../navigator/AppContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigator/AuthNavigator';
import {useNavigation} from '@react-navigation/native';
import {validateOTP} from '../../validation/validateInputDetails';
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  route: {
    params: {
      EmailPhone: string;
      Password: string;
      Purpose: 'register' | 'login' | 'resetPassword';
    };
  };
}

const VerifyOTPScreen = ({route}: Props) => {
  const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
  const [secondsRemaining, setSecondsRemaining] = useState(9); // 1:59 = 119 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /// Handle navigation to HomeScreen
  const {setNavigateToHome} = useContext(AppContext);
  const handleNavigateToHome = () => {
    setNavigateToHome(true);
  };

  // Handle saving form data
  const emailPhone = route.params.EmailPhone;
  const password = route.params.Password;
  const purpose = route.params.Purpose;
  const [otp, setOtp] = useState('');
  const handleOtpInputChange = (text: string) => {
    setOtp(text.trim());
  };

  // Handle input field error messages
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [otpErrorMessageVisible, setOtpErrorMessageVisible] = useState(false);
  const otpErrorMessageType = (message: string) => {
    setOtpErrorMessage(message);
  };

  // Handle form data validation
  const handleSubmitButton = async () => {
    const otpValidationResult = validateOTP(otp);
    if (otpValidationResult?.success) {
      passUserData();
    }
    if (!otpValidationResult?.success) {
      otpErrorMessageType(otpValidationResult?.message || '');
      setOtpErrorMessageVisible(true);
    } else {
      otpErrorMessageType(otpValidationResult?.message || '');
      setOtpErrorMessageVisible(false);
    }
  };

  // Handle api call for the desired action
  const passUserData = () => {
    if (purpose === 'register') {
      RegisterUser();
    } else if (purpose === 'login') {
      LoginUser();
    } else {
      resetUserPassword();
    }
  };


  // Pass => register user data to the server
  const RegisterUser = async () => {
    setIsSubmitting(true)
    try {
      const result = await verify_register_otp({
        emailPhone: emailPhone.toLocaleLowerCase(),
        password: password,
        otp: otp,
      });
      if (result.data.token) {
        Toast.show
            ({
                type:"succes",
                text1:"User logged successfully"
            })
        otpErrorMessageType('User Registerd successfully');
        storeToken(result.data.token);
        handleNavigateToHome();
      } else if (result.status !== 200) {
        otpErrorMessageType('Invalid OTP!');
        setOtpErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      console.error(error);
    } finally {
        setIsSubmitting(false)
     }
  };

  // Pass => login user data to the server
  const LoginUser = async () => {
    setIsSubmitting(true)
    try {
      const result = await verify_login_otp({
        emailPhone: emailPhone.toLocaleLowerCase(),
        otp: otp,
      });
            console.log("res]result", result)
      if (result.status === 200) {
        Toast.show
            ({
                type:"success",
                text1:"logined successfully"
            })
        otpErrorMessageType('OTP verified successfully');
        storeToken(result.token);
        handleNavigateToHome();
        return true;
      } else if (result.status === 400) {
        otpErrorMessageType('Invalid OTP!');
        setOtpErrorMessageVisible(true);
      } else if (result.status === 410) {
        otpErrorMessageType('OTP expired!');
        setOtpErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      console.error(error);
      return false;
    } finally {
        setIsSubmitting(false)
      }
  };

  // Pass => reset password user data
  const resetUserPassword = async () => {

    setIsSubmitting(true)
    try {
      const result = await forgot_pass_otp({
        emailPhone: emailPhone.toLocaleLowerCase(),
        otp: otp,
      });
      if (result.status === 200) {
        otpErrorMessageType('OTP verified successfully');
        navigation.navigate('SetPass', {
          EmailPhone: emailPhone,
        } as any);
        return true;
      } else if (result.status === 404) {
        otpErrorMessageType('Wrong OTP!');
        setOtpErrorMessageVisible(true);
      } else if (result.status === 400) {
        otpErrorMessageType('OTP expired!');
        setOtpErrorMessageVisible(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      console.error(error);
      return false;
    } finally {
        setIsSubmitting(false)
      }
  };

  // Store user login token
  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('AccessToken', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  // Handle resend otp button
  const handleResendOtpButton = () => {
      // setSecondsRemaining(119);
      setSecondsRemaining(9);
      setIsTimerRunning(true);
        console.log("yesh")
    // TODO: Activate the button if the timer is over and when user clicks on the button sesend another OTP and disable the button again for the defined amount of time;
    // if (purpose === 'register') {
    //   RegisterUser();
    // } else if (purpose === 'login') {
    //   LoginUser();
    // } else {
    //   resetUserPassword();
    // }
  };


  // Toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'OTP verified successfully',
    });
  };

//helper function for timing
const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes} : ${seconds}`;
};

//for timing
useEffect(() => {
  let timer: NodeJS.Timeout;

  if (isTimerRunning && secondsRemaining > 0) {
    timer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
  } else if (secondsRemaining === 0) {
    setIsTimerRunning(false);
  }

  return () => clearInterval(timer); // Cleanup interval on unmount
}, [isTimerRunning, secondsRemaining]);



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
        <Text style={styles.formHeader}>OTP Verification</Text>
        <View style={styles.formContainer}>
          <View style={[styles.inputFieldContainer, styles.otpInput]}>
            <Text style={styles.inputFieldLebel}>OTP</Text>
            <View style={styles.otpInputFieldContainer}>
              <TextInput
                onChangeText={handleOtpInputChange}
                value={otp}
                keyboardType="numeric"
                inputMode="numeric"
                maxLength={4}
                style={styles.otpInputField}
                selectionColor="#000"
              />
              <View style={styles.otpInputUnderlineContainer}>
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
                <View style={styles.otpInputUnderline} />
              </View>
            </View>
            {otpErrorMessageVisible ? (
              <Text style={{color: 'red', marginTop: 5}}>
                {otpErrorMessage}
              </Text>
            ) : null}
          </View>
        <View style={styles.resendOtpBtnContainer}>
          <Pressable
            style={styles.resendOtpBtn}
            disabled={secondsRemaining > 0}
            onPress={handleResendOtpButton}>
            <Text
              style={[
                styles.resendOtpLebel,
                {
                  color: secondsRemaining > 0 ? 'gray' : 'blue',
                  textDecorationLine: secondsRemaining > 0 ? 'none' : 'underline',
                },
              ]}>
              Resend OTP
            </Text>
          </Pressable>

          <Text
            style={[
              styles.resendOtpTimer,
              {color: secondsRemaining > 0 ? 'green' : 'gray'},
            ]}>
            {formatTime(secondsRemaining)}
          </Text>
        </View>
          <View style={styles.submitBtnContainer}>
            <TouchableOpacity
              style={[styles.submitBtn, isSubmitting && {opacity: isSubmitting ? 0.6 : 1}]}
              onPress={handleSubmitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitBtnLebel}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleNavigateToHome} style={styles.skipBtn}>
          <Text style={styles.skipBtnLebel}>Skip</Text>
          <ChevronLeftLight width={16} height={16} style={styles.skipIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VerifyOTPScreen;

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
    marginBottom: 50,
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
    marginBottom: 30,
    color: '#fff',
  },
  formContainer: {
    gap: 10,
    width: windowWidth - 30,
    marginHorizontal: 50,
    marginBottom: 10,
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 15,
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
  otpInput: {
    alignItems: 'center',
    justifyContent: 'center',
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
  otpInputFieldContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otpInputField: {
    color: 'gray',
    letterSpacing: 15,
    paddingLeft: 8,
    margin: 0,
    fontSize: 16,
    padding: 0,
    width: 115,
  },
  otpInputUnderlineContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  otpInputUnderline: {
    height: 1,
    width: 15,
    backgroundColor: 'gray',
  },
  resendOtpBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  resendOtpBtn: {
    padding: 0,
    margin: 0,
  },
  resendOtpLebel: {
    fontSize: 14,
    fontWeight: '500',
  },
  resendOtpTimer: {
    fontSize: 14,
  },
  submitBtnContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 140,
    marginHorizontal: 'auto',
    backgroundColor: '#046A38',
    borderRadius: 10,
  },
  submitBtnLebel: {
    color: '#fff',
    fontSize: 18,
  },
  skipBtn: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#FF671F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
