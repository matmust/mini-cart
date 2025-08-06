import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './CartSummary.styles';
import { useCart } from '../../../hooks';
import { formatPrice, getCartSummary } from '../../../utils';

interface CartSummaryProps {
  testID?: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ testID }) => {
  const { state } = useCart();
  const summary = getCartSummary(state);

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Items ({summary.totalItems}):</Text>
        <Text style={styles.value}>{formatPrice(summary.subtotal)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{formatPrice(summary.finalTotal)}</Text>
      </View>

      {summary.totalSavings > 0 && (
        <View style={styles.row}>
          <Text style={styles.savingsLabel}>Total Savings:</Text>
          <Text style={styles.savingsValue}>
            {formatPrice(summary.totalSavings)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartSummary;
