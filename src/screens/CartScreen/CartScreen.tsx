import React, { useCallback } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import {
  Button,
  CartFeedback,
  CartItemComponent,
  CartSummary,
  EmptyCart,
} from '../../components';
import { useCart, useCartFeedback } from '../../hooks';
import { CartItem, CartScreenProps } from '../../types';
import { styles } from './CartScreen.styles';

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { state } = useCart();
  const {
    message,
    feedbackType,
    showFeedback,
    hideFeedback,
    increaseQuantityWithFeedback,
    decreaseQuantityWithFeedback,
    removeItemWithFeedback,
    clearCartWithFeedback,
  } = useCartFeedback();

  const handleContinueShopping = useCallback(() => {
    navigation.navigate('ProductList');
  }, [navigation]);

  const renderCartItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartItemComponent
        item={item}
        onIncreaseQuantity={() => {
          increaseQuantityWithFeedback(item.product);
        }}
        onDecreaseQuantity={() => {
          decreaseQuantityWithFeedback(item.product);
        }}
        onRemove={() => {
          removeItemWithFeedback(item.product.id);
        }}
        testID={`cart-item-${item.product.id}`}
      />
    ),
    [
      increaseQuantityWithFeedback,
      decreaseQuantityWithFeedback,
      removeItemWithFeedback,
    ],
  );

  const renderEmptyCart = useCallback(
    () => <EmptyCart onContinueShopping={handleContinueShopping} />,
    [handleContinueShopping],
  );

  const renderListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        {state.items.length > 0 && (
          <TouchableOpacity
            onPress={clearCartWithFeedback}
            testID='clear-cart-button'
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
    ),
    [state.items.length, clearCartWithFeedback],
  );

  const renderListFooter = useCallback(() => {
    if (state.items.length === 0) {
      return null;
    }

    return (
      <View style={styles.footer}>
        <CartSummary />
        <View style={styles.buttonContainer}>
          <Button
            title='Continue Shopping'
            onPress={handleContinueShopping}
            variant='outline'
            size='medium'
            style={styles.continueButton}
            testID='continue-shopping-button'
          />
          <Button
            title='Proceed to Checkout'
            onPress={() => {
              Alert.alert(
                'Checkout',
                'Checkout functionality will be implemented in future releases.',
                [{ text: 'OK' }],
              );
            }}
            variant='primary'
            size='medium'
            style={styles.checkoutButton}
            testID='checkout-button'
          />
        </View>
      </View>
    );
  }, [state, handleContinueShopping]);

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        renderItem={renderCartItem}
        keyExtractor={item => item.product.id.toString()}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        ListEmptyComponent={renderEmptyCart}
        contentContainerStyle={
          state.items.length === 0 ? styles.emptyContainer : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        testID='cart-list'
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
      />
      <CartFeedback
        visible={showFeedback}
        message={message}
        action={feedbackType}
        onHide={hideFeedback}
      />
    </View>
  );
};

export default CartScreen;
