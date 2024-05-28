import api from "@/api";
import { AxiosResponse } from "axios";
import { SingleUserResponse } from "../UserType";
import { useMutation } from "@tanstack/react-query";

/**
 * Fetches a single user by their ID.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<AxiosResponse<SingleUserResponse, any>>} A promise that resolves to the Axios response containing the user data.
 */
export const getUser = async (userId: string): Promise<AxiosResponse<SingleUserResponse, any>> => {
  const response = await api.get<string, AxiosResponse<SingleUserResponse, any>>(`/users/${userId}`);
  return response;
};

/**
 * A custom React hook that provides actions related to fetching a single user.
 *
 * @returns {object} An object containing functions and data related to a single user.
 */
export const useGetUserActions = () => {
  // Extract the userId from the URL parameters (if needed)
  // const { userId } = useParams(); 

  // Initialize a useMutation hook for fetching a user using react-query.
  const {
    data: res, // Renamed for clarity, as 'res' represents the response data
    error,
    isError,
    isIdle,
    isPending,
    isSuccess,
    mutateAsync: getUserAsync // Renamed for clarity - this function fetches the user
  } = useMutation({
    mutationFn: getUser // The function used to fetch the user data
  });

  return {
    res, // The user data returned from the API call
    error, // Error object if the API call fails
    isError, // Boolean indicating if an error occurred
    isIdle, // Boolean indicating if the mutation is idle
    isPending, // Boolean indicating if the mutation is in progress
    isSuccess, // Boolean indicating if the mutation was successful
    getUserAsync // Function to initiate fetching the user data
  };
};

