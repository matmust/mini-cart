import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './LoadingSpinner.styles';
import { LoadingSpinnerProps } from '../../../types';
import { colors } from '../../../constants';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.primary,
  style,
  testID = 'loading-spinner',
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
