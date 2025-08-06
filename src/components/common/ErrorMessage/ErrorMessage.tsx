import React from 'react';
import { View, Text } from 'react-native';
import Button from '../Button';
import Icon from '../Icon';
import { styles } from './ErrorMessage.styles';
import { ErrorMessageProps } from '../../../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  showRetry = true,
  style,
  testID = 'error-message',
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.icon}>
        <Icon name='triangle-exclamation' color='#da2323ff' size={48} />
      </Text>
      <Text style={styles.message}>{message}</Text>
      {showRetry && onRetry && (
        <Button
          title='Try Again'
          onPress={onRetry}
          variant='outline'
          size='small'
          testID='retry-button'
        />
      )}
    </View>
  );
};

export default ErrorMessage;
