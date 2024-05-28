import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UserModel } from "../UserType";

/**
 * Deletes a user by ID.
 *
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<AxiosResponse<UserModel, any>>} A promise that resolves to the Axios response.
 */
const deleteUser = async (userId: string): Promise<AxiosResponse<UserModel, any>> => {
  return api.delete(`/users/${userId}`);
};

/**
 * A React Hook that provides functionality for deleting users.
 *
 * @returns {object} An object containing the following functions and state variables:
 *   - deleteUserAsync: A function to initiate the user deletion process.
 *   - isDeletingUser: A boolean indicating whether a user deletion is currently in progress.
 *   - isUserDeleted: A boolean indicating whether the user deletion was successful.
 *   - deleteUserError: An object containing any errors that occurred during user deletion.
 */
export const useDeleteUserActions = () => {
  // Define a mutation using react-query's useMutation hook.
  // This hook provides functionality for performing asynchronous operations, like deleting a user.
  const {
    mutateAsync: deleteUserAsync, // Function to initiate the mutation (deleteUser in this case)
    isPending: isDeletingUser, // Boolean indicating if the mutation is in progress
    isSuccess: isUserDeleted, // Boolean indicating if the mutation was successful
    error: deleteUserError, // Object containing any errors during mutation
  } = useMutation({
    mutationFn: deleteUser, // The function to execute for the mutation
  });

  // Return an object containing the mutation function and state variables
  return {
    deleteUserAsync,
    isDeletingUser,
    isUserDeleted,
    deleteUserError,
  };
};
