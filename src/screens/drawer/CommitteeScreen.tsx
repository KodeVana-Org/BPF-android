import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import data from '../../data/data.member';
import Accordion from '../../components/Accordion/Accordion';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const CommitteeScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <View style={styles.flagGradient}>
          <LinearGradient
            style={styles.gradient}
            colors={['#FF671F', '#fff', '#046A38']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
        </View>
        <NavHeader title={'BPF Committee'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            {data.map((value, index) => {
              return <Accordion value={value} key={index} type={value.type} />;
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default CommitteeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 10,
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
});
