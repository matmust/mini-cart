import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Badge.styles';
import { BadgeProps } from '../../../types';

const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  size = 'medium',
  color = '#FF3B30',
  formatText,
  style,
  testID,
}) => {
  if (count <= 0) return null;

  const displayCount = formatText
    ? formatText(count, maxCount)
    : count > maxCount
    ? `${maxCount}+`
    : count.toString();

  const badgeStyle = [
    styles.badge,
    styles[size],
    { backgroundColor: color },
    style,
  ];

  return (
    <View style={badgeStyle} testID={testID}>
      <Text style={[styles.text, styles[`${size}Text`]]} numberOfLines={1}>
        {displayCount}
      </Text>
    </View>
  );
};

export default Badge;
