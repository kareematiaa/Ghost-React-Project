import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Run once on load to restore user data from localStorage token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setUserId(decoded.id);
      setUserName(decoded.fullName);
      setUserEmail(decoded.email);
      setUserPhone(decoded.phoneNumber);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (response) => {
    const { token } = response;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setToken(token);
    setUserId(decoded.id);
    setUserName(decoded.fullName);
    setUserEmail(decoded.email);
    setUserPhone(decoded.phoneNumber);
    setIsAuthenticated(true);
  };

  const Register = (response) => {
    const { token } = response;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setToken(token);
    setUserId(decoded.id);
    setUserName(decoded.fullName);
    setUserEmail(decoded.email);
    setUserPhone(decoded.phoneNumber);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserPhone(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        userName,
        userEmail,
        userPhone,
        token,
        isAuthenticated,
        login,
        Register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
