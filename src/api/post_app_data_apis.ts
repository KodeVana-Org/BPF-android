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
    console.log("This is me heeo I'm under the water", {formData});
    const response = await ApiManager.post('api/upload-hero', formData);
    return response.data;
  } catch (error: any) {
    console.log('Error uploading banner:', error.message);
    return error.response.data;
  }
};

// import ApiManager from './ApiManager';

// // Upload banner images
// interface BannerData {
//   image: any;
// }

// export const upload_banner = async (data: BannerData): Promise<any> => {
//   try {
//     const response = await ApiManager.post('api/upload-hero', data);
//     return response.data;
//   } catch (error: any) {
//     console.log('Error uploading banner:', error.message);
//     return error.response.data;
//   }
// };
