import { cartReducer, initialCartState } from './CartReducer';
import { CartState, CartAction, Product } from '../types';

const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  description: 'Test description 1',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 20,
  brand: 'Test Brand',
  category: 'Test Category',
  thumbnail: 'test-thumbnail-1.jpg',
  images: ['test-image-1.jpg'],
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  description: 'Test description 2',
  price: 50,
  discountPercentage: 0,
  rating: 3.8,
  stock: 5,
  brand: 'Test Brand 2',
  category: 'Test Category 2',
  thumbnail: 'test-thumbnail-2.jpg',
  images: ['test-image-2.jpg'],
};

describe('CartReducer', () => {
  describe('initialCartState', () => {
    it('should have correct initial state', () => {
      expect(initialCartState).toEqual({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    });
  });

  describe('ADD_ITEM action', () => {
    it('should add new item to empty cart', () => {
      const action: CartAction = {
        type: 'ADD_ITEM',
        payload: mockProduct1,
      };

      const newState = cartReducer(initialCartState, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({
        product: mockProduct1,
        quantity: 1,
      });
      expect(newState.totalItems).toBe(1);
      expect(newState.totalPrice).toBe(90);
    });

    it('should increase quantity when adding existing item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'ADD_ITEM',
        payload: mockProduct1,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(2);
      expect(newState.totalItems).toBe(2);
      expect(newState.totalPrice).toBe(180);
    });

    it('should add multiple different items', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'ADD_ITEM',
        payload: mockProduct2,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(2);
      expect(newState.items[1]).toEqual({
        product: mockProduct2,
        quantity: 1,
      });
      expect(newState.totalItems).toBe(2);
      expect(newState.totalPrice).toBe(140);
    });
  });

  describe('REMOVE_ITEM action', () => {
    it('should remove item from cart', () => {
      const stateWithItems: CartState = {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        totalItems: 3,
        totalPrice: 230,
      };

      const action: CartAction = {
        type: 'REMOVE_ITEM',
        payload: mockProduct1.id,
      };

      const newState = cartReducer(stateWithItems, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].product.id).toBe(mockProduct2.id);
      expect(newState.totalItems).toBe(1);
      expect(newState.totalPrice).toBe(50);
    });

    it('should handle removing non-existent item', () => {
      const stateWithItems: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'REMOVE_ITEM',
        payload: 999,
      };

      const newState = cartReducer(stateWithItems, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.totalItems).toBe(1);
      expect(newState.totalPrice).toBe(90);
    });

    it('should clear cart when removing last item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'REMOVE_ITEM',
        payload: mockProduct1.id,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.totalItems).toBe(0);
      expect(newState.totalPrice).toBe(0);
    });
  });

  describe('INCREASE_QUANTITY action', () => {
    it('should increase quantity of existing item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 2 }],
        totalItems: 2,
        totalPrice: 180,
      };

      const action: CartAction = {
        type: 'INCREASE_QUANTITY',
        payload: mockProduct1,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(3);
      expect(newState.totalItems).toBe(3);
      expect(newState.totalPrice).toBe(270);
    });

    it('should return same state when increasing quantity of non-existent item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'INCREASE_QUANTITY',
        payload: mockProduct2,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState).toEqual(stateWithItem);
    });
  });

  describe('DECREASE_QUANTITY action', () => {
    it('should decrease quantity of existing item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 3 }],
        totalItems: 3,
        totalPrice: 270,
      };

      const action: CartAction = {
        type: 'DECREASE_QUANTITY',
        payload: mockProduct1,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(2);
      expect(newState.totalItems).toBe(2);
      expect(newState.totalPrice).toBe(180);
    });

    it('should remove item when decreasing quantity to 0', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'DECREASE_QUANTITY',
        payload: mockProduct1,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.totalItems).toBe(0);
      expect(newState.totalPrice).toBe(0);
    });

    it('should return same state when decreasing quantity of non-existent item', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      const action: CartAction = {
        type: 'DECREASE_QUANTITY',
        payload: mockProduct2,
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState).toEqual(stateWithItem);
    });

    it('should remove item from multi-item cart when quantity becomes 0', () => {
      const stateWithItems: CartState = {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 1 },
        ],
        totalItems: 3,
        totalPrice: 230,
      };

      const action: CartAction = {
        type: 'DECREASE_QUANTITY',
        payload: mockProduct2,
      };

      const newState = cartReducer(stateWithItems, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].product.id).toBe(mockProduct1.id);
      expect(newState.totalItems).toBe(2);
      expect(newState.totalPrice).toBe(180);
    });
  });

  describe('CLEAR_CART action', () => {
    it('should clear cart with multiple items', () => {
      const stateWithItems: CartState = {
        items: [
          { product: mockProduct1, quantity: 2 },
          { product: mockProduct2, quantity: 3 },
        ],
        totalItems: 5,
        totalPrice: 330,
      };

      const action: CartAction = {
        type: 'CLEAR_CART',
      };

      const newState = cartReducer(stateWithItems, action);

      expect(newState).toEqual(initialCartState);
    });

    it('should handle clearing already empty cart', () => {
      const action: CartAction = {
        type: 'CLEAR_CART',
      };

      const newState = cartReducer(initialCartState, action);

      expect(newState).toEqual(initialCartState);
    });
  });

  describe('default case', () => {
    it('should return current state for unknown action', () => {
      const stateWithItem: CartState = {
        items: [{ product: mockProduct1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 90,
      };

      // Type assertion to test unknown action type handling
      const action = {
        type: 'UNKNOWN_ACTION',
        payload: {},
      } as any;

      const newState = cartReducer(stateWithItem, action);

      expect(newState).toEqual(stateWithItem);
    });
  });

  describe('edge cases and complex scenarios', () => {
    it('should handle product with no discount', () => {
      const action: CartAction = {
        type: 'ADD_ITEM',
        payload: mockProduct2,
      };

      const newState = cartReducer(initialCartState, action);

      expect(newState.items[0].product).toEqual(mockProduct2);
      expect(newState.totalPrice).toBe(50);
    });

    it('should handle multiple sequential operations', () => {
      let state = initialCartState;

      state = cartReducer(state, {
        type: 'ADD_ITEM',
        payload: mockProduct1,
      });
      expect(state.totalItems).toBe(1);

      state = cartReducer(state, {
        type: 'ADD_ITEM',
        payload: mockProduct2,
      });
      expect(state.totalItems).toBe(2);

      state = cartReducer(state, {
        type: 'INCREASE_QUANTITY',
        payload: mockProduct1,
      });
      expect(state.totalItems).toBe(3);

      state = cartReducer(state, {
        type: 'REMOVE_ITEM',
        payload: mockProduct2.id,
      });
      expect(state.totalItems).toBe(2);
      expect(state.items).toHaveLength(1);

      state = cartReducer(state, {
        type: 'CLEAR_CART',
      });
      expect(state).toEqual(initialCartState);
    });
  });
});
