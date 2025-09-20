import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verify_Token } from '../api/auth_apis';

const useFetchUserData = () => {
  const {
    data: userData = {}, // fallback to empty object
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const accessToken = await AsyncStorage.getItem('AccessToken');
      if (!accessToken) throw new Error('No access token found');

      const response = await verify_Token({
        Authorization: `Bearer ${accessToken}`,
      });

      return response?.data || {};
    },
    staleTime: 1000 * 60 * 5, // 5 mins
    cacheTime: 1000 * 60 * 10,
  });

  // Set access levels based on userType
  const userType = userData?.userType;
  const superAdmin = userType === 'superAdmin';
  const admin = superAdmin || userType === 'admin';
  const postAdmin = admin || userType === 'post-admin';
  const member = postAdmin || userType === 'member';
  const conferenceAccess = superAdmin || admin || userType === 'member';

  return {
    userData,
    isLoading,
    error,
    superAdmin,
    admin,
    postAdmin,
    member,
    conferenceAccess,
    myId: userData?.userId,
    myServerId: userData?.id,
  };
};

export default useFetchUserData;

