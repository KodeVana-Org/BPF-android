import {useEffect, useState} from 'react';
import {verify_Token} from '../api/auth_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('AccessToken');
        if (accessToken) {
          const response = await verify_Token({
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching userData:', error);
      }
    };

    setTimeout(() => {
      fetchUserData();
    }, 100);
  }, []);

  return userData;
};

export default useFetchUserData;
