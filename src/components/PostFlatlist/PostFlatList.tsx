import React, { useState } from 'react';
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
import { get_posts, remove_post } from '../../api/app_data_apis';
import { useNavigation } from '@react-navigation/native';
import { ModelsParamList } from '../../navigator/ModelNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import useFetchUserData from '../../data/userData';
import Toast from 'react-native-toast-message';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const { width } = Dimensions.get('window');

const timeAgo = (dateString: string) => {
  if (!dateString) return '';
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
  horizontal?: boolean;
  marginType?: 'bottom' | 'right';
  refreshing?: boolean;
  onRefresh?: () => void;
}) => {
  const navigation = useNavigation<StackNavigationProp<ModelsParamList>>();
  const { admin, postAdmin, myServerId } = useFetchUserData();
  const queryClient = useQueryClient();
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => get_posts({ cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasMore ? lastPage?.nextCursor : undefined;
    },
  });


  // Safely flatten all pages into a single continuous array
  const allPosts = data?.pages
    ? data.pages.flatMap((page) => page?.posts ?? [])
    : [];

  const posts = marginType === 'right' ? allPosts.slice(0, 5) : allPosts;

  const calculateMargin = () => {
    return marginType === 'bottom' ? { marginBottom: 14 } : { marginRight: 14 };
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !horizontal) {
      fetchNextPage();
    }
  };

  //TODO: 
  // clicking handleMenuPost will open dropdown of 
  // edit 
  // delelte
  const handleOpenMenu = (postId: string) => {
    setActiveMenuPostId(activeMenuPostId === postId ? null : postId);
  };

  const handleEditPost = (postId: string) => {
    setActiveMenuPostId(null);
    navigation.navigate('EditPost', { postId });
  };

  const handleDeletePost = async (postId: string) => {
    setActiveMenuPostId(null);
    setDeletingId(postId);
    try {
      const result = await remove_post(postId, myServerId);
      if (result?.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Post deleted successfully',
        });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Deletion failed',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network error',
      });
    } finally {
      setDeletingId(null);
    }
  };


  if (isLoading) {
    return;
    // return (
    //   <View style={styles.centerContainer}>
    //     <ActivityIndicator size="large" color="#046A38" />
    //   </View>
    // );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading posts.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, calculateMargin()]}>
      <FlatList
        data={posts}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingRight: horizontal ? 16 : 0,
          paddingBottom: horizontal ? 0 : 16,
        }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        refreshing={horizontal ? undefined : refreshing}
        onRefresh={horizontal ? undefined : onRefresh || refetch}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (!isFetchingNextPage) return null;
          return (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#046A38" />
            </View>
          );
        }}
        renderItem={({ item }) => (
          <View style={[styles.card, calculateMargin()]}>
            {/* Header */}
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                {item.PostCreatorId?.profileImage ? (
                  <Image
                    source={{ uri: item.PostCreatorId.profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarText}>
                    {(item.PostCreatorId?.email?.[0] || 'A').toUpperCase()}
                  </Text>
                )}
              </View>
              <View style={styles.headerText}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.PostCreatorId?.email?.split('@')[0] || 'Admin'}
                </Text>
                <Text style={styles.timestamp}>{timeAgo(item.createdAt)}</Text>
              </View>

              {(admin || postAdmin) && (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => handleOpenMenu(item.id)}
                    disabled={deletingId === item.id}>
                    {deletingId === item.id ? (
                      <ActivityIndicator color="#65676B" size="small" />
                    ) : (
                      <Text style={styles.menuDots}>⋯</Text>
                    )}
                  </TouchableOpacity>

                  {activeMenuPostId === item.id && (
                    <View style={styles.dropdownMenu}>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleEditPost(item.id)}>
                        <Text style={styles.dropdownText}>Edit</Text>
                      </TouchableOpacity>
                      <View style={styles.dropdownDivider} />
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleDeletePost(item.id)}>
                        <Text style={[styles.dropdownText, { color: '#E53935' }]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Caption (Handling key misspelling in API) */}
            {!!(item.posetComment || item.postComment) && (
              <Text style={styles.caption}>
                {item.posetComment || item.postComment}
              </Text>
            )}

            {/* Image */}
            <Pressable
              onPress={() => navigation.navigate('ViewPost', { postId: item.id })}>
              <Image source={{ uri: item.postImages }} style={styles.image} />
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
                    navigation.navigate('ViewPost', { postId: item.id })
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
    alignItems: 'center',
    // paddingBottom: 15,
    paddingTop: 8,
  },
  centerContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 50,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    width: width - 20,
    overflow: 'hidden',
    marginBottom: 12,
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
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
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

  menuContainer: {
    position: 'relative',
    zIndex: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    width: 110,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#050505',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#E4E6EB',
  },
});

export default PostFlatList;
