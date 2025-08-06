import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../../hooks';
import { Badge, Icon } from '../../common';
import { styles } from './CartHeaderButton.styles';

const CartHeaderButton: React.FC = () => {
  const navigation = useNavigation();
  const { state } = useCart();

  const handlePress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      testID='cart-header-button'
    >
      <View>
        <Icon name='cart-shopping' color='#a5a5a5ff' />
        <Badge
          count={state.totalItems}
          maxCount={99}
          style={styles.badge}
          testID='cart-badge'
        />
      </View>
    </TouchableOpacity>
  );
};

export default CartHeaderButton;
