// EventIcon.tsx
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const EventIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill={props.color || 'black'} // supports dynamic color
    width={props.size || 24}
    height={props.size || 24}
    {...props}>
    <Path d="M152 64c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H96c-35.3 0-64 28.7-64 64v32h384v-32c0-35.3-28.7-64-64-64h-24V64c0-8.8-7.2-16-16-16s-16 7.2-16 16v32H152V64zM416 208H32v240c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V208z" />
  </Svg>
);

export default EventIcon;
