/**
 * Context: AuthContext
 * Provides global user state, role handling, and rapid switching for prototyping.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const [currentUser, usersList] = await Promise.all([
        authService.getCurrentUser(),
        authService.getAllUsers()
      ]);
      setUser(currentUser);
      setAllUsers(usersList);
    } catch (err) {
      console.error('Error fetching auth state:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email) => {
    const loggedUser = await authService.login(email);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (userData) => {
    const newUser = await authService.register(userData);
    setUser(newUser);
    const updatedUsers = await authService.getAllUsers();
    setAllUsers(updatedUsers);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchDevUser = async (userId) => {
    const switched = await authService.switchUser(userId);
    setUser(switched);
    return switched;
  };

  const refreshUser = async () => {
    const current = await authService.getCurrentUser();
    setUser(current);
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    allUsers,
    login,
    register,
    logout,
    switchDevUser,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
