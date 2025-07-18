//not sure if this is best folder to put this file in, but it is used by the Login page
//stores a global or app-wide authentication state to tell if the user is logged in.

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');     // check if token exists in localStorage
    setIsLoggedIn(!!token);
  }, []);

  const login = (token) => {                    //gives user token if localStorage has token
    localStorage.setItem('token', token);       //could set time limit later to automatically log out if idle
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
