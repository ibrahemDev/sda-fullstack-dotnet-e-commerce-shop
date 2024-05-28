import React from "react";

// React Router DOM for navigation
import { Link, useNavigate } from "react-router-dom";

// Import custom hooks and types for login functionality
import { loginSchema, useLoginActions, useLoginForm } from "@/context/auth/actions/useLoginActions";
import { LoginDto } from "@/context/auth/AuthTypes";

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";

/**
 * LoginForm component for user authentication.
 *
 * @returns {JSX.Element} The LoginForm component.
 */
const LoginForm: React.FC = () => {
  // Get form state and submission handlers from useLoginForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  // Get login mutation function and loading/error states from useLoginActions hook
  const { loginMutationAsync, isLoginLoading, isLoginError } = useLoginActions();

  // Get navigate function from react-router-dom for redirection
  const navigate = useNavigate();

  /**
   * Handles form submission.
   *
   * @param {LoginDto} data - The login form data.
   */
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // Call login mutation with form data and success/error callbacks
    await loginMutationAsync(data, {
      onSuccess: () => {
        // Redirect to dashboard on successful login
        navigate("/");
      },
      onError: () => {
        // Log error message to console on login failure
        console.error("Login failed!");
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="forgetPassword" className="text-sm font-medium text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
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

        {/* Login button */}
        <Button
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
          type="submit"
          disabled={isLoginLoading}
        >
          {isLoginLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Display login error message if applicable */}
        {isLoginError && <p className="text-red-500 text-xs italic mt-4">Invalid email or password.</p>}
      </form>
    </>
  );
};

export default LoginForm;

