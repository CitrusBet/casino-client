"use client"
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

const API_URL = 'https://casino-server-ruby.vercel.app';

interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  wallets?: Wallet[];
  [key: string]: unknown;
}

interface Wallet {
  address: string;
  network: string;
  balance: string;
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
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const uploadMedia = async (file: File, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/cloud/storage/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'File upload failed');
  }
  return `${API_URL}/cloud/storage/get/${data.data.fileName}`;
};

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const fetchWallets = async (authToken: string) => {
      try {
        const response = await fetch(`${API_URL}/auth/profile/balance`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProfile((prev) => prev ? { ...prev, wallets: data?.wallets || data || [] } : prev);
        }
      } catch (err) {
        console.log("Error fetching balance", err);
      }
    };
    if (token) {
      fetchWallets(token);
      interval = setInterval(() => {
        fetchWallets(token);
      }, 20000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [token]);

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
      setProfile((prev) => ({ ...data, wallets: prev?.wallets || [] }));
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

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token, fetchProfile]);

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
    setToken(null);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
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
        throw new Error(data.message || 'Failed to update profile');
      }
      setProfile(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to update profile');
        throw err;
      } else {
        setError('Failed to update profile');
        throw new Error('Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const updatePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to update password');
        throw err;
      } else {
        setError('Failed to update password');
        throw new Error('Failed to update password');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

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
    updatePassword,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};