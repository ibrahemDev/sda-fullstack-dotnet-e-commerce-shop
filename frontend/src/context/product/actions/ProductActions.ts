import { useProductContext } from '../ProductContext';
import {
  GetAllProductsUrlQuery,
  ProductReducerAction,
  ProductReducerActionsType
} from "../ProductReduser"; // Assuming "ProductReduser" was a typo.

/**
 * Updates the product filters in the product context.
 *
 * @param productDispatch The dispatch function for the product context.
 * @param filters The new filters to apply.
 */
export const updateFilters = (
  productDispatch: React.Dispatch<ProductReducerActionsType>,
  filters: GetAllProductsUrlQuery
): void => {
  productDispatch({
    type: ProductReducerAction.UPDATE_URL_QUERY,
    payload: filters,
  });
};

/**
 * Resets the product filters in the product context to their default values.
 *
 * @param productDispatch The dispatch function for the product context.
 */
export const resetProductFilters = (
  productDispatch: React.Dispatch<ProductReducerActionsType>
): void => {
  productDispatch({ type: ProductReducerAction.RESET, payload: undefined });
};

/**
 * Custom hook providing access to product actions and state.
 *
 * @returns An object containing the product state, dispatch function, and
 *     convenience functions for updating and resetting filters.
 */
export const useProductActions = () => {
  const { state: productState, dispatch: productDispatch } =
    useProductContext();

  return {
    productState,
    productDispatch,
    resetProductFilters: () => resetProductFilters(productDispatch),
    updateFilters: (filters: GetAllProductsUrlQuery) =>
      updateFilters(productDispatch, filters),
  };
};
