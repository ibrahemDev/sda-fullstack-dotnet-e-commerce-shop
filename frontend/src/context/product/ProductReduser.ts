import type { ActionMap } from "../GlobalContextTypes";

import { Product } from "./ProductType";

/**
 * Represents the initial state for the Product Reducer.
 */
export type ProductInitialStateType = {
  /**
   * The URL query parameters used for fetching product data.
   */
  urlQuery: GetAllProductsUrlQuery;
};

/**
 * Defines the structure of URL query parameters for fetching products.
 */
export type GetAllProductsUrlQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "Name" | "Price" | "Stock";
  dir?: "Asc" | "Desc";
  byCategory?: string;
};

/**
 * Enum defining the possible actions for the Product Reducer.
 */
export enum ProductReducerAction {
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  UPDATE_URL_QUERY = "UPDATE_URL_QUERY",
  RESET = "RESET",
}

/**
 * Defines the payload types for each Product Reducer action.
 */
type ProductReducerPayload = {
  [ProductReducerAction.UPDATE_PRODUCT]: Product[];
  [ProductReducerAction.UPDATE_URL_QUERY]: GetAllProductsUrlQuery;
  [ProductReducerAction.RESET]: void;
};

/**
 * Represents the type of actions dispatched to the Product Reducer.
 */
export type ProductReducerActionsType =
  ActionMap<ProductReducerPayload>[keyof ActionMap<ProductReducerPayload>];

/**
 * Reducer function for managing the state of product data and URL query parameters.
 *
 * @param state - The current state of the Product Reducer.
 * @param action - The action being dispatched to the reducer.
 * @returns The updated state based on the action type.
 */
export const productReducer = (
  state: ProductInitialStateType,
  action: ProductReducerActionsType
): ProductInitialStateType => {
  switch (action.type) {
    case ProductReducerAction.UPDATE_URL_QUERY:
      // Updates the URL query parameters in the state, merging with existing parameters.
      return {
        ...state,
        urlQuery: {
          ...state.urlQuery,
          ...action.payload,
        },
      };
    case ProductReducerAction.RESET:
      // Resets the URL query parameters to their default values.
      return {
        ...state,
        urlQuery: {
          page: 1,
          limit: 25,
          sortBy: "Name",
          dir: "Asc",
          byCategory: undefined,
        },
      };
    default:
      // Returns the current state for unhandled actions.
      return state;
  }
};

