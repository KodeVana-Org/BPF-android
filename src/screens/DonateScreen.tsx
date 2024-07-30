import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NavHeader from '../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useFetchUserData from '../data/userData';
import RNUpiPayment from 'react-native-upi-payment';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const DonateScreen = () => {
  const {userData} = useFetchUserData();
  const [name, setName] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [email, setEmail] = useState('');
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [amount, setAmount] = useState('');
  const [amountEmpty, setAmountEmpty] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    if (userData.name) {
      setName(userData.name);
    }
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  // Handle checkout
  const handleCheckout = () => {
    if (name === '') {
      setNameEmpty(true);
    }
    if (email === '') {
      setEmailEmpty(true);
    }
    if (amount === '') {
      setAmountEmpty(true);
    }
    if (name !== '' && email !== '' && amount !== '') {
      RNUpiPayment.initializePayment(
        {
          vpa: 'bodolandpeoplesfront@sbi',
          payeeName: 'Bodoland Peoples Front',
          transactionNote: 'Donate BPF',
          amount: amount,
          transactionRef: 'aasf-332-aoei-fn',
        },
        successCallback,
        failureCallback,
      );
    }
  };
  const successCallback = (data: any) => {
    showToast('success', 'Donation succeeded');
    console.log(data);
  };
  const failureCallback = (data: any) => {
    showToast('error', 'Oops! donation failed');
    console.log(data);
  };

  // Handle scanner visibility
  const handleScannerVisible = () => {
    setScannerVisible(true);
  };

  // Toast
  const showToast = (type: string, message: string) => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  return (
    <SafeAreaProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.popupContainer}>
          <Modal isVisible={scannerVisible}>
            <View style={styles.popupContainer}>
              <Image
                style={styles.scannerImage}
                source={require('../assets/images/scanner.jpg')}
              />
              <TouchableOpacity
                style={styles.hideScannerButton}
                onPress={() => setScannerVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <NavHeader title={'Donate us'} />
        <View style={styles.container}>
          <View style={styles.donateForm}>
            <View>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Name:</Text>
                {nameEmpty ? (
                  <Text style={styles.errorMessage}>Required</Text>
                ) : null}
              </View>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Email:</Text>
                {emailEmpty ? (
                  <Text style={styles.errorMessage}>Required</Text>
                ) : null}
              </View>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Amount (INR):</Text>
                {amountEmpty ? (
                  <Text style={styles.errorMessage}>Required</Text>
                ) : null}
              </View>
              <TextInput
                style={[styles.textInput, styles.amountInput]}
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={styles.upiPayButton}
              onPress={handleCheckout}>
              <Text style={styles.buttonText}>Make payment</Text>
            </TouchableOpacity>
            <View style={styles.scanButtonWrapper}>
              <Text style={styles.label}>Click bellow for scanner</Text>
              <TouchableOpacity
                style={styles.scanPayButton}
                onPress={handleScannerVisible}>
                <Text style={styles.buttonText}>Scan & pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  popupContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerImage: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width + 130,
    borderRadius: 5,
  },
  hideScannerButton: {
    backgroundColor: '#FF671F',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 16,
  },
  container: {
    flex: 1,
    color: '#000',
    alignItems: 'center',
  },
  donateForm: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').width + 150,
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 30,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  label: {
    color: '#000',
    fontSize: 18,
    marginBottom: 5,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    color: 'gray',
    fontSize: 18,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width - 60,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.6,
    marginBottom: 10,
    borderRadius: 7,
  },
  amountInput: {
    width: 250,
    textAlign: 'center',
  },
  upiPayButton: {
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: '#046A38',
    borderRadius: 7,
    marginTop: 20,
  },
  scanButtonWrapper: {
    marginTop: 10,
  },
  scanPayButton: {
    paddingVertical: 7,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#046A38',
    borderRadius: 7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
});
