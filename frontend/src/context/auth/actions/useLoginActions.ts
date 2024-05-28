import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";

import api from "@/api";
import { LoginDto, LoginResponseModel } from "../AuthTypes";
import { useAuthContext } from "../AuthContext";
import {
  TokenDto,
  restStateAuthAction,
  updateSelfUserAction,
  updateTokenStateAuthAction
} from "./useAuthenticationActions";
import { useGetUserActions } from "@/context/user/actions/useGetUserActions";
import { useCreateCartActions } from "@/context/cart/actions/useCreateCartActions";

// Zod schema for validating login form data
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Sends a login request to the API.
 *
 * @param data - The login credentials (email and password).
 * @returns A promise that resolves to an Axios response containing the login response data.
 */
const loginApiRequestAsync = async (data: z.infer<typeof loginSchema>) => {
  const response = await api.post<
    LoginDto,
    AxiosResponse<LoginResponseModel, any>
  >("/auth/login", data);
  return response;
};

/**
 * Custom hook to handle user login using React Query.
 *
 * This hook manages the login process, including making the API request,
 * handling the response, and updating the authentication context.
 *
 * @returns An object containing functions and status related to the login mutation.
 */
export const useLoginActions = () => {
  const { dispatch: AuthDispatch } = useAuthContext();
  const { getUserAsync } = useGetUserActions();
  const { createCartAsync } = useCreateCartActions();

  // React Query mutation for the login request
  const {
    mutateAsync: loginMutationAsync,
    data: loginData,
    error: loginError,
    isError: isLoginError,
    isIdle: isLoginIdle,
    isPending: isLoginLoading,
    isSuccess: isLoginSuccess,
    reset: resetLogin,
  } = useMutation({
    mutationFn: loginApiRequestAsync,
    async onSuccess(data) {
      const token = data.data.data.token;

      if (token) {
        const decodedToken: TokenDto = jwt_decode(token);

        // Check for token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
          restStateAuthAction(AuthDispatch);
          return; // Exit early if the token is expired
        }

        // Update the token in the authentication state
        updateTokenStateAuthAction(
          {
            token,
            exp: decodedToken.exp,
            userId: decodedToken.nameid[0],
            isAdmin: typeof decodedToken.nameid[1] === 'string' ? decodedToken.nameid[1] : 'User',
          },
          AuthDispatch
        );

        try {
          // Fetch user data and create cart if necessary
          const user = await getUserAsync(decodedToken.nameid[0]);

          if (!user.data.data.cart) {
            const cart = await createCartAsync(decodedToken.nameid[0]);
            // Update user data with the new cart
            //@ts-ignore
            user.data.data.cart = cart.data.data;
          }

          // Update the user in the authentication state
          updateSelfUserAction(AuthDispatch, user.data.data);

        } catch (error) {
          console.error("Error fetching user data or creating cart:", error);
          // Consider adding more robust error handling here
        }

      } else {
        // Handle cases where the token is missing
        restStateAuthAction(AuthDispatch);
      }
    },
  });

  return {
    loginMutationAsync,
    loginData,
    loginError,
    isLoginError,
    isLoginLoading,
    isLoginSuccess,
    isLoginIdle,
    resetLogin,
  };
};

/**
 * Provides a form instance with validation using Zod and React Hook Form.
 *
 * @returns A form object pre-configured with validation rules for login.
 */
export const useLoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  return form;
};

