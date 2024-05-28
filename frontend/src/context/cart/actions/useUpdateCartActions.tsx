import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "@/api";
import { Cart, CartModel } from "../CartType";

/**
 * Sends a PUT request to the API to update an existing shopping cart.
 *
 * @param cart - The updated cart object containing the changes to be persisted.
 * @returns A promise that resolves to the Axios response from the server.
 */
export const updateCart = async (cart: Cart): Promise<AxiosResponse<CartModel>> => {
  const response = await api.put<Cart, AxiosResponse<CartModel>>(`/carts/${cart.cartId}`, cart);
  return response;
};

/**
 * Returns the React Query query key used for the update cart mutation.
 * The query key uniquely identifies this mutation in the React Query cache.
 *
 * @returns An array containing a single string, "UpdateCartQueryKey", 
 *          representing the query key for this mutation.
 */
export const useUpdateCartQueryKey = (): ["UpdateCartQueryKey"] => {
  return ["UpdateCartQueryKey"];
};

/**
 * Custom React Query hook to manage the process of updating a shopping cart.
 *
 * This hook provides functionality to initiate an update, 
 * track the update's status (pending, success, or error), 
 * and handle any errors that might occur during the update process.
 *
 * @returns An object containing functions and state variables related 
 *          to the cart update mutation:
 *    - updateCartAsync: A function to initiate the cart update mutation.
 *    - isUpdatingCart:  A boolean indicating whether the update operation 
 *                       is currently in progress.
 *    - isCartUpdated:  A boolean indicating whether the update was successful.
 *    - updateCartError: Any error object returned during the mutation. 
 */
export const useUpdateCartActions = () => {
  // Uses React Query's useMutation hook to handle updating a cart. 
  const {
    mutateAsync: updateCartAsync,
    isPending: isUpdatingCart,
    isSuccess: isCartUpdated,
    error: updateCartError,
  } = useMutation({
    mutationKey: useUpdateCartQueryKey(), // Unique key for caching and identifying the mutation
    mutationFn: updateCart,             // The function to call to update the cart 
    // You can uncomment and configure the onSuccess callback 
    // if you need to perform additional actions
    // after a successful cart update:
    // onSuccess: (data, variables, context) => {
    //   // Optionally update the cache here if needed
    //   // queryClient.setQueriesData(...)
    //   return null; 
    // }
  });

  // Return the function and status variables for the component to use
  return {
    updateCartAsync,
    isUpdatingCart,
    isCartUpdated,
    updateCartError,
  };
};
