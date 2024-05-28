import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { singleProductModel } from "../ProductType";

/**
 * Fetches a single product from the API by its ID.
 * @param productId - The ID of the product to fetch.
 * @returns A promise that resolves to an Axios response containing the product data.
 */
export const getProductAsync = async (productId: string) => {
    const response = await api.get<string, AxiosResponse<singleProductModel, any>>(`/products/${productId}`);
    return response;
};

/**
 * Custom hook to fetch a single product by its ID using React Query.
 * @param productId - The ID of the product to fetch.
 * @returns An object containing data and status related to the product query.
 */
export const useGetProductActions = (productId: string, enabled = true) => {
    // Use React Query's useQuery hook to fetch the product
    const {
        data,
        error,
        isError,
        isLoading,
        isPaused,
        isSuccess,
        failureCount,
        failureReason,
        refetch,
        status,
    } = useQuery({
        // Unique query key based on the product ID
        queryKey: ['product', productId],
        // Asynchronous function to fetch the product data
        queryFn: () => getProductAsync(productId),
        // Enabled only if productId is provided
        enabled: enabled
    });

    // Return an object containing data and status related to the product query
    return {
        res: data,
        error,
        isError,
        isLoading,
        isSuccess,
        refetch
    };
};
