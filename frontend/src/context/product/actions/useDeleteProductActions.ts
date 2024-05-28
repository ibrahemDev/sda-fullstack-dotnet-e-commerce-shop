import { QueryFilters, useMutation } from "@tanstack/react-query";
import api from "@/api";
import { queryClient } from "@/main";
import { useProductContext } from "../ProductContext";
import { getAllProductQueryKey, useGetAllProductActions } from "./useGetAllProductActions";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from "axios";
import { Product, ProductModel, singleProductModel } from "../ProductType";
import { Cart } from "@/context/cart/CartType";


/**
 * Deletes a product by its ID.
 *
 * @param productId - The ID of the product to delete.
 * @returns A promise that resolves to an Axios response indicating success or
 *     failure.
 */
const deleteProduct = async (productId: string, token: string) => {
  const response = await api.delete<
    string,
    AxiosResponse<singleProductModel, any>,
    any
  >(`/products/${productId}`, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    }
  });
  return response;
};

/**
 * Custom hook to handle product deletion logic.
 * 
 * Leverages `react-query`'s `useMutation` hook for asynchronous
 * operations and state management.
 *
 * @returns An object containing functions and state variables related to product
 *     deletion.
 *     - deleteProductAsync: Function to initiate product deletion.
 *     - isDeletingProduct: Boolean indicating if a delete request is in progress.
 *     - isProductDeleted: Boolean indicating if the deletion was successful.
 *     - deleteProductError: Object containing error details if the deletion
 *     failed.
 */
export const useDeleteProductActions = () => {
  const { refetch } = useGetAllProductActions();
  const navigate = useNavigate();
  const {
    token,
    isLoggedIn,
    isAdmin,
    userId,
    logout,
    updateSelfUserAction,
    user
  } = useAuthenticationActions();






  const { state: productState, dispatch: productDispatch } =
    useProductContext();

  // Utilize useMutation for managing the delete product mutation.
  const {
    mutateAsync: deleteProductAsync,
    isPending: isDeletingProduct,
    isSuccess: isProductDeleted,
    error: deleteProductError,
  } = useMutation({
    mutationFn: async (id: string) => !isLoggedIn ? navigate("/login") : await deleteProduct(id, token!.token),
    onSuccess(data, variables, context) {
      refetch();
      let _data = data as AxiosResponse<singleProductModel, any>;
      //queryClient.setQueriesData<AxiosResponse<ProductModel<Product[]>, any>>(getAllProductQueryKey(productState.urlQuery) as QueryFilters, (oldData):AxiosResponse<ProductModel<Product[]> => {
      //console.log(oldData)
      //return oldData?.data.data.;
      //});

      if (isLoggedIn) {
        updateSelfUserAction({
          ...user,
          //@ts-ignore
          cart: {
            ...((user!.cart || { items: [] })),
            items: user!.cart!.items.filter(
              (item) => item.productId !== _data.data!.data.productId
            ),
          },
        });
      }


    },
  });

  return {
    deleteProductAsync,
    isDeletingProduct,
    isProductDeleted,
    deleteProductError,
  };
};
