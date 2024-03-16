import React from 'react';
import {ScrollView, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NavHeader title={'My Profile'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{color: '#000'}}>ProfileScreen</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
