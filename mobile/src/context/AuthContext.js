import React, { createContext, useState } from 'react';
import apiClient from '../services/api'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });

      if (response.data) {
        setUser(response.data); 
        setUserToken(response.data.token);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Register
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/register', {
        fullName: name, 
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error("Register Error:", error.response?.data?.message || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, userToken, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};