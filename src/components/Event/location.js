// components/icons/LocationPinIcon.js
import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const LocationPinIcon = ({width = 24, height = 24, color = '#FF3B30'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="9" r="2.5" fill={color} />
  </Svg>
);

export default LocationPinIcon;
