import React from "react";
import {
  createContext,
  useEffect,
  useReducer,
  PropsWithChildren,
  Dispatch,
} from "react";
import jwt_decode from "jwt-decode";

import { SingleUser } from "../user/UserType";
import { useGetUserActions } from "../user/actions/useGetUserActions";
import { useCreateCartActions } from "../cart/actions/useCreateCartActions";
import {
  AuthReducerActionsType,
  authReducer,
} from "./AuthReduser"; // Assuming this import is correct
import {
  restStateAuthAction,
  updateSelfUserAction,
  updateTokenStateAuthAction,
  setIsAuthenticating,
} from "./actions/useAuthenticationActions";


/**
 * Token Data Transfer Object (DTO) for decoding JWT.
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
 * Type definition for the decoded JWT token.
 */
export type jwtTokenType = {
  token: string;
  exp: number;
  userId: string;
  isAdmin: string;
};

/**
 * Interface for the authentication context state.
 */
export interface AuthContextStateType {
  token?: jwtTokenType;
  user?: SingleUser;
  isAuthenticating: boolean;
}

/**
 * Initial state for the authentication context.
 */
const authContextState: AuthContextStateType = {
  token: undefined,
  user: undefined,
  isAuthenticating: true, // Indicates authentication is in progress initially
};

/**
 * Create the authentication context.
 * This context provides authentication state and dispatch function.
 */
const AuthContext = createContext<{
  state: AuthContextStateType;
  dispatch: Dispatch<AuthReducerActionsType>;
}>({
  state: authContextState,
  dispatch: () => null, // Default dispatcher that does nothing
});

/**
 * Authentication Context Provider Component.
 *
 * Provides the authentication context to its children components.
 * Manages the authentication state, handles token validation, and user data fetching.
 *
 * @param {PropsWithChildren} props - React component props including children.
 * @returns {JSX.Element} - React component providing the authentication context.
 */
export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, authContextState);
  const { getUserAsync } = useGetUserActions();
  const { createCartAsync } = useCreateCartActions();

  // Effect to handle token expiration countdown (using setInterval)
  useEffect(() => {
    if (!state.token) {
      return;
    }
    let countdownInterval: NodeJS.Timer | undefined;

    // Calculate the time until the token expires
    const timeUntilExpiry = (state.token.exp * 1000) - Date.now();

    // Only set the interval if the token is not already expired
    if (timeUntilExpiry > 0) {
      countdownInterval = setInterval(() => {
        restStateAuthAction(dispatch);
      }, timeUntilExpiry);
    }

    // Cleanup function to clear the interval when the component unmounts or the token changes
    return () => clearInterval(countdownInterval as number | undefined);
  }, [state.token]);

  // Effect to handle initial token validation and user data fetching on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken: TokenDto = jwt_decode(token);

      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        restStateAuthAction(dispatch);
        setIsAuthenticating(dispatch, false);
      } else {
        // Token is valid, update token state and fetch user data
        updateTokenStateAuthAction(
          {
            token,
            exp: decodedToken.exp,
            userId: decodedToken.nameid[0],
            isAdmin: typeof decodedToken.nameid[1] === "string"
              ? decodedToken.nameid[1]
              : "User",
          },
          dispatch
        );

        // Fetch user data and handle cart creation if necessary
        getUserAsync(decodedToken.nameid[0])
          .then((userResponse) => {
            const user = userResponse.data.data;
            if (!user.cart) {
              createCartAsync(decodedToken.nameid[0])
                .then((cartResponse) => {
                  // Update user object with the new cart data
                  //@ts-ignore
                  user.cart = cartResponse.data.data;
                  updateSelfUserAction(dispatch, user);
                  setIsAuthenticating(dispatch, false);
                })
                .catch((error) => {
                  console.error("Error creating cart:", error);
                  setIsAuthenticating(dispatch, false);
                });
            } else {
              // User already has a cart
              updateSelfUserAction(dispatch, user);
              setIsAuthenticating(dispatch, false);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setIsAuthenticating(dispatch, false);
          });
      }
    } else {
      // No token found, set authentication to false
      restStateAuthAction(dispatch);
      setIsAuthenticating(dispatch, false);
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 *
 * @returns {object} - The authentication context value 
 *                    (state and dispatch function).
 */
export const useAuthContext = () => React.useContext(AuthContext);

