import api from "@/api";
import { updateUrlSearchParams } from "@/lib/utils";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { GetAllUsersUrlQuery } from "../UserReduser";
import { UserModel } from "../UserType";
import { useMutation } from "@tanstack/react-query";
import { useUserActions } from "./UserActions";
import { useQuery } from "react-query";

/**
 * Fetches a list of users based on provided query parameters.
 *
 * @param {GetAllUsersUrlQuery} params - An object containing query parameters for filtering users.
 * @returns {Promise<AxiosResponse<UserModel, any>>} A promise that resolves to the Axios response containing the user data.
 */
const getAllUsers = async (params: GetAllUsersUrlQuery): Promise<AxiosResponse<UserModel, any>> => {
  // Construct the query string from provided parameters, filtering out undefined values.
  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Make an API request to fetch users with the constructed query string.
  const response = await api.get<string, AxiosResponse<UserModel, any>, GetAllUsersUrlQuery>(`/users?${queryString}`);
  return response;
};


export const getAllUsersQueryKey = (
  params: GetAllUsersUrlQuery
): (string | number | undefined)[] => {
  return [
    "products",
    params.page,
    params.dir,
    params.limit,
    params.sortBy,
    params.search,
  ];
};



/**
 * A custom React hook that manages actions related to fetching and filtering users.
 *
 * @returns {object} An object containing functions and data related to user management.
 */
export const useGetAllUserActions = () => {
  // Get the search parameters and the function to update them from react-router-dom
  let [searchParams, setSearchParams] = useSearchParams();

  // Access user-related actions and state from the UserActions context.
  const { resetUserFiltersAction, updateUserFiltersAction, userState } = useUserActions();

  // Initialize a useMutation hook for fetching users with react-query.
  // We destructure the properties we need from the mutation object.
  const {
    isLoading,
    error,
    isFetching,
    data,
    isFetched,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: getAllUsersQueryKey(userState.urlQuery),
    // The function to execute for fetching the data.
    queryFn: async () => {
      let res = await getAllUsers(userState.urlQuery);
      return res;
    },

  });

  // useEffect to update url search parameters whenever userState.urlQuery changes
  useEffect(() => {
    updateUrlSearchParams(searchParams, setSearchParams, userState.urlQuery);
  }, [userState.urlQuery]); // Only trigger when userState.urlQuery changes

  return {
    isLoading,
    error,
    isFetching,
    data,
    isFetched,
    isPlaceholderData,
    refetch, // Boolean indicating if the mutation was successful

  };
};




/*
   MOVE inside PAGE SECEEN
   useEffect(() => {
       const sortByCheck: string[] = ["name", "email", "createdat"];
       let sortBy = searchParams.get('sortBy') == null ? "name" : searchParams.get('sortBy') as string
       sortBy = sortByCheck.includes(sortBy) ? sortBy : "name";
       updateUserFilters(userDispatch, {
           page: Number.parseInt(searchParams.get('page') || '1'),
           limit: 25,
           sortBy: sortBy as "name" | "email" | "createdat" | undefined,
           dir: searchParams.get('dir') == "Asc" ? "Asc" : "Desc",
       });
   }, []);*/