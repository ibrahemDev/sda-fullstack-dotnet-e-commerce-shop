import React from "react";

// React Router DOM for navigation
import { Link, useNavigate } from "react-router-dom";

// Import custom hooks and types for register functionality
import { registerSchema, useRegisterActions, useRegisterForm } from "@/context/auth/actions/useRegisterActions";
import { RegisterDto } from "@/context/auth/AuthTypes";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";

/**
 * RegisterForm component for user registration.
 *
 * @returns {JSX.Element} The RegisterForm component.
 */
const RegisterForm: React.FC = () => {
    // Get form state and submission handlers from useRegisterForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useRegisterForm();

    // Get register mutation function and loading/error states from useRegisterActions hook
    const { registerMutationAsync, isRegisterLoading, isRegisterError } = useRegisterActions();

    // Get navigate function from react-router-dom for redirection
    const navigate = useNavigate();

    /**
     * Handles form submission.
     *
     * @param {RegisterDto} data - The register form data.
     */
    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        // Call register mutation with form data and success/error callbacks
        await registerMutationAsync(data, {
            onSuccess: () => {
                // Redirect to login page on successful registration
                navigate("/login");
            },
            onError: () => {
                // Log error message to console on registration failure
                console.error("Registration failed!");
                // You can enhance error handling here, e.g., display a user-friendly error message
            },
        });
    };

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {/* Email input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.email.message}</p>
                    )}
                </div>

                {/* Password input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.password.message}</p>
                    )}
                </div>

                {/* First Name input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.firstName.message}</p>
                    )}
                </div>

                {/* Last Name input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.lastName.message}</p>
                    )}
                </div>

                {/* Phone Number input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register("phoneNumber")}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.phoneNumber.message}</p>
                    )}
                </div>

                {/* Date of Birth input field */}
                <div className="space-y-2 flex flex-col items-start">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 dark:focus:border-blue-500"
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth")}
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-xs italic mt-2">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                {/* Register button */}
                <Button
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                    type="submit"
                    disabled={isRegisterLoading}
                >
                    {isRegisterLoading ? "Registering..." : "Register"}
                </Button>

                {/* Display registration error message if applicable */}
                {isRegisterError && <p className="text-red-500 text-xs italic mt-4">Registration failed. Please try again.</p>}
            </form>
        </>
    );
};

export default RegisterForm;

