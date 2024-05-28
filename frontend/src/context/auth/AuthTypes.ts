import { User } from "../user/UserType";

/**
 * Data Transfer Object (DTO) for user registration.
 */
export type RegisterDto = {
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    role: number;
};

/**
 * Response model for user registration API requests.
 */
export type RegisterResponseModel = {
    success: boolean;
    message: string | null;
    data: User
};

/**
 * Data Transfer Object (DTO) for user login.
 */
export type LoginDto = {
    email: string;
    password: string;
};

/**
 * Response model for user login API requests.
 */
export type LoginResponseModel = {
    success: boolean;
    message: string | null;
    data: {
        userDto: User;
        token: string;
    };
};

