import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "@/api";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

/**
 * Deletes a cart item and updates the user's cart in the application state.
 * 
 * This hook uses React Query's `useMutation` hook to perform the delete operation. 
 * Upon successful deletion, it updates the user's cart in the application state.
 *
 * @returns An object containing functions and state variables related to 
 * deleting a cart item.
 */
export const useDeleteCartItemActions = () => {
  const { token, isLoggedIn, user, updateSelfUserAction } =
    useAuthenticationActions();

  /**
   * Makes an API request to delete a specific cart item.
   *
   * @param cartItemId The ID of the cart item to be deleted.
   * @returns A promise that resolves to the Axios response from the API.
   */
  const deleteCartItem = async (cartItemId: string) => {
    const response = await api.delete<string, AxiosResponse<any, any>>(
      `/cartitems/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const {
    mutateAsync: deleteCartItemAsync,
    isPending: isDeletingCartItem,
    isSuccess: isCartItemDeleted,
    error: deleteCartItemError,
  } = useMutation({
    mutationFn: deleteCartItem,
    /**
     * Callback function executed after a successful mutation.
     *
     * @param _ The data returned from the mutation function (unused in this case).
     * @param cartItemId The ID of the cart item that was deleted.
     */
    onSuccess: (_, cartItemId) => {
      // If the user is not logged in, there's no need to update the local cart.
      if (!isLoggedIn || !user || !user.cart) return;

      // Optimistically update the user's cart in the application state.
      updateSelfUserAction({
        ...user,
        cart: {
          ...user.cart,
          items: user.cart.items.filter(
            (item) => item.cartItemId !== cartItemId
          ),
        },
      });
    },
  });

  return {
    deleteCartItemAsync,
    isDeletingCartItem,
    isCartItemDeleted,
    deleteCartItemError,
  };
};
