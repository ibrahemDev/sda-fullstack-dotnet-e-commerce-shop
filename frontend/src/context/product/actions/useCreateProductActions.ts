import { useMutation } from "@tanstack/react-query";
import { CreateProductDto, singleProductModel } from "../ProductType";
import api from "@/api";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useGetAllProductActions } from "./useGetAllProductActions";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

/**
 * Creates a new product via an API call.
 *
 * @param {CreateProductDto} product - The product data to create.
 * @returns {Promise<AxiosResponse<any>>} A promise that resolves to an Axios response
 * containing the created product data.
 */
const createProduct = async (product: CreateProductDto, token: string) => {
  // Makes a POST request to the '/products' endpoint with the provided product data.
  return await api.post<
    string,
    AxiosResponse<singleProductModel, any>,
    any
  >('/products', product, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },


  });
};





/**
 * Custom hook to manage the state and side effects of creating a new product.
 * 
 * @returns {object} An object containing the following functions and state variables:
 *   - createProductAsync: A function to initiate the asynchronous product creation.
 *   - isCreatingProduct: A boolean indicating if the product creation is in progress.
 *   - isProductCreated: A boolean indicating if the product creation was successful.
 *   - createProductError: An object holding any error information during product creation.
 */
export const useCreateProductActions = () => {
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
  // Utilizes react-query's useMutation hook for managing asynchronous operations.
  const {
    mutateAsync: createProductAsync,
    isPending: isCreatingProduct,
    isSuccess: isProductCreated,
    error: createProductError,
  } = useMutation({
    mutationFn: async (product: CreateProductDto) => !isLoggedIn ? navigate("/login") : await createProduct(product, token!.token), // The function to execute for the mutation.
    onSuccess(data, variables, context) {
      refetch()
    }

    // Optional: Handle successful product creation, e.g., update local state
    // or trigger other side effects.
    // onSuccess: (data) => {
    //   console.log('Product created successfully:', data); 
    // }
  });

  // Exposes relevant functions and state variables for managing product creation.
  return {
    createProductAsync,
    isCreatingProduct,
    isProductCreated,
    createProductError,
  };
};
