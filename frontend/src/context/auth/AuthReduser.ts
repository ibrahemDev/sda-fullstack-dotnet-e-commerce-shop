import type { ActionMap } from "../GlobalContextTypes";
import { SingleUser } from "../user/UserType";
import { AuthContextStateType, jwtTokenType } from "./AuthContext";

/**
 * Enum defining possible actions for the AuthReducer.
 * Each action represents an operation that can update the authentication state.
 */
export enum AuthReducerAction {
  UPDATE_TOKEN_STATE = "UPDATE_TOKEN_STATE", // Updates the JWT token 
  RESET_AUTH_STATE = "RESET_AUTH_STATE",   // Resets the authentication state 
  UPDATE_USER_STATE = "UPDATE_USER_STATE",   // Updates user information 
  SET_IS_AUTHENTICATING = "SET_IS_AUTHENTICATING", // Sets whether authentication is in progress
}

/**
 * Type definitions for the payload of each AuthReducer action.
 * This ensures type safety and clarity about the data structure expected for each action.
 */
type AuthReducerPayload = {
  [AuthReducerAction.UPDATE_TOKEN_STATE]: jwtTokenType | undefined;
  [AuthReducerAction.RESET_AUTH_STATE]: void;
  [AuthReducerAction.UPDATE_USER_STATE]: SingleUser;
  [AuthReducerAction.SET_IS_AUTHENTICATING]: boolean;
};

// Generate Action type for the reducer using ActionMap utility type
export type AuthReducerActionsType = ActionMap<AuthReducerPayload>[keyof ActionMap<AuthReducerPayload>];

/**
 * Reducer function for managing the authentication state in the application.
 *
 * This reducer handles actions related to user authentication,
 * including updating the token, resetting the state, and managing user data. 
 *
 * @param {AuthContextStateType} state - The current state of the authentication context.
 * @param {AuthReducerActionsType} action - The action being dispatched, containing 
 *                                        a type and optional payload.
 * @returns {AuthContextStateType} - The updated authentication state after processing the action. 
 */
export const authReducer = (
  state: AuthContextStateType,
  action: AuthReducerActionsType
): AuthContextStateType => {
  switch (action.type) {
    case AuthReducerAction.UPDATE_TOKEN_STATE:
      // Update the JWT in the state
      return {
        ...state,
        token: action.payload,
      };

    case AuthReducerAction.UPDATE_USER_STATE:
      // Update the user information in the state
      return {
        ...state,
        user: action.payload,
      };

    case AuthReducerAction.RESET_AUTH_STATE:
      // Reset the authentication state to its initial values
      return {
        ...state,
        token: undefined,
        user: undefined,
      };

    case AuthReducerAction.SET_IS_AUTHENTICATING:
      // Update the 'isAuthenticating' flag, useful for indicating loading states
      return {
        ...state,
        isAuthenticating: action.payload,
      };

    default:
      // If the action type is not recognized, return the current state without changes
      return state;
  }
};

