import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state as null or a default state

  const login = (userData) => {
    setUser(userData); // A function to update the user state, e.g., upon login
  };

  const logout = () => {
    setUser(null); // Reset user state, e.g., upon logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
