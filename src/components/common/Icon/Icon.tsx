import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../../constants';
import { IconProps } from '../../../types';

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.text,
  style,
  testID,
}) => {
  return (
    <FontAwesome6
      name={name}
      size={size}
      color={color}
      style={style}
      testID={testID}
    />
  );
};

export default Icon;
