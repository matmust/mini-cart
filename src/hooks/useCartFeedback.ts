import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useCart } from './useCart';
import { Product, CartFeedbackAction } from '../types';


interface UseCartFeedbackReturn {
  message: string | null;
  showFeedback: boolean;
  feedbackType: CartFeedbackAction;
  addItemWithFeedback: (product: Product | null) => void;
  increaseQuantityWithFeedback: (product: Product | null) => void;
  decreaseQuantityWithFeedback: (product: Product | null) => void;
  removeItemWithFeedback: (productId: number) => Promise<boolean>;
  clearCartWithFeedback: () => Promise<boolean>;
  hideFeedback: () => void;
  showSuccessFeedback: (action: CartFeedbackAction, message: string) => void;
}

export const useCartFeedback = (): UseCartFeedbackReturn => {
  const {
    state,
    addItem,
    clearCart,
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<CartFeedbackAction>('added');
  const [message, setMessage] = useState<string | null>(null);

  const hideFeedback = useCallback(() => {
    setShowFeedback(false);
    setMessage(null);
  }, []);

  const showSuccessFeedback = useCallback(
    (action: CartFeedbackAction, feedbackMessage: string) => {
      setFeedbackType(action);
      setMessage(feedbackMessage);
      setShowFeedback(true);
    },
    [],
  );

  const addItemWithFeedback = useCallback(
    (product: Product | null): void => {
      if (!product) return;

      if (product.stock <= 0) {
        showSuccessFeedback('error', 'Product is out of stock');
        return;
      }

      const currentQuantity = getItemQuantity(product.id);
      if (currentQuantity >= product.stock) {
        showSuccessFeedback(
          'error',
          'Cannot add more items. Stock limit reached.',
        );
        return;
      }

      addItem(product);
      showSuccessFeedback('added', `Added ${product.title} to cart`);
    },
    [addItem, getItemQuantity, showSuccessFeedback],
  );

  const increaseQuantityWithFeedback = useCallback(
    (product: Product | null) => {
      if (!product) return;

      const currentQuantity = getItemQuantity(product.id);

      if (currentQuantity >= product.stock) {
        showSuccessFeedback(
          'error',
          'Cannot add more items. Stock limit reached.',
        );
        return;
      }

      increaseQuantity(product);
      showSuccessFeedback('updated', `Increased quantity of ${product.title}`);
    },
    [increaseQuantity, getItemQuantity, showSuccessFeedback],
  );

  const decreaseQuantityWithFeedback = useCallback(
    (product: Product | null) => {
      if (!product) return;

      const currentQuantity = getItemQuantity(product.id);

      if (currentQuantity <= 0) {
        showSuccessFeedback(
          'error',
          'Cannot decrease quantity. Minimum reached.',
        );
        return;
      }

      decreaseQuantity(product);
      showSuccessFeedback('updated', `Decreased quantity of ${product.title}`);
    },
    [decreaseQuantity, getItemQuantity, showSuccessFeedback],
  );

  const removeItemWithFeedback = useCallback(
    (productId: number): Promise<boolean> => {
      return new Promise(resolve => {
        const item = state.items.find(
          cartItem => cartItem.product.id === productId,
        );
        const productTitle = item ? item.product.title : null;
        if (!item || !productTitle) {
          removeItem(productId);
          resolve(true);
          return;
        }

        Alert.alert('Remove Item', `Remove "${productTitle}" from your cart?`, [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              removeItem(productId);
              showSuccessFeedback(
                'removed',
                `Removed ${productTitle} from cart`,
              );
              resolve(true);
            },
          },
        ]);
      });
    },
    [removeItem, showSuccessFeedback, state.items],
  );

  const clearCartWithFeedback = useCallback((): Promise<boolean> => {
    return new Promise(resolve => {
      if (state.items.length === 0) {
        resolve(true);
        return;
      }

      Alert.alert(
        'Clear Cart',
        'Are you sure you want to remove all items from your cart?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Clear All',
            style: 'destructive',
            onPress: () => {
              clearCart();
              showSuccessFeedback('removed', 'All items removed from cart');
              resolve(true);
            },
          },
        ],
      );
    });
  }, [state.items.length, clearCart, showSuccessFeedback]);

  return {
    message,
    showFeedback,
    feedbackType,
    addItemWithFeedback,
    increaseQuantityWithFeedback,
    decreaseQuantityWithFeedback,
    removeItemWithFeedback,
    clearCartWithFeedback,
    hideFeedback,
    showSuccessFeedback,
  };
};
