import ApiManager from './ApiManager';

/////////////////** GET ALL POSTS **//////////////////
export const get_posts = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('post/get-all-post');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing post:', error.message);
    return error.response.data;
  }
};

/////////////////** GET ALL POSTS **//////////////////
export const get_gallery = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('youtube/get-gallery');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing gallery:', error.message);
    return error.response.data;
  }
};

/////////////////** GET ALL ACHIEVEMENT **//////////////////
export const get_achievements = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('achv/get-achive');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing gallery:', error.message);
    return error.response.data;
  }
};
