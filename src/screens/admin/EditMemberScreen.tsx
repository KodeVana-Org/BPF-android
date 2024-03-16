import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import React from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function EditMemberScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <NavHeader title={'Edit member details'} />
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/Hagrama_photo.jpg')}
            style={styles.userProfile}
          />
          <Text style={styles.userName}>Hagrama Mohilary</Text>
          <Text style={styles.userName}>Email</Text>
          <Text style={styles.userName}>Phone</Text>
          <Text style={styles.userName}>Position</Text>
          <Text style={styles.userName}>UserType</Text>
          <Text style={styles.userName}>PS</Text>
          <Text style={styles.userName}>PO</Text>
          <Text style={styles.userName}>Pincode</Text>
          <Text style={styles.userName}>Description</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    height: 100,
    width: 100,
    borderRadius: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
});
