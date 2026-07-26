import ApiManager from "./ApiManager";

interface JoinData {
  id: string;
  name: string;
  gender: string;
  fatherName: string;
  villTown: string;
  po: string;
  ps: string;
  district: string;
  email: string;
  phone: string;
}

export const join_bpf = async (data: JoinData): Promise<any> => {
  try {
    const response = await ApiManager.post('user/join', data);
    return response.data; // Return just `data`, not the whole response object
  } catch (error: any) {
    console.log('Error joining user:', error.message);
    throw error.response?.data || new Error('Join failed');
  }
};

export const check_join_status = async() => {
    const response = await ApiManager.get("setting/check/join");
    return response.data;
}

export const wakeServer = async() => {
    try {
        const response = await ApiManager.get("setting/check/join");
        return response.data;
    } catch (error) {
        // Fail silently in the background if the server is still waking up
        console.log('Server waking up...');
    }
}
