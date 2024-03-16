import React from 'react';
import {View} from 'react-native';
import HomeIcon from '../../assets/icons/Home.js';
import PostIcon from '../../assets/icons/Gallery.js';
import VideoIcon from '../../assets/icons/Video.js';
import LiveIcon from '../../assets/icons/Live.js';
import UserGroupIcon from '../../assets/icons/Conference.js';

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({route, isFocused}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocused: boolean) => {
    let height: number = 22;
    let width: number = 22;

    switch (route) {
      case 'Home':
        return (
          <HomeIcon
            width={width}
            height={height}
            fill={isFocused ? '#FF671F' : '#a8a8a8'}
          />
        );
      case 'Post':
        return (
          <PostIcon
            width={width}
            height={height}
            fill={isFocused ? '#FF671F' : '#a8a8a8'}
          />
        );
      case 'Video':
        return (
          <VideoIcon
            width={26}
            height={26}
            fill={isFocused ? '#FF671F' : '#a8a8a8'}
          />
        );
      case 'Live':
        return (
          <LiveIcon
            width={width}
            height={height}
            fill={isFocused ? '#FF671F' : '#a8a8a8'}
          />
        );
      case 'Conference':
        return (
          <UserGroupIcon
            width={width}
            height={height}
            fill={isFocused ? '#FF671F' : '#a8a8a8'}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
