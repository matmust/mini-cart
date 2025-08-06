import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import {
  LoadingSpinner,
  ErrorMessage,
  Button,
  ProductGallery,
  QuantitySelector,
  CartFeedback,
  Badge,
  Icon,
} from '../../components';
import { useCart, useCartFeedback, useProductDetail } from '../../hooks';
import { calculateDiscountedPrice, formatPrice } from '../../utils';
import { styles } from './ProductDetailScreen.styles';
import { ProductDetailScreenProps } from '../../types';

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const { product, loading, error, refetch } = useProductDetail(productId);
  const { getItemQuantity } = useCart();

  const quantity = product ? getItemQuantity(product.id) : 0;

  const {
    message,
    showFeedback,
    feedbackType,
    addItemWithFeedback,
    hideFeedback,
    increaseQuantityWithFeedback,
    decreaseQuantityWithFeedback,
  } = useCartFeedback();

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Icon key={i} name='star' size={16} color='#FFD700' />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Icon key={i} name='star-half' size={16} color='#FFD700' />);
      } else {
        stars.push(<Icon key={i} name='star' size={16} color='#B0B0B0' />);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner testID='product-detail-loading' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message={error}
          onRetry={refetch}
          testID='product-detail-error'
        />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message='Product not found'
          onRetry={() => navigation.goBack()}
          testID='product-not-found'
        />
      </View>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const isOutOfStock = product.stock === 0;

  return (
    <ScrollView style={styles.container} testID='product-detail-scroll'>
      <ProductGallery images={product.images} testID='product-gallery' />

      {hasDiscount && (
        <View style={styles.badgeContainer}>
          {hasDiscount && (
            <Badge
              count={Math.round(product.discountPercentage)}
              maxCount={99}
              size='medium'
              color='#FF3B30'
              formatText={count => `-${count}% OFF`}
              style={styles.discountBadge}
              testID='product-discount-badge'
            />
          )}
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.brandCategoryContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingPriceContainer}>
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
                <Text style={styles.savings}>
                  You save $
                  {((product.price * product.discountPercentage) / 100).toFixed(
                    2,
                  )}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
            )}
          </View>

          <View style={styles.ratingStockContainer}>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStars}>
                {renderRatingStars(product.rating)}
              </View>
              <Text style={styles.ratingText}>
                ({product.rating.toFixed(1)})
              </Text>
            </View>

            <Text style={[styles.stock, isOutOfStock && styles.outOfStock]}>
              {isOutOfStock ? 'Out of Stock' : `${product.stock} left`}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          {quantity > 0 ? (
            <View style={styles.quantitySection}>
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
                variant='large'
              />
            </View>
          ) : (
            <Button
              title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              onPress={() => {
                addItemWithFeedback(product);
              }}
              variant='primary'
              size='small'
              disabled={isOutOfStock}
              testID='add-to-cart-detail'
            />
          )}
        </View>
      </View>

      <CartFeedback
        visible={showFeedback}
        message={message}
        action={feedbackType}
        onHide={hideFeedback}
      />
    </ScrollView>
  );
};

export default ProductDetailScreen;
