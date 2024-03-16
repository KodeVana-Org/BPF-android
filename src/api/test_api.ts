import axios from 'axios';

export const test_connection = async (): Promise<any> => {
  try {
    const response = await axios.get('http://13.235.94.196:6969/');
    return response.data;
  } catch (error: any) {
    console.log('Error occurred during checking api:', error.message);
    return error.response.data;
  }
};
