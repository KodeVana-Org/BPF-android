import axios from 'axios';
import ApiManager from './ApiManager';

/////////////////** GET ALL POSTS **//////////////////

// export const get_posts = async (): Promise<any> => {
//   try {
//     // const response = await ApiManager.get('post/get-all-post');
//     const response = await ApiManager.get('post/get-posts');
//     return response.data;
//   } catch (error: any) {
//     console.log('Error occurred during accessing post:', error.message);
//     return error.response.data;
//   }
// };

export const get_posts = async ({ cursor }: { cursor?: string | null } = {}) => {
  try {
    const res = await ApiManager.get('/post/get-posts', {
      params: { limit: 10, cursor: cursor || undefined },
    });
    return res.data;
  } catch (error: any) {
    console.log('Error fetching posts:', error?.message);
    throw error;
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
// export const get_gallery = async (): Promise<any> => {
//   try {
//     const response = await ApiManager.get('youtube/get-gallery');
//     return response.data;
//   } catch (error: any) {
//     console.log('Error occurred during accessing gallery:', error.message);
//     return error.response.data;
//   }
// };

export interface GalleryItem {
  _id: string;
  imageUrl: string[];
  descriptions: string;
  __v: number;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: {
    gallery: GalleryItem[];
    pagination: {
      limit: number;
      hasMore: boolean;
      nextCursor: string | null;
    };
  };
}
export const get_gallery = async ({
  cursor,
  limit = 10,
}: {
  cursor?: string;
  limit?: number;
}) => {
  try {
    const response = await ApiManager.get('youtube/get-gallery', {
      params: {
        limit,
        ...(cursor && { cursor }),
      },
    });
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during accessing gallery:', error.message);
    throw error; // Throw so TanStack Query can catch errors properly
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
    const response = await ApiManager.delete(`post/delete-post/${postId}`, { data: { userId: userId } });
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

// update-user
export const update_user_details = async (userId, data) => {
  const response = await ApiManager.post(`user/update-details/${userId}`, data);
  return response.data;
};

// update-profile pic
export const update_user_profile = async (userId, data) => {
  const response = await ApiManager.post(
    `user/update-profile/${userId}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

// update postTitles 
export const update_post_titles = async (postId: string, postComment: string) => {
  const response = await ApiManager.patch(`post/updateTitles/${postId}`, {
    postComment: postComment,
  });
  return response.data;
};
