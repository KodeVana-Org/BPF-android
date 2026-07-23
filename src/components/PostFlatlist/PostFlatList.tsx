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

const timeAgo = (dateString: string) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateString).toLocaleDateString();
};

const PostFlatList = ({
  horizontal,
  marginType,
  refreshing,
  onRefresh,
}: {
  horizontal: boolean;
  marginType?: 'bottom' | 'right';
  refreshing?: boolean;
  onRefresh?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  const {admin, postAdmin, myServerId} = useFetchUserData();
  const queryClient = useQueryClient();

  const {
    data: postData,
    isLoading: isPostsLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: get_posts,
  });

  const posts = postData?.posts || [];
  const length = postData?.totalPost || [];
  const filteredPosts = marginType === 'right' ? posts.slice(0, 5) : posts;
  console.log("POSTS", length);

  const calculateMargin = () => {
    if (marginType === 'bottom') {
      return {marginBottom: 14};
    } else {
      return {marginRight: 14};
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
      <View style={{alignItems: 'center', justifyContent: 'center', padding: 40}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', padding: 40}}>
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
        contentContainerStyle={{
          paddingRight: horizontal ? 16 : 0,
          paddingBottom: horizontal ? 0 : 16,
        }}
        initialNumToRender={3}
        refreshing={horizontal ? undefined : refreshing}
        onRefresh={horizontal ? undefined : onRefresh}
        renderItem={({item}) => (
          <View style={[styles.card, calculateMargin()]}>
            {/* Header: avatar + name + time + menu */}
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(item.PostCreatorId?.email?.[0] || 'A').toUpperCase()}
                </Text>
              </View>
              <View style={styles.headerText}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.PostCreatorId?.email?.split('@')[0] || 'Admin'}
                </Text>
                <Text style={styles.timestamp}>{timeAgo(item.createdAt)}</Text>
              </View>

              {(admin || postAdmin) && (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => handleRemovePost(item.id)}
                  disabled={isLoading === item.id}>
                  {isLoading === item.id ? (
                    <ActivityIndicator color="#65676B" size="small" />
                  ) : (
                    <Text style={styles.menuDots}>⋯</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>

            {/* Caption */}
            {!!item.postComment && (
              <Text style={styles.caption}>{item.postComment}</Text>
            )}

            {/* Image */}
            <Pressable
              onPress={() => navigation.navigate('ViewPost', {postId: item.id})}>
              <Image source={{uri: item.postImages}} style={styles.image} />
            </Pressable>

            {/* Action row */}
            {!horizontal && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>👍</Text>
                <Text style={styles.actionLabel}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  navigation.navigate('ViewPost', {postId: item.id})
                }>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionLabel}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>↗️</Text>
                <Text style={styles.actionLabel}>Share</Text>
              </TouchableOpacity>
            </View>
            )}
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
    paddingBottom: 15,
    paddingTop: 8,
    // justifyContent: 'cneter',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    width: width - 20,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#046A38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#050505',
  },
  timestamp: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 1,
  },
  menuButton: {
    padding: 6,
  },
  menuDots: {
    fontSize: 20,
    color: '#65676B',
    fontWeight: '700',
  },
  caption: {
    fontSize: 14,
    color: '#050505',
    paddingHorizontal: 12,
    paddingBottom: 10,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: width - 20,
    backgroundColor: '#F0F2F5',
  },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
    marginTop: 6,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#65676B',
  },
});

export default PostFlatList;
