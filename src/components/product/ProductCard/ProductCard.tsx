import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './ProductCard.styles';
import {
  Card,
  Image,
  Button,
  Badge,
  Icon,
  QuantitySelector,
} from '../../common';
import { useCart, useCartFeedback } from '../../../hooks';
import { CartFeedback } from '../../cart';
import { calculateDiscountedPrice, formatPrice } from '../../../utils';
import { ProductCardProps } from '../../../types';

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { getItemQuantity } = useCart();
  const {
    message,
    showFeedback,
    feedbackType,
    addItemWithFeedback,
    hideFeedback,
    increaseQuantityWithFeedback,
    decreaseQuantityWithFeedback,
  } = useCartFeedback();

  const quantity = getItemQuantity(product.id);

  const hasDiscount = product.discountPercentage > 0;
  const isOutOfStock = product.stock === 0;

  return (
    <>
      <Card
        style={styles.card}
        onPress={() => {
          onPress(product);
        }}
        testID={`product-card-${product.id}`}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.image}
            resizeMode='cover'
            testID={`product-image-${product.id}`}
          />
          {hasDiscount && (
            <Badge
              count={Math.round(product.discountPercentage)}
              maxCount={99}
              size='small'
              color='#FF3B30'
              formatText={count => `-${count}%`}
              style={styles.discountBadge}
              testID={`discount-badge-${product.id}`}
            />
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.priceContainer}>
            {hasDiscount ? (
              <>
                <Text style={styles.originalPrice}>
                  {formatPrice(product.price)}
                </Text>
                <Text style={styles.discountedPrice}>
                  {calculateDiscountedPrice(
                    product.price,
                    product.discountPercentage,
                  )}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              <Icon name='star' size={16} color='#FFD700' />
              <Text>{product.rating.toFixed(1)}</Text>
            </Text>
            <Text style={[styles.stock, isOutOfStock && styles.outOfStock]}>
              {isOutOfStock ? 'Out of stock' : `${product.stock} left`}
            </Text>
          </View>

          {quantity > 0 ? (
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => {
                increaseQuantityWithFeedback(product);
              }}
              onDecrease={() => {
                decreaseQuantityWithFeedback(product);
              }}
              min={0}
              max={product.stock}
            />
          ) : (
            <Button
              title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              onPress={() => {
                addItemWithFeedback(product);
              }}
              variant='primary'
              size='small'
              disabled={isOutOfStock}
              testID={`add-to-cart-${product.id}`}
            />
          )}
        </View>
      </Card>

      <CartFeedback
        visible={showFeedback}
        message={message}
        action={feedbackType}
        onHide={hideFeedback}
      />
    </>
  );
};

export default ProductCard;
