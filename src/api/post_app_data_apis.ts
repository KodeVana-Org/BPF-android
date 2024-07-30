import ApiManager from './ApiManager';

// Upload banner images
interface BannerData {
  imageUrl: any;
}

export const upload_banner = async (data: BannerData): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: data.imageUrl,
    });
    const response = await ApiManager.post('api/upload-hero', formData);
    return response.data;
  } catch (error: any) {
    console.log('Error uploading banner:', error.message);
    return error.response.data;
  }
};
