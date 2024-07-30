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
} from 'react-native';
import NavHeader from '../../components/Header/NavHeader';
import PenIcon from '../../assets/icons/PenIcon.js';
import {get_single_post} from '../../api/app_data_apis';
import useFetchUserData from '../../data/userData';
// import {update_post} from '../../api/update_app_data_apis.js';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ViewPostScreen = ({route}: any) => {
  const postId = route.params.postId;
  const [postTitle, setPostTitle] = useState('');
  const [postDate, setPostDate] = useState('');
  const [adminData, setAdminData] = useState({});
  const [postImage, setPostImage] = useState('');
  const [editTitle, setEditTitle] = useState(false);
  const [edited, setEdited] = useState(false);
  const {userData, postAdmin} = useFetchUserData();

  // Handle saving title change
  const handleTitleValueChange = (text: string) => {
    setPostTitle(text.trim());
    setEdited(true);
  };

  // Handle edit title
  const handleEditTitle = () => {
    setEditTitle(true);
  };

  // Fetch post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get_single_post({
          postId: postId,
        });
        if (response && response.success && response.post) {
          setPostTitle(response.post.postTitles);
          setPostImage(response.post.postImages);
          setAdminData(response.post.adminId);
          setPostDate(response.post.createdAt);
        } else {
          console.error('Posts data not found in response:', response);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPosts();
  }, [postId]);

  // Update post
  const handlePostUpdate = async () => {
    try {
      // TODO this should be calling update_post
      const response = await axios.put(
        `http://3.108.26.92:6969/post/update/${postId}`,
        {
          postTitle: postTitle,
          userId: userData.id,
        },
      );
      if (response.status === 200) {
        showToast();
        console.log('Post updated successfully:', response);
        setEdited(false);
      } else {
        console.error('Error updating post:', response);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Toast
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Post updated successfully',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader title={'Post'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.postContainer}>
          <Image source={{uri: postImage}} style={styles.image} />
          <View style={styles.titleContainer}>
            {editTitle ? (
              <TextInput
                inputMode="text"
                multiline={true}
                onChangeText={handleTitleValueChange}
                value={postTitle}
                style={[styles.inputField, styles.title]}
              />
            ) : (
              <Text style={styles.title}>{postTitle}</Text>
            )}
            {postAdmin ? (
              <TouchableOpacity onPress={handleEditTitle}>
                <PenIcon fill="#FF671F" width={24} height={24} />
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={styles.owner}>{adminData.name || adminData.email}</Text>
          <Text style={styles.date}>Date: {postDate.substring(0, 10)}</Text>
          {edited && userData.id ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handlePostUpdate}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    height: Dimensions.get('window').width - 40,
    width: Dimensions.get('window').width - 40,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
    justifyContent: 'space-between',
    gap: 5,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  inputField: {
    width: Dimensions.get('window').width - 70,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 7,
    padding: 7,
  },
  owner: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
  },
  date: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#FF671F',
    borderRadius: 10,
    marginTop: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
