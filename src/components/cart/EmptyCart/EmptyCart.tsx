import React from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from '../../common';
import { styles } from './EmptyCart.styles';

interface EmptyCartProps {
  onContinueShopping: () => void;
  testID?: string;
}

const EmptyCart: React.FC<EmptyCartProps> = ({
  onContinueShopping,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Icon style={styles.icon} name='cart-shopping' size={48} />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.message}>
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </Text>
      <Button
        title='Start Shopping'
        onPress={onContinueShopping}
        variant='primary'
        size='large'
        testID='start-shopping-button'
      />
    </View>
  );
};

export default EmptyCart;
