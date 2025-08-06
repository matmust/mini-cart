import type { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartContextValue {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}
