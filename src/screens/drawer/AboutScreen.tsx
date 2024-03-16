import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const AboutScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        {/* <View style={styles.flagGradient}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FF671F', '#fff', '#046A38']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View> */}
        <NavHeader title={'About'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>
            BPF - Bodoland Peoples Front Official Apps is meant to keep you
            connected with the Bodoland Peoples Front(BPF). This apps will
            connect people throughout India and build a strong party across the
            country. It will be beneficial to comprehend the ideology,
            accomplishments, and vision of a BPF that is united and stronger.
          </Text>
          <Text style={styles.text}>
            The Bodoland People's Front (BPF) is a state political party in
            Assam, India. The party is headquartered in Kokrajhar Town and
            previously was in ruling government in the autonomous region of
            Bodoland.
          </Text>
          <Text style={styles.text}>
            Chairperson - Hagrama Mohilary Ideology
          </Text>
          <Text style={styles.text}>Secularism and Democratic socialism</Text>
          <Text style={styles.text}>Founded in 2005</Text>
          <Text style={styles.footerText}>
            More details will be updated soon!
          </Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flagGradient: {
    width: width,
    height: height,
    position: 'absolute',
    bottom: 0,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FF671F',
  },
});
