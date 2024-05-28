/**
 * @file Defines the reducer logic for managing user-related state.
 */
import type { ActionMap } from '../GlobalContextTypes';


/**
 * Represents the initial state for the user reducer.
 */
export type UserInitialStateType = {
  urlQuery: GetAllUsersUrlQuery;
};

/**
 * Represents the query parameters used for fetching and filtering users.
 */
export type GetAllUsersUrlQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'createdat';
  dir?: 'Asc' | 'Desc';
};

/**
 * Defines the possible actions for the user reducer.
 */
export enum UserReducerAction {
  // Not used in the current implementation, consider removing if not needed
  // UPDATE_USER = 'UPDATE_USER',
  UPDATE_URL_QUERY = 'UPDATE_URL_QUERY',
  RESET = 'RESET',
}

/**
 * Maps user reducer actions to their corresponding payloads.
 */
type UserReducerPayload = {
  // UPDATE_USER: User[];  // Unused payload, can be removed if the action is removed
  UPDATE_URL_QUERY: GetAllUsersUrlQuery;
  RESET: void;
};

/**
 * Defines the type for actions accepted by the user reducer.
 */
export type UserReducerActionsType = ActionMap<UserReducerPayload>[keyof ActionMap<
  UserReducerPayload
>];

/**
 * Reducer function to manage updates to the user state.
 *
 * @param {UserInitialStateType} state - The current state.
 * @param {UserReducerActionsType} action - The action to be performed.
 * @returns {UserInitialStateType} The updated state.
 */
export const userReducer = (
  state: UserInitialStateType,
  action: UserReducerActionsType,
): UserInitialStateType => {
  switch (action.type) {
    case UserReducerAction.UPDATE_URL_QUERY:
      // Update the URL query parameters in the state, overriding existing values.
      return {
        ...state,
        urlQuery: {
          ...state.urlQuery,
          ...action.payload,
        },
      };

    case UserReducerAction.RESET:
      // Reset the URL query parameters to their default values.
      return {
        ...state,
        urlQuery: {
          page: 1,
          limit: 25,
          sortBy: 'name',
          dir: 'Asc',
        },
      };

    default:
      // For unknown actions, return the state unchanged.
      return state;
  }
};

