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
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import NavHeader from '../../components/Header/NavHeader';
import ApiManager from '../../api/ApiManager';
import {get_gallery} from '../../api/app_data_apis';

const UploadGalleryScreen = () => {
  const [imageSelectionMessage, setImageSelectionMessage] = useState(
    'No image is selected to upload!',
  );
  const [galleryImageUrl, setGalleryImageUrl] = useState(null);
  const [galleryDesc, setGalleryDesc] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter decription*');
  const [inputFieldColor, setInputFieldColor] = useState('gray');

  // Handle saving gallery description
  const handleGalleryDescInputChange = (text: string) => {
    setGalleryDesc(text.trim());
    setInputFieldColor('gray');
  };

  // Select photo from library
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setGalleryImageUrl(image.path);
    });
  };

  // Handle upload gallery
  const uploadGallery = async () => {
    if (galleryDesc === '') {
      setPlaceholder('Description is required!');
      setInputFieldColor('red');
      return;
    } else {
      const formData = new FormData();
      formData.append('images', {
        uri: galleryImageUrl,
        type: 'image/jpeg',
        name: 'galleryImage.jpg',
      });
      formData.append('descriptions', galleryDesc);
      try {
        const result = await ApiManager.post(
          'youtube/upload-gallery',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (result.status === 200) {
          console.log('Gallery uploaded successfully!');
          setGalleryImageUrl(null);
          setImageSelectionMessage('Gallery uploaded seccessfully!');
          fetchGallery();
        } else {
          console.log('Gallery not uploaded, please try again!');
        }
      } catch (error) {
        for (let i = 1; i < 3; i++) {
          if (galleryImageUrl != null) {
            const retryResult = await ApiManager.post(
              'youtube/upload-gallery',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            if (retryResult.status === 200) {
              console.log('Gallery uploaded successfully!');
              setGalleryImageUrl(null);
              setImageSelectionMessage('Gallery uploaded seccessfully!');
              fetchGallery();
              break;
            }
          }
        }
      }
    }
  };

  // Fetch galley images
  const [gallery, setGallery] = useState([]);
  const fetchGallery = async () => {
    try {
      const response = await get_gallery();
      if (response && response.gallery) {
        setGallery(response.gallery);
      } else {
        console.error('Gallery data not found in response:', response);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle upload cancellation
  const cancelUpload = () => {
    setGalleryImageUrl(null);
  };

  // Refresh control
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchGallery();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.container}>
        <NavHeader title={'Upload gallery'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.uploadPostContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.formContainer}>
            <TextInput
              inputMode="text"
              onChangeText={handleGalleryDescInputChange}
              value={galleryDesc}
              style={[styles.inputField, {borderColor: inputFieldColor}]}
              placeholder={placeholder}
              placeholderTextColor={inputFieldColor}
            />
            {galleryImageUrl ? (
              <Image
                source={{uri: galleryImageUrl}}
                style={styles.galleryImage}
              />
            ) : (
              <Text style={styles.imageSelectionMessage}>
                {imageSelectionMessage}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              {galleryImageUrl ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.formButton, styles.uploadButton]}
                    onPress={uploadGallery}>
                    <Text style={styles.buttonText}>Upload</Text>
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
          {/* Display uploaded images */}
          <View style={styles.galleryContainer}>
            <FlatList
              data={gallery}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              // contentContainerStyle={{paddingRight: horizontal ? 16 : 0}}
              renderItem={({item}) => (
                <View style={styles.postContainer}>
                  <Image
                    source={{uri: item.imageUrl[0]}}
                    style={styles.image}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default UploadGalleryScreen;

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
  galleryImage: {
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
  galleryContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    width: Dimensions.get('window').width - 40,
    marginTop: 30,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    borderRadius: 7,
  },
  text: {
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: 16,
    color: '#000',
  },
});
