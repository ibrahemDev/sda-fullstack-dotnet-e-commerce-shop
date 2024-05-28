/**
 * This file defines the types related to the Cart.
 */

import { CartItem } from '../cartItem/CartItemTypes';

/**
 * Represents a single item in the cart.
 */
export interface Cart {
  /** Unique identifier for the cart. */
  cartId: string;
  /** Unique identifier for the user who owns the cart. */
  userId: string;
  /** List of cart items. */
  items: CartItem[];
  // Consider adding:
  // /** Total price of all items in the cart. */
  // totalPrice: number;
}

/**
 * Represents the response model for Cart related operations.
 */
export interface CartModel {
  /** Indicates if the operation was successful. */
  success: boolean;
  /** Message describing the outcome of the operation. */
  message: null | string;
  /** Array of Cart objects. */
  data: Cart[];
}


export interface SingleCartModel {
  /** Indicates if the operation was successful. */
  success: boolean;
  /** Message describing the outcome of the operation. */
  message: null | string;
  /** Array of Cart objects. */
  data: Cart;
}
