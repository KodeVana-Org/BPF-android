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

/////////////////** GET SINGLE POST **//////////////////
interface GetSinglePost {
  postId: any;
}

export const get_single_post = async (data: GetSinglePost): Promise<any> => {
  try {
    const response = await ApiManager.get(`post/get-post/${data.postId}`);
    return response.data;
  } catch (error: any) {
    console.log('Error accessing single post:', error.message);
    return error.response.data;
  }
};

/////////////////** GET ALL GALLERY **//////////////////
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

/////////////////** GET ALL BANNERS **//////////////////
export const get_banners = async (): Promise<any> => {
  try {
    const response = await ApiManager.get('api/all-hero');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing banners:', error.message);
    return error.response.data;
  }
};

///////  REMOVE POST /////
export const remove_post = async (postId: string, userId: string) => {
  try {
    const response = await ApiManager.delete(`post/delete-post/${postId}`, {data: {userId: userId}});
    return response;
  } catch (error: any) {
    console.error('Error deleting post:', error.message);
    return error.response;
  }
};

// create_post
export const create_post = async (formData: FormData) => {
  const response = await ApiManager.post('post/create-post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// create_post
export const create_banner = async (formData: FormData) => {
  const response = await ApiManager.post('api/upload-hero', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
