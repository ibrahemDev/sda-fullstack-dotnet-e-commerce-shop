/**
 * @file Provides React Query hooks for updating cart items and managing related state.
 */

import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "@/api";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";
import { CartItem, CartItemModel, UpdateCartItemDto } from "../CartItemTypes";

/**
 * Sends a PUT request to update an existing cart item.
 *
 * @param cartItem - The updated cart item data, including the cartItemId.
 * @returns A promise that resolves to an Axios response containing the updated cart item data.
 */
const updateCartItem = async (
  cartItem: UpdateCartItemDto
): Promise<AxiosResponse<CartItemModel<CartItem>, any>> => {
  const response = await api.put<
    string,
    AxiosResponse<CartItemModel<CartItem>, any>,
    UpdateCartItemDto
  >(`/cartitems/${cartItem.cartItemId}`, cartItem);
  return response;
};

/**
 * Provides functionality for updating cart items and updating the user's cart in the application state.
 *
 * @returns An object containing functions and status indicators for managing the cart item update process.
 */
export const useUpdateCartItemActions = () => {
  // Access authentication actions and user data.
  const { isLoggedIn, user, updateSelfUserAction } =
    useAuthenticationActions();

  // Define the mutation for updating a cart item using React Query.
  const {
    mutateAsync: updateCartItemAsync,
    isPending: isUpdatingCartItem,
    isSuccess: isCartItemUpdated,
    error: updateCartItemError,
  } = useMutation({
    mutationFn: updateCartItem,
    // Callback function triggered upon successful cart item update.
    onSuccess: (res) => {
      // If the user is logged in, update the user's cart with the modified item.
      if (isLoggedIn && user) {
        updateSelfUserAction({
          ...user,
          cart: {
            ...user.cart!,
            // Update the corresponding cart item in the user's cart.
            items: user.cart!.items.map((item) =>
              item.cartItemId === res.data.data.cartItemId
                ? res.data.data
                : item
            ),
          },
        });
      }
    },
  });

  // Return functions and status indicators for managing cart item updates.
  return {
    updateCartItemAsync,
    isUpdatingCartItem,
    isCartItemUpdated,
    updateCartItemError,
  };
};

