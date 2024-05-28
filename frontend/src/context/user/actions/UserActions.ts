/**
 * @file Provides actions and state management logic related to User data using React's Context API.
 * @module UserActions
 */
import { AxiosResponse } from "axios";
import api from "@/api";
import { UpdateUserDto, UserModel } from "../UserType";
import { UserReducerAction, UserReducerActionsType, GetAllUsersUrlQuery } from "../UserReduser";
import { useUserContext } from "../UserContext";


/**
 * Sends a PUT request to update user data.
 *
 * @async
 * @param {string} userId - The ID of the user to update.
 * @param {UpdateUserDto} user - The updated user data.
 * @returns {Promise<AxiosResponse>} A promise that resolves to the Axios response.
 */
const updateUser = async (userId: string, user: UpdateUserDto): Promise<AxiosResponse> => {
  const response = await api.put<string, AxiosResponse<UserModel, any>, UpdateUserDto>(`/api/users/${userId}`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

/**
 * Dispatches an action to update user filters in the URL query parameters.
 *
 * @param {React.Dispatch<UserReducerActionsType>} userDispatch - The Redux dispatch function for user actions.
 * @param {GetAllUsersUrlQuery} filters - The filters to apply to the user list.
 */
const updateUserFiltersAction = (
  userDispatch: React.Dispatch<UserReducerActionsType>,
  filters: GetAllUsersUrlQuery
) => {
  userDispatch({ type: UserReducerAction.UPDATE_URL_QUERY, payload: filters });
};

/**
 * Dispatches an action to reset user filters in the URL query parameters.
 *
 * @param {React.Dispatch<UserReducerActionsType>} userDispatch - The Redux dispatch function for user actions.
 */
const resetUserFiltersAction = async (userDispatch: React.Dispatch<UserReducerActionsType>) => {
  userDispatch({ type: UserReducerAction.RESET, payload: undefined });
};

/**
 * A custom hook that provides access to user-related state, actions, and dispatch functions.
 *
 * @returns {{ userState: UserState, userDispatch: React.Dispatch<UserReducerActionsType>, updateUserFiltersAction: (filters: GetAllUsersUrlQuery) => void, resetUserFiltersAction: () => void }} An object containing user state, dispatch function, and actions.
 */
export const useUserActions = () => {
  const { state: userState, dispatch: userDispatch } = useUserContext();
  return {
    userState,
    userDispatch,
    updateUserFiltersAction: (filters: GetAllUsersUrlQuery) => updateUserFiltersAction(userDispatch, filters),
    resetUserFiltersAction: () => resetUserFiltersAction(userDispatch),
  }
}
