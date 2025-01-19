import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to access the context easily
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
