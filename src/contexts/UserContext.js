"use client"
import React, { createContext, useContext, useState, useCallback } from 'react';

const API_URL = 'https://casino-server-ruby.vercel.app';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const { token: newToken } = data;
      setToken(newToken);
      localStorage.setItem('token', newToken);

      await fetchProfile(newToken);
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const { token: newToken } = data;
      setToken(newToken);
      localStorage.setItem('token', newToken);

      await fetchProfile(newToken);
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async (authToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      setProfile(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setToken(null);
      setProfile(null);
      localStorage.removeItem('token');
    } catch (err) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      setProfile(data);
    } catch (err) {
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      fetchProfile(token).catch(() => {
        setToken(null);
        localStorage.removeItem('token');
      });
    }
  }, [token, fetchProfile]);

  const value = {
    token,
    profile,
    isLoading,
    error,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
