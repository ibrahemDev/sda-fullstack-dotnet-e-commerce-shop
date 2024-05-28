/**
 * @file Provides types for cart items and related data models.
 */
import { Product } from '../product/ProductType';

/**
 * Represents a single item in a user's shopping cart.
 */
export interface CartItem {
    /** Unique identifier for the cart item. */
    cartItemId: string;
    /** Unique identifier of the product in the cart item. */
    productId: string;
    /** Quantity of the product in the cart item. */
    quantity: number;
    /** Maximum allowed quantity of the product in the cart item. */
    maximum: number;
    /** Minimum allowed quantity of the product in the cart item. */
    minimum: number;
    /** Timestamp indicating when the cart item was created. */
    createdAt: string;
    /** 
     * Details of the product in the cart item. 
     * This field might not always be populated, hence optional. 
     */
    product?: Product;
    /** Unique identifier of the cart this item belongs to. */
    cartId: string;
}

/**
 * Generic interface for API responses related to cart item operations.
 *
 * @template T - Type of the data returned in the response.
 */
export interface CartItemModel<T> {
    /** Indicates if the operation was successful. */
    success: boolean;
    /** A message accompanying the response, typically in case of errors. */
    message: null | string;
    /** The actual data payload returned by the API. */
    data: T;
}

/**
 * Represents the data required to create a new cart item.
 */
export type CreateCartItemDto = {
    /** Unique identifier of the cart to add the item to. */
    cartId: string;
    /** Unique identifier of the product to add. */
    productId: string;
    /** Quantity of the product to add. */
    quantity: number;
};

/**
 * Represents the data required to update an existing cart item.
 */
export type UpdateCartItemDto = {
    /** Unique identifier of the cart item to update. */
    cartItemId: string;
    /** The new quantity for the cart item. */
    quantity: number;
};

