import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { styles } from './Button.styles';
import { ButtonProps } from '../../../types';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  testID,
}) => {
  const buttonStyle = [
    styles.base,
    variant === 'text' ? styles.textVariant : styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole='button'
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
    >
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size='small'
            color={variant === 'primary' ? '#fff' : '#007AFF'}
            style={styles.spinner}
            testID={testID ? `${testID}-loading` : 'button-loading'}
          />
        )}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
