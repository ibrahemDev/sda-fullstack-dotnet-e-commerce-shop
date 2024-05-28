import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

/**
 * Sends a DELETE request to the API to delete a shopping cart by its ID.
 *
 * @param cartId - The ID of the cart to delete.
 * @returns A promise that resolves to the Axios response from the server.
 */
const deleteCart = async (cartId: string) => {
  const response = await api.delete(`/carts/${cartId}`);
  return response;
};

/**
 * Returns the React Query query key for the delete cart mutation. 
 * This key is used to uniquely identify the mutation in the React Query cache.
 *
 * @returns An array containing a single string, "DeleteCartQueryKey". 
 */
export const useDeleteCartQueryKey = (): ["DeleteCartQueryKey"] => {
  return ["DeleteCartQueryKey"];
};

/**
 * Custom React Query hook to manage the deletion of a shopping cart. 
 *
 * Provides functionality to initiate the cart deletion process, track its status 
 * (pending, success, error), and access any error object. 
 *
 * @returns An object containing functions and state variables related 
 * to the cart deletion mutation:
 *   - deleteCartAsync: A function to initiate the cart deletion mutation.
 *   - isDeletingCart: A boolean indicating if the deletion is currently in progress.
 *   - isCartDeleted:  A boolean indicating if the deletion was successful.
 *   - deleteCartError: Any error object returned by the mutation. 
 * const {
  deleteCartAsync,
    isDeletingCart,
    isCartDeleted,
    deleteCartError,
} = useDeleteCartActions()
 */
export const useDeleteCartActions = () => {
  const { token, isLoggedIn, user, updateSelfUserAction } =
    useAuthenticationActions();

  // Using React Query's useMutation hook to delete a cart.
  const {
    mutateAsync: deleteCartAsync, // Function to initiate the mutation
    isPending: isDeletingCart,   // Indicates if the mutation is in progress
    isSuccess: isCartDeleted,    // Indicates if the mutation was successful
    error: deleteCartError,      // Holds the error object if the mutation fails
  } = useMutation({
    mutationKey: useDeleteCartQueryKey(), // Unique key for this mutation in the cache
    mutationFn: deleteCart,             // The function to execute for deleting the cart
    onSuccess: (_, cartItemId) => {
      // If the user is not logged in, there's no need to update the local cart.
      if (!isLoggedIn || !user || !user.cart) return;

      // Optimistically update the user's cart in the application state.
      updateSelfUserAction({
        ...user,
        cart: null,
      });
    },
  });

  return {
    deleteCartAsync,
    isDeletingCart,
    isCartDeleted,
    deleteCartError,
  };
};


