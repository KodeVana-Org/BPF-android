import ApiManager from './ApiManager';

// Update post
interface UpdatePostData {
  title: string;
  postID: string;
  userID: string;
}

export const update_post = async (data: UpdatePostData): Promise<any> => {
  try {
    const response = await ApiManager.put(`post/update-post/${data.postID}`, {
      postTitle: data.title,
      userId: data.userID,
    });
    return response.data;
  } catch (error: any) {
    console.log('Error updating post:', error.message);
    return error.response.data;
  }
};

// Update User data
interface UpdateUserData {
  userDPUrl: any;
  adminID: string;
  userID: string;
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  gender: string | null;
  postOffice: string;
  policeStation: string;
  position: string | null;
  district: string;
  memberType: string;
  ipAddress: string;
  editTime: string;
}

export const update_user = async (data: UpdateUserData): Promise<any> => {
  console.log('DISTRICT: ', data.district);
  const formData = new FormData();
  formData.append('img', {
    uri: data.userDPUrl,
    type: 'image/jpeg',
    name: 'galleryImage.jpg',
  });
  formData.append('superAdId', data.adminID);
  formData.append('name', data.name);
  formData.append('fatherName', data.fatherName);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('gender', data.gender);
  formData.append('po', data.postOffice);
  formData.append('ps', data.policeStation);
  formData.append('position', data.position);
  formData.append('district', data.district);
  formData.append('ip', data.ipAddress);
  formData.append('memberType', data.memberType);
  formData.append('TimeDate', data.editTime);

  try {
    const response = await ApiManager.patch(
      `admin/update-user/${data.userID}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error) {
      const response = await ApiManager.patch(
        `admin/update-user/${data.userID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    }
    console.log('Error updating user:', error.message);
    return error.response.data;
  }
};
