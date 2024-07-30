import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {get_posts} from '../../api/app_data_apis';
import {useNavigation} from '@react-navigation/native';
import {ModelsParamList} from '../../navigator/ModelNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

const {width} = Dimensions.get('window');

const PostFlatList = ({
  horizontal,
  marginType,
}: {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
}) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  // console.log(navigation);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get_posts();
        if (response && response.posts) {
          setPosts(response.posts);
        } else {
          console.error('Posts data not found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const calculateMargin = () => {
    if (marginType === 'bottom') {
      return {marginBottom: 20};
    } else {
      return {marginRight: 20};
    }
  };

  // Filter posts if marginType is 'right'
  const filteredPosts = marginType === 'right' ? posts.slice(0, 5) : posts;

  return (
    <View style={[styles.container, calculateMargin()]}>
      <FlatList
        data={filteredPosts}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingRight: horizontal ? 16 : 0}}
        initialNumToRender={3}
        renderItem={({item}) => (
          <Pressable
            style={[styles.postContainer, calculateMargin()]}
            onPress={() => navigation.navigate('ViewPost', {postId: item.id})}>
            <Image source={{uri: item.postImages}} style={styles.image} />
            <Text style={styles.text}>{item.postComment}</Text>
          </Pressable>
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
  postContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
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
  text: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});

export default PostFlatList;
