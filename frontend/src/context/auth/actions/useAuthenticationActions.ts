import { Dispatch, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { SingleUser } from "@/context/user/UserType";
import { AuthReducerAction, AuthReducerActionsType } from "../AuthReduser";
import { jwtTokenType, useAuthContext } from "../AuthContext";
import { useGetUserActions } from "@/context/user/actions/useGetUserActions";
import { useCreateCartActions } from "@/context/cart/actions/useCreateCartActions";

/**
 * Token Data Transfer Object (DTO)
 */
export type TokenDto = {
  nameid: string[];
  aud: string;
  iss: string;
  nbf: number;
  exp: number;
  iat: number;
};

/**
 * Updates the user state in the authentication context.
 *
 * @param dispatch - The dispatch function for the authentication reducer.
 * @param userData - The updated user data.
 */
export const updateSelfUserAction = (
  dispatch: Dispatch<AuthReducerActionsType>,
  userData: SingleUser
): void => {
  dispatch({
    type: AuthReducerAction.UPDATE_USER_STATE,
    payload: userData,
  });
};

/**
 * Sets the authentication state to indicate whether authentication is in progress.
 *
 * @param dispatch - The dispatch function for the authentication reducer.
 * @param isAuthenticating - True if authentication is in progress, false otherwise.
 */
export const setIsAuthenticating = (
  dispatch: Dispatch<AuthReducerActionsType>,
  isAuthenticating: boolean
): void => {
  dispatch({
    type: AuthReducerAction.SET_IS_AUTHENTICATING,
    payload: isAuthenticating,
  });
};


/**
 * Resets the authentication state and removes the token from local storage.
 *
 * @param dispatch - The dispatch function for the authentication reducer.
 */
export const restStateAuthAction = (
  dispatch: Dispatch<AuthReducerActionsType>
): void => {
  localStorage.removeItem("token");
  dispatch({
    type: AuthReducerAction.RESET_AUTH_STATE,
    payload: undefined,
  });
};

/**
 * Updates the token state in the authentication context and local storage.
 *
 * @param token - The JWT token (or undefined to clear the token).
 * @param dispatch - The dispatch function for the authentication reducer.
 */
export const updateTokenStateAuthAction = (
  token: jwtTokenType | undefined,
  dispatch: Dispatch<AuthReducerActionsType>
): void => {
  if (token) {
    localStorage.setItem("token", token.token);
  } else {
    localStorage.removeItem("token"); // Ensure token is removed if undefined
  }
  dispatch({
    type: AuthReducerAction.UPDATE_TOKEN_STATE,
    payload: token,
  });
};

/**
 * Handles the login process by decoding the JWT token,
 * fetching user data, and updating the authentication context.
 *
 * @param token - The JWT token.
 * @param dispatch - The dispatch function for the authentication reducer.
 */
export const loginHandelTokenAction = (
  token: string | null,
  dispatch: React.Dispatch<AuthReducerActionsType>
): void => {
  const { getUserAsync } = useGetUserActions();
  const { createCartAsync } = useCreateCartActions();

  if (token) {
    const decodedToken: TokenDto = jwt_decode(token);

    // Check if the token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      restStateAuthAction(dispatch);
      return; // Exit early if token is expired
    }

    updateTokenStateAuthAction(
      {
        token: token,
        exp: decodedToken.exp,
        userId: decodedToken.nameid[0],
        isAdmin: typeof decodedToken.nameid[1] === 'string' ? decodedToken.nameid[1] : 'User', // Assuming isAdmin is a string
      },
      dispatch
    );

    // Fetch user data after updating the token state
    getUserAsync(decodedToken.nameid[0])
      .then((user) => {
        // If the user doesn't have a cart, create one
        if (!user.data.data.cart) {
          createCartAsync(decodedToken.nameid[0])
            .then((cart) => {
              // Update the user object with the new cart data
              //@ts-ignore
              user.data.data.cart = cart.data.data;
              updateSelfUserAction(dispatch, user.data.data);
            })
            .catch((error) => {
              // Handle cart creation error, e.g., log the error
              console.error("Error creating cart:", error);
            });
        } else {
          // User already has a cart, update the user state
          updateSelfUserAction(dispatch, user.data.data);
        }
      })
      .catch((error) => {
        // Handle user fetch error, e.g., log the error 
        console.error("Error fetching user data:", error);
      });
  } else {
    // If the token is null, reset the authentication state
    restStateAuthAction(dispatch);
  }
};


/**
 * Enum for different user roles.
 */
export enum RolesTypes {
  User = "User",
  Admin = "Admin",
  Guest = "Guest",
}

/**
 * Custom hook to manage authentication actions and state.
 *
 * @returns An object containing authentication state, dispatch function, and helper functions.
 */
export const useAuthenticationActions = () => {
  const { state: AuthState, dispatch: AuthDispatch } = useAuthContext();

  return {
    role:
      typeof AuthState.token !== "undefined"
        ? AuthState.token?.isAdmin === "Admin"
          ? RolesTypes.Admin
          : RolesTypes.User
        : RolesTypes.Guest,
    AuthState,
    AuthDispatch,
    token: AuthState.token,
    user: AuthState.user,
    isLoggedIn: (AuthState.token?.exp || 0) * 1000 > Date.now(),
    isLoggedInfn: () => (AuthState.token?.exp || 0) * 1000 > Date.now(),
    isAdmin: AuthState.token?.isAdmin === "Admin",
    userId: AuthState.token?.userId,
    logout: () => restStateAuthAction(AuthDispatch),
    updateTokenStateAuthAction: (token: jwtTokenType | undefined) =>
      updateTokenStateAuthAction(token, AuthDispatch),
    loginHandelToken: (token: string | null) =>
      loginHandelTokenAction(token, AuthDispatch),
    updateSelfUserAction: (userData: SingleUser) =>
      updateSelfUserAction(AuthDispatch, userData),
  };
};

