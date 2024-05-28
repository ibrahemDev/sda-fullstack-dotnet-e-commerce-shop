import { type ClassValue, clsx } from "clsx"
import { SetURLSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}



/**
 * Updates the URL search parameters based on the provided query parameters.
 * @param searchParams - The current URL search parameters.
 * @param setSearchParams - The function to set the URL search parameters.
 * @param query - The query parameters to update.
 */
export const updateUrlSearchParams = <T>(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  query: T | { [key: string]: string | undefined }
) => {
  for (const [key, value] of Object.entries(query as { [key: string]: string | undefined })) {
    if (value) {
      //@ts-ignore
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  }
  setSearchParams(searchParams);
};

export const generateKey = (pre: string | number) => {
  return `${pre}_${new Date().getTime()}`;
}
