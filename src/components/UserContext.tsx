"use client"
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

const API_URL = 'https://casino-server-ruby.vercel.app';

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  [key: string]: unknown;
}

interface Credentials {
  [key: string]: unknown;
}

interface UserContextType {
  token: string | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (userData: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Credentials) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchProfile = useCallback(async (authToken: string | null) => {
    if (!authToken) return;
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch profile');
        throw err;
      } else {
        setError('Failed to fetch profile');
        throw new Error('Failed to fetch profile');
      }
    }
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
      }
      await fetchProfile(newToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
        throw err;
      } else {
        setError('Login failed');
        throw new Error('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const register = useCallback(async (userData: Credentials) => {
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
      }
      await fetchProfile(newToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Registration failed');
        throw err;
      } else {
        setError('Registration failed');
        throw new Error('Registration failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setToken(null);
      setProfile(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Logout failed');
        throw err;
      } else {
        setError('Logout failed');
        throw new Error('Logout failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData: Credentials) => {
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Profile update failed');
        throw err;
      } else {
        setError('Profile update failed');
        throw new Error('Profile update failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProfile(token).catch(() => {
        setToken(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      });
    }
  }, [token, fetchProfile]);

  const value: UserContextType = {
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