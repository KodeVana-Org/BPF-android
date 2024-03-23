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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavHeader from '../../components/Header/NavHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import {get_banners} from '../../api/app_data_apis';
import ApiManager from '../../api/ApiManager';

export default function EditBannerScreen() {
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadBannerMessage, setUploadBannerMessage] =
    useState('Upload new banner');

  // Select photo from library
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
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

  // Pass banner to the server
  // TODO: potential issue retried to upload in catch block
  const uploadBanner = async () => {
    const formData = new FormData();
    formData.append('image', {
      uri: postImageUrl,
      type: 'image/jpeg',
      name: 'bannerImage.jpg',
    });
    try {
      const result = await ApiManager.post('api/upload-hero', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.status === 200) {
        console.log('Banner uploaded successfully!');
        setPostImageUrl(null);
        setShowUploadDialog(false);
        setUploadBannerMessage('Banner uploaded successfully!');
        fetchBanners();
      } else {
        console.log('Banner not uploaded, please try again!');
      }
    } catch (error) {
      for (let i = 1; i < 3; i++) {
        if (postImageUrl != null) {
          const retryResult = await ApiManager.post(
            'api/upload-hero',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );
          if (retryResult.status === 200) {
            console.log('Banner uploaded successfully!');
            setPostImageUrl(null);
            setShowUploadDialog(false);
            setUploadBannerMessage('Banner uploaded successfully!');
            fetchBanners();
            break;
          }
        }
      }
    }
  };

  // fetch banner
  const [getBanners, setGetBanners] = useState([]);
  const fetchBanners = async () => {
    try {
      const response = await get_banners();
      if (response.data) {
        setGetBanners(response.data.image.reverse());
      } else {
        console.error('Banners data not found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchBanners();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
                  style={[styles.formButton, styles.uploadButton]}
                  onPress={uploadBanner}>
                  <Text style={styles.buttonText}>Upload</Text>
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
              data={getBanners}
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
  container: {
    flex: 1,
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
    width: Dimensions.get('window').width - 40,
  },
  bannerImage: {
    height: 350,
    width: '100%',
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
