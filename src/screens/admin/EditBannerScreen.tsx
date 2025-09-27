import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import {create_banner, get_banners} from '../../api/app_data_apis';
import {removeBanner} from '../../api/auth_apis';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function EditBannerScreen() {
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadBannerMessage, setUploadBannerMessage] =
    useState('Upload new banner');
  const [removingBannerId, setRemovingBannerId] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: bannerData,
    isLoading: isBannerLoading,
    isError,
  } = useQuery({
    queryKey: ['banner'],
    queryFn: get_banners,
  });

  const banners = bannerData?.data?.image?.slice()?.reverse() || [];

  // Toast
  const showToast = (type = 'success', text = '') => {
    Toast.show({
      type,
      text1: text,
    });
  };

  const {mutate: createBanner, isPending: isCreating} = useMutation({
    mutationFn: create_banner,
    onSuccess: () => {
      Toast.hide();
      Toast.show({
        type: 'success',
        text1: 'Banner uploaded successfully',
      });

      // Reset form state
      setPostImageUrl(null);
      setShowUploadDialog(false);
      setUploadBannerMessage('Banner uploaded successfully!');

      // Refetch posts
      queryClient.invalidateQueries({queryKey: ['banner']});
    },
    onError: () => {
      Toast.hide();
      Toast.show({
        type: 'error',
        text1: 'Upload failed',
        text2: 'Check your network and try again.',
      });
      console.error('Upload error:', isError);
      showToast('error', 'Something went wrong. Try again later.');
    },
  });

  const removeBannerMutation = useMutation({
    mutationFn: (id: string) => removeBanner(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey: ['banner']});
      Toast.show({
        type: 'success',
        text1: 'Banner deleted successfully',
      });
    },
    onError: error => {
      console.error('Unexpected error removing banner:', error);
      showToast('error', 'Banner deletion failed');
    },
  });

  // Select photo from library
  const openImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 1,
      mediaType: 'photo',
    }).then(image => {
      setPostImageUrl(image.path);
      setShowUploadDialog(true);
    });
  };

  // Handle upload cancellation
  const cancelUpload = () => {
    setPostImageUrl(null);
    setShowUploadDialog(false);
  };

  const uploadBanner = async () => {
    if (!postImageUrl) return;

    setIsUploading(true);

    const uri = postImageUrl.startsWith('file://')
      ? postImageUrl
      : `file://${postImageUrl}`;

    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'bannerImage.jpg',
    });

    try {
      await createBanner(formData);
    } catch (err) {
      console.log('Upload error:', err?.response || err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBanner = (item: any) => {
    const id = item._id;
    setRemovingBannerId(id);
    removeBannerMutation.mutate(id, {
      onSettled: () => setRemovingBannerId(null),
    });
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.invalidateQueries({queryKey: ['banner']});
    setRefreshing(false);
  }, [queryClient]);

  if (isBannerLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }
  if (isError) {
    return <Text>Error loading banners</Text>;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <Animated.View style={styles.container}>
        <NavHeader title={'Edit banner'} />
        {/* Body container */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.editBannerContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* Upload banner form */}
          {showUploadDialog ? (
            <View style={styles.formContainer}>
              <Image source={{uri: postImageUrl}} style={styles.postImage} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.formButton,
                    styles.uploadButton,
                    isCreating && styles.disabledButton,
                  ]}
                  onPress={uploadBanner}
                  disabled={isCreating}>
                  {isCreating ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Upload</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={cancelUpload}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.uploadBannerMessage}>
                {uploadBannerMessage}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={openImagePicker}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Select image</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* Display current banner images */}
          <View style={styles.bannerContainer}>
            <FlatList
              data={banners}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.bannerList}
              renderItem={({item}) => (
                <View style={styles.flatList}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {/* {item.uploadedBy} */}
                      Tamulpur Goibari
                    </Text>
                  </View>
                  <Image
                    source={{uri: item.ImageUrl}}
                    style={styles.bannerImage}
                  />
                  {/* 🛑 Remove Button Overlaid on Image */}
                  <TouchableOpacity
                    style={[
                      styles.removeButton,
                      removingBannerId === item._id && styles.disabledButton,
                    ]}
                    onPress={() => handleRemoveBanner(item)}
                    disabled={removingBannerId === item._id}>
                    {removingBannerId === item._id ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text style={styles.removeButtonText}>Remove</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // optional for visibility
  },
  container: {
    flex: 1,
  },

  disabledButton: {
    opacity: 0.6,
  },

  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 5,
  },

  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  editBannerContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1,
    borderWidth: 0.2,
    padding: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  postImage: {
    borderRadius: 10,
    height: 300,
    width: '100%',
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
    paddingTop: 30,
    flex: 1,
    gap: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBannerMessage: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 10,
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
  bannerList: {
    paddingVertical: 20,
  },
  bannerContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: Dimensions.get('window').width - 20,
  },
  bannerImage: {
    height: Dimensions.get('window').width - 40,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
});
