import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CartItem, Product } from '../../../types';
import { Image, Card, Icon } from '../../common';
import QuantitySelector from '../../common/QuantitySelector';
import {
  formatPrice,
  calculateDiscountedPrice,
  calculateItemTotal,
} from '../../../utils';
import { styles } from './CartItem.styles';

interface CartItemComponentProps {
  item: CartItem;
  onIncreaseQuantity: (product: Product) => void;
  onDecreaseQuantity: (product: Product) => void;
  onRemove: () => void;
  testID?: string;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
  testID,
}) => {
  const { product, quantity } = item;

  const hasDiscount = product.discountPercentage > 0;
  const itemPrice = hasDiscount
    ? calculateDiscountedPrice(product.price, product.discountPercentage)
    : formatPrice(product.price);
  const itemTotal = calculateItemTotal(item);

  const handleQuantityIncrease = () => {
    onIncreaseQuantity(product);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onDecreaseQuantity(product);
    } else {
      onRemove();
    }
  };

  return (
    <Card style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            resizeMode='cover'
            testID={`cart-item-image-${product.id}`}
          />
        </View>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {product.title}
            </Text>
            <TouchableOpacity
              onPress={onRemove}
              style={styles.removeButton}
              testID={`remove-item-${product.id}`}
              accessibilityRole='button'
              accessibilityLabel='Remove item from cart'
            >
              <Text style={styles.removeIcon}>
                <Icon name='trash' color='#a5a5a5ff' />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.brand}>{product.brand}</Text>
            {product.stock <= 5 && product.stock > 0 && (
              <Text style={styles.lowStock}>Only {product.stock} left!</Text>
            )}
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              {hasDiscount ? (
                <>
                  <Text style={styles.originalPrice}>
                    {formatPrice(product.price)}
                  </Text>
                  <Text style={styles.discountedPrice}>{itemPrice}</Text>
                  <Text style={styles.savings}>
                    Save {Math.round(product.discountPercentage)}%
                  </Text>
                </>
              ) : (
                <Text style={styles.price}>{itemPrice}</Text>
              )}
            </View>

            <View style={styles.quantityContainer}>
              <QuantitySelector
                quantity={quantity}
                onIncrease={handleQuantityIncrease}
                onDecrease={handleQuantityDecrease}
                min={0}
                max={product.stock}
              />
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>{formatPrice(itemTotal)}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default CartItemComponent;
