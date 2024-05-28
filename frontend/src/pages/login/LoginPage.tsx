import React from 'react';
import LoginForm from './LoginForm';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Link } from 'react-router-dom';

/**
 * LoginPage component for user authentication.
 *
 * This component renders a login form and provides a link to the registration page.
 */
const LoginPage: React.FC = () => {
  return (
    // Container for centering content
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 dark:bg-gray-950">

      {/* Card container for the login form */}
      <Card className="w-full max-w-md m-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Log in to start shopping and explore amazing deals!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* LoginForm component for handling login functionality */}
          <LoginForm />
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            New to our store?{' '}
            <Link to="/register" className="font-medium text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
