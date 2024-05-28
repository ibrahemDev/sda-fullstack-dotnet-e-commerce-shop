import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { RegisterDto, RegisterResponseModel } from "../AuthTypes";
import { useAuthContext } from "../AuthContext";

// Zod schema for user registration data validation
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phoneNumber: z.string().min(10, 'Phone Number must be at least 10 characters'),
    firstName: z.string().min(2, 'First Name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last Name must be at least 2 characters'),
    dateOfBirth: z.string().transform((str) => new Date(str)).transform((date) => date.toISOString()),
});

/**
 * Sends a registration request to the API.
 * @param data - User registration data (email, password, etc.).
 * @returns A promise resolving to the API response.
 */
const registerApiRequestAsync = async (data: z.infer<typeof registerSchema>) => {
    // Prepare data for the API request
    const newData: RegisterDto = {
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        role: 0,
    }

    const response = await api.post<
        RegisterDto,
        AxiosResponse<RegisterResponseModel, any>
    >("/auth/register", newData);
    return response;
};



/**
 * Provides functionality for user registration using React Query.
 * @returns An object containing functions and state related to registration.
 */
export const useRegisterActions = () => {
    const { state: AuthState, dispatch: AuthDispatch } = useAuthContext();

    // React Query mutation hook for registration
    const {
        mutateAsync: registerMutationAsync,
        data: registerData,
        error: registerError,
        isError: isRegisterError,
        isIdle: isRegisterIdle,
        isPending: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        reset: resetRegister,
    } = useMutation({
        mutationFn: registerApiRequestAsync,
        onSuccess(data, variables, context) {
            // Optionally handle successful registration, e.g., redirect user
        },
        gcTime: 0,
    });

    return {
        registerMutationAsync,
        registerData,
        registerError,
        isRegisterError,
        isRegisterLoading,
        isRegisterSuccess,
        isRegisterIdle,
        resetRegister,
    };
};




/**
 * Creates and configures a registration form instance with validation.
 * @returns A form object pre-configured for user registration.
 */
export const useRegisterForm = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

    return form;
}

