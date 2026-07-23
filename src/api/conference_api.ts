import ApiManager from './ApiManager';

// Create new room
interface CreateRoomData {
  roomName: any;
  userId: any;
}

export const create_room = async (data: CreateRoomData): Promise<any> => {
  try {
    const response = await ApiManager.post(`api/create-room/${data.userId}`, {
      channelName: data.roomName,
    });
    return response.data;
  } catch (error: any) {
    console.log('Error creating room:', error.message);
    return error.response.data;
  }
};

// Join room
interface JoinRoomData {
  roomName: any;
  userId: any;
}

export const join_room = async (data: JoinRoomData): Promise<any> => {
  try {
    const response = await ApiManager.post(`api/join-room/${data.userId}`, {
      channelName: data.roomName,
    });
    return response.data;
  } catch (error: any) {
    console.log('Error joining room:', error.message);
    return error.response.data;
  }
};

// Leave room
interface LeaveRoomData {
  roomName: any;
  userId: any;
}

export const leave_room = async (data: LeaveRoomData): Promise<any> => {
  try {
    const response = await ApiManager.post(`api/leave-room/${data.userId}`, {
      channelName: data.roomName,
    });
    return response.data;
  } catch (error: any) {
    console.log('Error leaving room:', error.message);
    return error.response.data;
  }
};
