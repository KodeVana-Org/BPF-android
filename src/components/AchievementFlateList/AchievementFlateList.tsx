import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {get_achievements} from '../../api/app_data_apis';

const {width} = Dimensions.get('window');

const AchievementFlateList = () => {
  const [achievement, setAchievement] = useState([]);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await get_achievements();
        if (response) {
          setAchievement(response.achievements.reverse());
        } else {
          console.error('Achievements data not found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching achievement:', error);
      }
    };

    fetchAchievement();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={achievement}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        renderItem={({item}) => (
          <View style={styles.achievementContainer}>
            <Image source={{uri: item.photo[0]}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: width - 20,
  },
  image: {
    width: width - 40,
    height: width - 40,
    borderRadius: 7,
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default AchievementFlateList;
