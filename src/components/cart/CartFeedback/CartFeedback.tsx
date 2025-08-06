import React, { useEffect, useRef } from 'react';
import { Text, Animated } from 'react-native';
import { styles } from './CartFeedback.styles';
import { Icon } from '../../common';
import { CartFeedbackAction } from '../../../types';

interface CartFeedbackProps {
  visible: boolean;
  message: string | null;
  action: CartFeedbackAction;
  onHide: () => void;
}

const CartFeedback: React.FC<CartFeedbackProps> = ({
  visible,
  message,
  action,
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible && message) {
      const hideNotification = () => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide();
        });
      };

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideNotification();
      }, 2000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [visible, message, fadeAnim, slideAnim, onHide]);

  if (!visible || !message) {
    return null;
  }

  const getIcon = () => {
    switch (action) {
      case 'added':
        return (
          <Icon name='check' color='#28a745' size={24} testID='icon-added' />
        );
      case 'removed':
        return (
          <Icon
            name='trash'
            color='#a5a5a5ff'
            size={24}
            testID='icon-removed'
          />
        );
      case 'updated':
        return (
          <Icon name='rotate' color='#007bff' size={24} testID='icon-updated' />
        );
      default:
        return (
          <Icon
            name='cart-shopping'
            color='#6c757d'
            size={24}
            testID='icon-default'
          />
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      testID='cart-feedback'
    >
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default CartFeedback;
