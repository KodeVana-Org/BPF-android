import {useEffect, useState} from 'react';
import {verify_Token} from '../api/auth_apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchUserData = () => {
  const [userData, setUserData] = useState({});
  const [superAdmin, setSuperAdmin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [postAdmin, setPostAdmin] = useState(false);
  const [member, setMember] = useState(false);
  const [conferenceAccess, setConferenceAccess] = useState(false);
  const [myId, setMyId] = useState('');
  const [myServerId, setMyServerId] = useState('');

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

  // Check user type
  useEffect(() => {
    setMyId(userData.userId);
    setMyServerId(userData.id);
    if (userData.userType) {
      if (userData.userType === 'superAdmin') {
        setSuperAdmin(true);
        setAdmin(true);
        setPostAdmin(true);
        setMember(true);
        setConferenceAccess(true);
      } else if (userData.userType === 'admin') {
        setSuperAdmin(false);
        setAdmin(true);
        setPostAdmin(true);
        setMember(true);
        setConferenceAccess(true);
      } else if (userData.userType === 'post-admin') {
        setSuperAdmin(false);
        setAdmin(false);
        setPostAdmin(true);
        setMember(true);
        setConferenceAccess(false);
      } else if (userData.userType === 'member') {
        setSuperAdmin(false);
        setAdmin(false);
        setPostAdmin(false);
        setMember(true);
        setConferenceAccess(true);
      } else {
        setSuperAdmin(false);
        setAdmin(false);
        setPostAdmin(false);
        setMember(false);
        setConferenceAccess(false);
      }
    }
  }, [userData]);

  return {
    userData,
    superAdmin,
    admin,
    postAdmin,
    member,
    conferenceAccess,
    myId,
    myServerId,
  };
};

export default useFetchUserData;
