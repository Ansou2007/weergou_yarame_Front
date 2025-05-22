import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null); // 👈 Stockage de l'utilisateur
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token, userData) => {
    setIsLoading(true);
    setUserToken(token);
    setUser(userData);
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData)); // 👈 stockage de l'objet user
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    // router.replace('/connexion_inscription/LoginScreen');
    router.replace('/accueil/');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (token) setUserToken(token);
      if (storedUser) setUser(JSON.parse(storedUser)); // 👈 chargement du user
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour plus de lisibilité
export const useAuth = () => useContext(AuthContext);
