import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './Card.styles';
import { CardProps } from '../../../types';

const Card: React.FC<CardProps> = ({ children, onPress, style, testID }) => {
  const cardStyle = [styles.card, style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        testID={testID}
        accessibilityRole='button'
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

export default Card;
