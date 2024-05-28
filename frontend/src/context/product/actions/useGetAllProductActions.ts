import api from "@/api";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../ProductContext";
import {
  GetAllProductsUrlQuery
} from "../ProductReduser";
import { Product, ProductModel } from "../ProductType";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches all products from the API based on the provided URL query parameters.
 *
 * @param params - The URL query parameters to filter products.
 * @returns A promise that resolves to an Axios response containing the product
 *     data.
 */
const getAllProducts = async (
  params: GetAllProductsUrlQuery
): Promise<AxiosResponse<ProductModel<Product[]>, any>> => {
  // Construct the query string from the provided parameters, filtering out
  // undefined values.
  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  // Fetch the products from the API using the constructed query string.
  const response = await api.get<
    string,
    AxiosResponse<ProductModel<Product[]>, any>,
    GetAllProductsUrlQuery
  >(`/products?${queryString}`);

  // Artificial delay for testing loading states (remove in production).
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return response;
};

/**
 * Generates a query key for use with `react-query`'s `useQuery`.
 * The key is based on the provided URL query parameters for product filtering.
 *
 * @param params - The URL query parameters used for filtering products.
 * @returns An array representing the query key.
 */
export const getAllProductQueryKey = (
  params: GetAllProductsUrlQuery
): (string | number | undefined)[] => {
  return [
    "products",
    params.page,
    params.byCategory,
    params.dir,
    params.limit,
    params.sortBy,
    params.search,
  ];
};

/**
 * Custom hook to manage product fetching and filtering actions using `react-query`.
 *
 * This hook fetches product data based on URL query parameters, provides state
 * variables for loading and error status, and exposes functions to update
 * filters and reset them to defaults.
 *
 * @returns An object containing functions and data related to product actions:
 *     - isLoading: Boolean indicating if the initial product fetch is in
 *       progress.
 *     - error: Object containing error details if the product fetch failed.
 *     - isFetching: Boolean indicating if a product fetch request is currently
 *       in progress.
 *     - data: The fetched product data.
 *     - isFetched: Boolean indicating if the initial data fetch has completed
 *       successfully at least once.
 *     - isPlaceholderData: Boolean indicating if placeholder data is being
 *       shown (not implemented in this example, always false).
 */
export const useGetAllProductActions = () => {
  // Get the URL search parameters and a function to update them.
  let [searchParams, setSearchParams] = useSearchParams();

  // Access the product context to get current filter state and dispatch
  // function.
  const { state: productState, dispatch: productDispatch } =
    useProductContext();


  // Fetch products using react-query's useQuery hook, which provides caching,
  // automatic retries, and background updates.
  const {
    isLoading,
    error,
    isFetching,
    data,
    isFetched,
    isPlaceholderData,
    refetch,
  } = useQuery({
    // Generate a unique key for this query based on current filter parameters.
    queryKey: getAllProductQueryKey(productState.urlQuery),
    // The function to execute for fetching the data.
    queryFn: async () => {
      let res = await getAllProducts(productState.urlQuery);
      return res;
    },
  });

  // *** Removed Unused Code Sections ***

  // Return an object exposing relevant data and functions to components.
  return {
    isLoading,
    error,
    isFetching,
    data,
    isFetched,
    isPlaceholderData,
    refetch
    // ... other functions can be added here as needed
  };
};
