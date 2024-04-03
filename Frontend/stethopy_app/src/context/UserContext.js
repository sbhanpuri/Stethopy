import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the Context
const UserContext = createContext();

// Step 2: Create a Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, no user is logged in

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Step 3: Create a custom hook to use the context
export const useUser = () => useContext(UserContext);
