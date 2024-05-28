
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { queryClient } from "@/main";
import api from "@/api";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";
import { CartItem, CartItemModel, CreateCartItemDto } from "../CartItemTypes";

/**
 * Sends a POST request to create a new cart item.
 *
 * @param cartItem - The data for the new cart item.
 * @returns A promise that resolves to an Axios response containing the created cart item data.
 */
const createCartItem = async (
  cartItem: CreateCartItemDto
): Promise<AxiosResponse<CartItemModel<CartItem>, any>> => {
  const response = await api.post<
    string,
    AxiosResponse<CartItemModel<CartItem>, any>,
    CreateCartItemDto
  >("/cartitems", cartItem);
  return response;
};

/**
 * Provides functionality for creating cart items and updating the user's cart in the application state.
 *
 * @returns An object containing functions and status indicators for managing the cart item creation process.
 */
export const useCreateCartItemActions = () => {
  // Access authentication actions and user data.
  const { token, isLoggedIn, user, updateSelfUserAction } =
    useAuthenticationActions();

  // Define the mutation for creating a cart item using React Query.
  const {
    mutateAsync: createCartItemAsync,
    isPending: isCreatingCartItem,
    isSuccess: isCartItemCreated,
    error: createCartItemError,
  } = useMutation({
    mutationFn: createCartItem,
    // Callback function triggered upon successful cart item creation.
    onSuccess: (res) => {
      // If the user is logged in, update the user's cart with the new item.
      if (isLoggedIn && user) {
        updateSelfUserAction({
          ...user,
          cart: {
            ...user.cart!,
            // Add the newly created cart item to the user's cart.
            items: [...user.cart!.items, res.data.data],
          },
        });
      }
    },
  });

  // Return functions and status indicators for managing cart item creation.
  return {
    createCartItemAsync,
    isCreatingCartItem,
    isCartItemCreated,
    createCartItemError,
  };
};

