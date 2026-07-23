import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {get_posts, remove_post} from '../../api/app_data_apis';
import {useNavigation} from '@react-navigation/native';
import {ModelsParamList} from '../../navigator/ModelNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import useFetchUserData from '../../data/userData';
import Toast from 'react-native-toast-message';
import {useQuery, useQueryClient} from '@tanstack/react-query';

const {width} = Dimensions.get('window');

const PostFlatList = ({
  horizontal,
  marginType,
}: {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  const {admin, postAdmin, myServerId} = useFetchUserData();
  const queryClient = useQueryClient();

  // ✅ React Query for fetching posts
    const {
      data: postData,
      isLoading: isPostsLoading,
      isError,
    } = useQuery({
      queryKey: ['posts'],
      queryFn: get_posts,
    });

  const posts = postData?.posts || [];
  const filteredPosts = marginType === 'right' ? posts.slice(0, 5) : posts;

  const calculateMargin = () => {
    if (marginType === 'bottom') {
      return {marginBottom: 20};
    } else {
      return {marginRight: 20};
    }
  };

  const handleRemovePost = async (postId: string) => {
    setIsLoading(postId);
    try {
      const result = await remove_post(postId, myServerId);
      if (result.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Post deleted successfully',
          text2: 'The post was deleted successfully',
        });

        // ✅ Refetch posts after deletion
        queryClient.invalidateQueries(['posts']);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed',
          text2: 'Unable to delete post',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network error',
        text2: 'Please check your internet connection',
      });
      console.error('Error removing post:', error);
    } finally {
      setIsLoading(null);
    }
  };

  if (isPostsLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Error loading posts.</Text>
      </View>
    );
  }

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

            {(admin || postAdmin) && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePost(item.id)}
                disabled={isLoading === item.id}>
                {isLoading === item.id ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.removeButtonText}>Remove</Text>
                )}
              </TouchableOpacity>
            )}
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

removeButton: {
  marginTop: 10,
  backgroundColor: 'red',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 6,
  alignItems: 'center',
},
removeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
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
