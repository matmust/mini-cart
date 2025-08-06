import { useContext } from 'react';
import { CartContext } from '../context';
import { CartContextValue } from '../types';

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
