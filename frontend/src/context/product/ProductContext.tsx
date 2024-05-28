/**
 * @file Defines the ProductContext and ProductContextProvider for managing
 * product-related state globally within the application.
 */
import * as React from 'react';
import { PropsWithChildren, createContext, useReducer } from 'react';

import {
  ProductInitialStateType,
  ProductReducerActionsType,
  productReducer,
} from './ProductReduser';

/**
 * Defines the initial state for the product context.
 */
const productInitialState: ProductInitialStateType = {
  urlQuery: {
    page: 1,
    limit: 25,
    sortBy: 'Name',
    dir: 'Asc',
    search: undefined,
  },
};

/**
 * Defines the type for the ProductContext value, which includes the state and
 * dispatch function.
 */
type ProductContextType = {
  state: ProductInitialStateType;
  dispatch: React.Dispatch<ProductReducerActionsType>;
};

/**
 * Creates a React Context for managing product-related state.
 */
const ProductContext = createContext<ProductContextType>({
  state: productInitialState,
  // Default dispatch function that does nothing. This will be replaced with
  // the actual dispatch function from the useReducer hook in the provider.
  dispatch: () => null,
});

/**
 * Provides the product state and dispatch function to its children components.
 *
 * @param {PropsWithChildren} props - The component's props, including children.
 * @returns {React.ReactElement} The ProductContext.Provider component.
 */
export const ProductContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // Initialize the product state using the useReducer hook.
  const [state, dispatch] = useReducer(
    productReducer,
    productInitialState,
  );

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Custom hook to access the ProductContext.
 *
 * @returns {ProductContextType} The value of the ProductContext.
 */
export const useProductContext = (): ProductContextType => {
  return React.useContext(ProductContext);
};
