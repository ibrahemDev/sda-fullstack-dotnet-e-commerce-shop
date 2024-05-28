import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Represents a single category entity.
 */
interface Category {
    _categoryId: string;
    categoryId: string;
    name: string;
    description: string;
}

/**
 * Defines the structure of the API response for retrieving all categories.
 */
interface GetAllCategoriesApiResponse {
    success: boolean;
    message: string | null;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    data: {
        items: Category[];
    };
}

/**
 * Fetches all categories from the API.
 *
 * @returns A promise that resolves to an AxiosResponse containing the categories data.
 */
const getAllCategories = async (): Promise<AxiosResponse<GetAllCategoriesApiResponse>> => {
    return api.get<string, AxiosResponse<GetAllCategoriesApiResponse>, any>(`/categories?limit=100`);
};

/**
 * Generates the query key for the `useGetAllCategoriesActions` hook.
 *
 * @returns An array containing the query key.
 */
const getAllCategoriesQueryKey = (): string[] => ["getAllCategories"];

/**
 * Custom hook for managing the retrieval of all categories.
 *
 * @returns An object containing properties related to the query state and data.
 */
export const useGetAllCategoriesActions = () => {
    const {
        isLoading,
        error,
        isFetching,
        data,
        isFetched,
        isPlaceholderData,
        refetch,
    } = useQuery({
        queryKey: getAllCategoriesQueryKey(),
        queryFn: getAllCategories, // Directly use the function reference
    });

    return {
        isLoading,
        error,
        isFetching,
        data,
        isFetched,
        isPlaceholderData,
        refetch,
    };
};

