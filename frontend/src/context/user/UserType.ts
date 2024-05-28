/**
 * userType.ts
 * This file defines interfaces related to user data.
 */

import { Cart } from '../cart/CartType';

/**
 * Represents a user object.
 */
export interface User {
  /** Unique identifier for the user. */
  userId: string;
  /** User's email address. */
  email: string;
  /** User's phone number. */
  phoneNumber: string;
  /** User's first name. */
  firstName: string;
  /** User's last name. */
  lastName: string;
  /** User's date of birth. */
  dateOfBirth: string;
  /** User's role (represented as a number). */
  role: number;
  /** Timestamp of user creation. */
  createdAt: string;
}

/**
 * Represents data for updating a user.
 */
export interface UpdateUserDto {
  /** User's email address. */
  email: string;
  /** User's phone number. */
  phoneNumber: string;
  /** User's first name. */
  firstName: string;
  /** User's last name. */
  lastName: string;
  /** User's date of birth. */
  dateOfBirth: Date;
  /** User's role (represented as a number). */
  role: number;
}
/**
 * Represents a response containing an array of users.
 */
export interface UserModel2<T> {
  /** Indicates if the request was successful. */
  success: boolean;
  /** Message associated with the response (null if no message). */
  message: string | null;
  data: {
    /**
     * List of fetched products.
     */
    items: T;

    /**
     * Total count of products matching the request.
     */
    totalCount: number;

    /**
     * Current page number of the fetched products.
     */
    pageNumber: number;

    /**
     * Number of items per page in the fetched products.
     */
    pageSize: number;

    /**
     * Total number of pages based on pageSize and totalCount.
     */
    totalPages: number;
  };


}
/**
 * Represents a response containing an array of users.
 */
export interface UserModel {
  /** Indicates if the request was successful. */
  success: boolean;
  /** Message associated with the response (null if no message). */
  message: string | null;
  /** Array of User objects. */
  data: User[];
}

/**
 * Represents a single user with detailed information.
 */
export interface SingleUser {
  /** Unique identifier for the user. */
  userId: string;
  /** User's email address. */
  email: string;
  /** User's password (always null for security reasons). */
  password: null;
  /** User's phone number. */
  phoneNumber: string;
  /** User's first name. */
  firstName: string;
  /** User's last name (can be null). */
  lastName: string | null;
  /** User's date of birth (can be null). */
  dateOfBirth: string | null;
  /** User's role (represented as a number). */
  role: number;
  /** Timestamp of user creation. */
  createdAt: string;
  /** User's shopping cart (can be null). */
  cart: Cart | null;
  /** User's addresses (currently an empty array). */
  addresses: [];
  /** User's saved payment methods (currently an empty array). */
  paymentMethods: [];
  /** User's past orders (currently an empty array). */
  orders: [];
  /** User's shopping lists (currently an empty array). */
  shoppingLists: [];
  /** User's product reviews (currently an empty array). */
  productReviews: [];
}

/**
 * Represents a response containing data for a single user.
 */
export interface SingleUserResponse {
  /** Indicates if the request was successful. */
  success: boolean;
  /** Message associated with the response (always null). */
  message: null;
  /** Data for a single user. */
  data: SingleUser;
}

