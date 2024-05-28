/**
 * @file Defines the User Context and Provider for managing global user state.
 */
import React, { PropsWithChildren, createContext, useReducer } from 'react';

// Import types and reducer logic for user state management.
import {
  UserInitialStateType,
  UserReducerActionsType,
  userReducer,
} from './UserReduser';

// Define the initial state for the user context.
const userInitialState: UserInitialStateType = {
  urlQuery: {
    page: 1,
    limit: 25,
    sortBy: 'name',
    dir: 'Asc',
    search: undefined,
  },
};

// Create the User Context with initial state and a placeholder dispatch function.
// This context will be used to share user state and its update mechanism.
const UserContext = createContext<{
  state: UserInitialStateType;
  dispatch: React.Dispatch<UserReducerActionsType>;
}>({
  state: userInitialState,
  dispatch: () => null, // Placeholder, will be replaced in the provider.
});

/**
 * Provides the user context to its children components.
 *
 * @param {PropsWithChildren} props - React properties including children components.
 * @returns {React.ReactElement} - The UserContext.Provider component.
 */
export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // Initialize state and dispatch using the reducer and initial state.
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  return (
    // Provide the state and dispatch to all children components within the tree.
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to access the user context.
 *
 * @returns {object} - The user context value containing state and dispatch.
 */
export const useUserContext = () => React.useContext(UserContext);

