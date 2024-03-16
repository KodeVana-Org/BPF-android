import {StyleSheet, ScrollView, Text, View, Image} from 'react-native';
import React from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function EditBannerScreen() {
  return (
    <ScrollView>
      <SafeAreaView>
        <NavHeader title={'Edit banner'} />
        {/* TODO: Display 5 banner images add "pen tool to edit" and display replace icon to replace the icon */}
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
