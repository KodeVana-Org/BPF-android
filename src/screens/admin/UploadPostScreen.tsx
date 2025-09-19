import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import NavHeader from '../../components/Header/NavHeader';
import ApiManager from '../../api/ApiManager';
import useFetchUserData from '../../data/userData';
import Toast from 'react-native-toast-message';
import { create_post } from '../../api/app_data_apis';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const UploadPostScreen = () => {
  const [imageSelectionMessage, setImageSelectionMessage] = useState(
    'No image is selected to upload!',
  );
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter post title*');
  const [inputFieldColor, setInputFieldColor] = useState('gray');
  const [isUploading, setIsUploading] = useState(false)
  const userData = useFetchUserData();
  const userID = userData.myServerId

const queryClient = useQueryClient();

const { mutate: createPost, isPending: isCreating } = useMutation({
  mutationFn: create_post,
  onSuccess: () => {
    Toast.hide();
    Toast.show({
      type: 'success',
      text1: 'Post uploaded successfully',
    });

    // Reset form state
    setPostTitle('');
    setPostImageUrl(null);
    setImageSelectionMessage('Post uploaded successfully!');

    // Refetch posts
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
  onError: () => {
    Toast.hide();
    Toast.show({
      type: 'error',
      text1: 'Upload failed',
      text2: 'Check your network and try again.',
    });
  },
});
  // Handle saving post title
  const handlePostTitleInputChange = (text: string) => {
    setPostTitle(text.trim());
    setInputFieldColor('gray');
  };

  // Select photo from library
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setPostImageUrl(image.path);
    });
  };

// Handle upload post
const handleCreatePost = () => {
  if (postTitle === '') {
    setPlaceholder('Title is required!');
    setInputFieldColor('red');
    return;
  }

  Toast.show({
    type: 'info',
    text1: 'Uploading...',
    autoHide: false,
  });

  const formData = new FormData();
  formData.append('postImage', {
    uri: postImageUrl,
    type: 'image/jpeg',
    name: 'postImage.jpg',
  });
  formData.append('postTitle', postTitle);
  formData.append('userId', userID);

  createPost(formData);
};

  // Handle upload cancellation
  const cancelUpload = () => {
    setPostImageUrl(null);
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.container}>
        <NavHeader title={'Upload new post'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.uploadPostContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.formContainer}>
            <TextInput
              inputMode="text"
              onChangeText={handlePostTitleInputChange}
              value={postTitle}
              style={[styles.inputField, {borderColor: inputFieldColor}]}
              placeholder={placeholder}
              placeholderTextColor={inputFieldColor}
            />
            {postImageUrl ? (
              <Image source={{uri: postImageUrl}} style={styles.postImage} />
            ) : (
              <Text style={styles.imageSelectionMessage}>
                {imageSelectionMessage}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              {postImageUrl ? (
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.uploadButton,
                    { opacity: isUploading ? 0.5 : 1 },
                  ]}
                  onPress={handleCreatePost}
                  disabled={isCreating} // disable while uploading
                >
                  <Text style={styles.buttonText}>
                    {isCreating ? 'Uploading...' : 'Upload'}
                  </Text>
                </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.formButton, styles.cancelButton]}
                    onPress={cancelUpload}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={openImagePicker}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default UploadPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadPostContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1,
    borderWidth: 0.2,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  inputField: {
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '400',
    color: 'gray',
    width: '100%',
    marginBottom: 20,
  },
  imageSelectionMessage: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 40,
  },
  postImage: {
    borderRadius: 10,
    height: Dimensions.get('window').width - 65,
    width: Dimensions.get('window').width - 65,
  },
  formButton: {
    paddingHorizontal: 30,
  },
  uploadButton: {
    backgroundColor: '#046A38',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FF671F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 20,
    flex: 1,
    gap: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FF671F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#FFF',
  },
});
