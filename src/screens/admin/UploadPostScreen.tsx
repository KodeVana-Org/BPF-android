import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import React from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function UploadPostScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <NavHeader title={'Upload new post'} />
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
