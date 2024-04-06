import ApiManager from './ApiManager';

// Upload banner images
interface JoinData {
  id: string;
  name: string;
  gender: string;
  fatherName: string;
  villTown: string;
  po: string;
  ps: string;
  district: string;
}

export const join_bpf = async (data: JoinData): Promise<any> => {
  console.log(data);
  try {
    const response = await ApiManager.post('user/join', data);
    return response.data;
  } catch (error: any) {
    console.log('Error joining user:', error.message);
    return error.response.data;
  }
};
