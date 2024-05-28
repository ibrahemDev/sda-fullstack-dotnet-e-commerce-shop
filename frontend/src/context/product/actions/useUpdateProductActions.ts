import { QueryFilters, useMutation } from "@tanstack/react-query";
import { Product, ProductModel, singleProductModel } from "../ProductType";
import api from "@/api";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/main";
import { AxiosResponse } from "axios";
import { getAllProductQueryKey } from "./useGetAllProductActions";
import { useProductContext } from "../ProductContext";


/**
 * Updates an existing product in the database.
 *
 * @param {Product} product - The product object with updated data.
 * @returns {Promise<Product>} A promise that resolves to the updated product data.
 */
const updateProduct = async (product: Product, token: string): Promise<AxiosResponse<singleProductModel, any>> => {
  const response = await api.put<
    string,
    AxiosResponse<singleProductModel, any>,
    any
  >(`/products/${product.productId}`, product, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },


  });
  return response; // Assuming API returns updated product data
};


/**
 * Custom hook to provide functionality for updating a product.
 *
 * Leverages `react-query`'s `useMutation` hook to handle asynchronous
 * update operations and provides state management for loading, success,
 * and error states.
 *
 * @returns {object} An object containing functions and state variables for updating a product.
 */
export const useUpdateProductActions = () => {
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

  // Uses the useMutation hook from react-query to update a product.
  const {
    mutateAsync: updateProductAsync,
    isPending: isUpdatingProduct,
    isSuccess: isProductUpdated,
    error: updateProductError,
  } = useMutation({
    //mutationFn: updateProduct,
    mutationFn: async (product: Product) => !isLoggedIn ? navigate("/login") : await updateProduct(product, token!.token),
    onSuccess(data, variables, context) {

      let updatedData = data as AxiosResponse<singleProductModel, any>;
      queryClient.setQueriesData<AxiosResponse<ProductModel<Product[]>, any>>(
        getAllProductQueryKey(productState.urlQuery) as QueryFilters,

        (oldData): AxiosResponse<ProductModel<Product[]>, any> | undefined => {
          if (oldData) {
            let newData = {
              ...oldData,
              data: {
                ...oldData.data,
                data: {
                  ...oldData.data.data,
                  items: oldData.data.data.items!.map((item) => {
                    if (item.productId == updatedData.data.data.productId) {
                      return updatedData.data.data
                    }
                    return item;
                  })
                }
              }
            }

            return newData;
          } else {
            return oldData;
          }

        });
    }

  });


  return {
    // Function to initiate an asynchronous update of a product.
    updateProductAsync,
    // Boolean indicating if the product update request is in progress.
    isUpdatingProduct,
    // Boolean indicating if the product update was successful.
    isProductUpdated,
    // Object containing any errors encountered during the product update.
    updateProductError,
  };
};
