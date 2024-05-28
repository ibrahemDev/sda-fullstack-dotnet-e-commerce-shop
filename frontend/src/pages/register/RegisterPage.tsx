import React from 'react';
import RegisterForm from './RegisterForm';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Link } from 'react-router-dom';

/**
 * RegisterPage component for user registration.
 *
 * This component renders a registration form and provides a link to the login page.
 */
const RegisterPage: React.FC = () => {
  return (
    // Container for centering content
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 dark:bg-gray-950">

      {/* Card container for the registration form */}
      <Card className="w-full max-w-md m-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join us and start exploring amazing deals!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* RegisterForm component for handling registration functionality */}
          <RegisterForm />
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;

