import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import PenIcon from '../../assets/icons/PenIcon.js';
import {get_single_post} from '../../api/app_data_apis';
import useFetchUserData from '../../data/userData';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';

const {width} = Dimensions.get('window');

const timeAgo = (dateString: string) => {
  if (!dateString) return '';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
};

const ViewPostScreen = ({route}: any) => {
  const postId = route.params.postId;
  const [postTitle, setPostTitle] = useState('');
  const [editTitle, setEditTitle] = useState(false);
  const [edited, setEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {userData, postAdmin} = useFetchUserData();

  const handleTitleValueChange = (text: string) => {
    setPostTitle(text);
    setEdited(true);
  };

  const handleEditTitle = () => setEditTitle(true);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await get_single_post({postId});
      if (!response?.success || !response?.post) {
        throw new Error('Post not found');
      }
      return response.post;
    },
  });

  // Sync editable title state whenever fetched post data changes
  useEffect(() => {
    if (post) {
      setPostTitle(post.postTitles || post.postComment || '');
    }
  }, [post]);

  const adminData = post?.adminId || post?.PostCreatorId || {};
  const postImage = post?.postImages;
  const postDate = post?.createdAt;

  const handlePostUpdate = async () => {
    setIsSaving(true);
    try {
      // TODO: replace with update_post from api/update_app_data_apis, not a raw hardcoded-IP call
      const response = await axios.put(
        `http://3.108.26.92:6969/post/update/${postId}`,
        {
          postTitle: postTitle.trim(),
          userId: userData.id,
        },
      );
      if (response.status === 200) {
        Toast.show({type: 'success', text1: 'Post updated successfully'});
        setEdited(false);
        setEditTitle(false);
      } else {
        Toast.show({type: 'error', text1: 'Failed to update post'});
      }
    } catch (error) {
      console.error('Error updating post:', error);
      Toast.show({type: 'error', text1: 'Network error while saving'});
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <NavHeader title={'Post'} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#046A38" />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <NavHeader title={'Post'} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Couldn't load this post.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'Post'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Header: avatar + name + date */}
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(adminData?.email?.[0] || adminData?.name?.[0] || 'A').toUpperCase()}
              </Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.ownerName} numberOfLines={1}>
                {adminData?.name || adminData?.email || 'Admin'}
              </Text>
              <Text style={styles.date}>{timeAgo(postDate)}</Text>
            </View>
            {postAdmin && !editTitle && (
              <TouchableOpacity onPress={handleEditTitle} style={styles.editButton}>
                <PenIcon fill="#046A38" width={20} height={20} />
              </TouchableOpacity>
            )}
          </View>

          {/* Title / Caption */}
          <View style={styles.titleContainer}>
            {editTitle ? (
              <TextInput
                inputMode="text"
                multiline
                autoFocus
                onChangeText={handleTitleValueChange}
                value={postTitle}
                style={styles.inputField}
                placeholder="Write a caption..."
              />
            ) : (
              !!postTitle && <Text style={styles.title}>{postTitle}</Text>
            )}
          </View>

          {/* Image */}
          <Image source={{uri: postImage}} style={styles.image} />

          {/* Save button, only when actively editing */}
          {edited && editTitle && (
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handlePostUpdate}
              disabled={isSaving}>
              {isSaving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#65676B',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    overflow: 'hidden',
    paddingBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#046A38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  ownerName: {
    color: '#050505',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#65676B',
    fontSize: 13,
    marginTop: 2,
  },
  editButton: {
    padding: 6,
  },
  titleContainer: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  title: {
    color: '#050505',
    fontSize: 16,
    lineHeight: 22,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#046A38',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#050505',
    minHeight: 44,
    textAlignVertical: 'top',
  },
  image: {
    width: width - 20,
    height: width - 20,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F2F5',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#046A38',
    borderRadius: 8,
    marginTop: 14,
    marginHorizontal: 14,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
