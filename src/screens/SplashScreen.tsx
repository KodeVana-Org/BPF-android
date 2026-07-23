import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SplashScreen() {
  return (
    <View style={styles.flagContainer}>
      <View style={[styles.flagSection, styles.flagSaffron]} />
      <View style={[styles.flagSection, styles.flagWhite]}>
        <Image
          style={styles.partyEmplem}
          source={require('../assets/images/PartyEmblem.png')}
        />
      </View>
      <View style={[styles.flagSection, styles.flagGreen]} />
      <Text style={styles.flagLebel}>Bodoland People's Front</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  flagContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  flagSection: {
    width: 250,
    height: 50,
  },
  flagSaffron: {
    backgroundColor: '#FF671F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  flagWhite: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyEmplem: {
    width: 70,
    height: 50,
  },
  flagGreen: {
    backgroundColor: '#046A38',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  flagLebel: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});
