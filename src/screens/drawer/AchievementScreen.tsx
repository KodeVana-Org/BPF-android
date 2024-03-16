import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import AchievementFlateList from '../../components/AchievementFlateList/AchievementFlateList.tsx';

const AchievementScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={[styles.container]}>
        <NavHeader title={'Achievements'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.achievementContainer}>
          <AchievementFlateList />
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  achievementContainer: {
    marginTop: 10,
  },
});
