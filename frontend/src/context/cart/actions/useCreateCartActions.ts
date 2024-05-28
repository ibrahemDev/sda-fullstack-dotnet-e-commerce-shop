import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "@/api";
import { CartModel, SingleCartModel } from "../CartType";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

/**
 * Sends a request to the API to create a new shopping cart.
 * 
 * @param userId - The ID of the user for whom to create the cart.
 * @returns A promise that resolves to an Axios response 
 *          containing the newly created cart data. 
 */
const createCart = async (userId: string): Promise<AxiosResponse<SingleCartModel>> => {
  const response = await api.post<
    { userId: string },
    AxiosResponse<SingleCartModel, any>
  >("/carts", { userId: userId });
  return response;
};

/**
 * Provides the React Query query key for the create cart mutation. 
 * This key is used to uniquely identify the mutation in the cache.
 * 
 * @returns An array containing the string "CreateCartQueryKey" -
 *          the query key for this mutation.
 */
export const useCreateCartQueryKey = (): ["CreateCartQueryKey"] => {
  return ["CreateCartQueryKey"];
};

/**
 * Custom React Query hook to manage the creation of a new shopping cart.
 * 
 * This hook provides functionality for initiating the cart creation process, 
 * tracking its status (pending, success, error), 
 * and accessing any errors that occur. 
 *
 * @returns An object containing functions and state variables 
 *          related to the cart creation mutation:
 *          - createCartAsync:  Function to initiate the cart creation mutation.
 *          - isCreatingCart: Boolean indicating if the mutation is in progress.
 *          - isCartCreated: Boolean indicating if the mutation was successful.
 *          - createCartError:  Any error object returned by the mutation.
 */
export const useCreateCartActions = () => {
  const { token, isLoggedIn, user, updateSelfUserAction } =
    useAuthenticationActions();


  // Using React Query's useMutation hook to create a cart.
  const {
    mutateAsync: createCartAsync,
    isPending: isCreatingCart,
    isSuccess: isCartCreated,
    error: createCartError,
  } = useMutation({
    mutationKey: useCreateCartQueryKey(), // Unique key for caching
    mutationFn: createCart,             // Function to execute for the mutation 
    onSuccess: (axiosRes, cartItemId) => {
      // If the user is not logged in, there's no need to update the local cart.
      if (!isLoggedIn || !user) return;

      // Optimistically update the user's cart in the application state.
      updateSelfUserAction({
        ...user,
        cart: axiosRes.data.data,

      });
    },
    // onSuccess: (data, variables, context) => { // (Commented out - no action needed on success)
    //   return null;
    // }
  });

  return {
    createCartAsync,
    isCreatingCart,
    isCartCreated,
    createCartError,
  };
};


