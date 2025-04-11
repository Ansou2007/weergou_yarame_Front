// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    setIsLoading(true);
    setUserToken(token);
    await AsyncStorage.setItem('token', token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem('token');
  
    // Rediriger vers l'écran de login
    router.replace('/connexion_inscription/LoginScreen');
  
    setIsLoading(false);
  };
  

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) setUserToken(token);
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
