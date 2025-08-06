import { CartState, CartAction, CartItem } from '../types';
import { calculateCartTotal } from '../utils';

export const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (
  items: CartItem[],
): Pick<CartState, 'totalItems' | 'totalPrice'> => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = calculateCartTotal(items);

  return {
    totalItems,
    totalPrice,
  };
};

const findItemIndex = (items: CartItem[], productId: number): number => {
  return items.findIndex(item => item.product.id === productId);
};

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItemIndex = findItemIndex(state.items, product.id);

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newItems = [...state.items, { product, quantity: 1 }];
      }

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    }

    case 'REMOVE_ITEM': {
      const productId = action.payload;
      const newItems = state.items.filter(
        item => item.product.id !== productId,
      );
      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    }

    case 'INCREASE_QUANTITY': {
      const product = action.payload;

      const currentItem = state.items.find(
        item => item.product.id === product.id,
      );
      if (!currentItem) return state;

      const newItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    }

    case 'DECREASE_QUANTITY': {
      const product = action.payload;

      const currentItem = state.items.find(
        item => item.product.id === product.id,
      );
      if (!currentItem) return state;

      if (currentItem.quantity <= 1) {
        const newItems = state.items.filter(
          item => item.product.id !== product.id,
        );
        const totals = calculateTotals(newItems);

        return {
          items: newItems,
          ...totals,
        };
      }

      const newItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

      const totals = calculateTotals(newItems);

      return {
        items: newItems,
        ...totals,
      };
    }

    case 'CLEAR_CART': {
      return initialCartState;
    }

    default:
      return state;
  }
};
