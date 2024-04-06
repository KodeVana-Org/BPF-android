import React, {useEffect, useState} from 'react';
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
import useFetchUserData from '../data/userData';

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
  };

  // Handle scanner visibility
  const handleScannerVisible = () => {
    setScannerVisible(true);
  };

  return (
    <SafeAreaProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
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
