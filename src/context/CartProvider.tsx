import React, { useReducer, useCallback } from 'react';
import { CartContext } from './CartContext';
import { cartReducer, initialCartState } from './CartReducer';
import { CartContextValue, Product } from '../types';

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const increaseQuantity = useCallback((product: Product) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: product });
  }, []);

  const decreaseQuantity = useCallback((product: Product) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: product });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getItemQuantity = useCallback(
    (productId: number): number => {
      const item = state.items.find(
        cartItem => cartItem.product.id === productId,
      );
      return item ? item.quantity : 0;
    },
    [state.items],
  );

  const contextValue: CartContextValue = {
    state,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
