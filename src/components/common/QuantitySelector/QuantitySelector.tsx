import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './QuantitySelector.styles';
import { QuantitySelectorProps } from '../../../types';

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max = 999,
  variant = 'small',
  testID = 'quantity-selector',
}) => {
  const canDecrease = quantity > min;
  const canIncrease = quantity < max;

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={[
          styles.button,
          styles[`${variant}Button`],
          !canDecrease && styles.buttonDisabled,
        ]}
        onPress={onDecrease}
        disabled={!canDecrease}
        testID='quantity-decrease'
        accessibilityRole='button'
        accessibilityLabel='Decrease quantity'
      >
        <Text
          style={[styles.buttonText, !canDecrease && styles.buttonTextDisabled]}
        >
          -
        </Text>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText} testID='quantity-value'>
          {quantity}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          styles[`${variant}Button`],
          !canIncrease && styles.buttonDisabled,
        ]}
        onPress={onIncrease}
        disabled={!canIncrease}
        testID='quantity-increase'
        accessibilityRole='button'
        accessibilityLabel='Increase quantity'
      >
        <Text
          style={[styles.buttonText, !canIncrease && styles.buttonTextDisabled]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
