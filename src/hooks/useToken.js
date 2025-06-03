'use client';

import { useUser } from '../contexts/UserContext';
import { validateTokenAndGetUser, generateToken } from '../contexts/UserContext';

export function useToken() {
  const { getToken, validateCurrentToken, refreshUserFromToken } = useUser();

  const isTokenValid = () => {
    try {
      const userData = validateCurrentToken();
      return userData !== null;
    } catch (error) {
      console.error('Ошибка при проверке валидности токена:', error);
      return false;
    }
  };

  const getTokenPayload = () => {
    try {
      const token = getToken();
      if (!token) return null;
      
      return validateTokenAndGetUser(token);
    } catch (error) {
      console.error('Ошибка при получении данных из токена:', error);
      return null;
    }
  };

  const getTokenExpiration = () => {
    try {
      const token = getToken();
      if (!token || token === 'guest') return null;
      
      const tokenData = JSON.parse(atob(token.split('.')[1] || ''));
      return tokenData.exp ? new Date(tokenData.exp * 1000) : null;
    } catch (error) {
      console.error('Ошибка при получении срока действия токена:', error);
      return null;
    }
  };

  const isTokenExpired = () => {
    try {
      const expiration = getTokenExpiration();
      if (!expiration) return true;
      
      return expiration < new Date();
    } catch (error) {
      console.error('Ошибка при проверке срока действия токена:', error);
      return true;
    }
  };

  const refreshToken = () => {
    try {
      return refreshUserFromToken();
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
      return { success: false, error: error.message };
    }
  };

  const createToken = (userData) => {
    try {
      return generateToken(userData);
    } catch (error) {
      console.error('Ошибка при создании токена:', error);
      return null;
    }
  };

  return {
    getToken,
    isTokenValid,
    getTokenPayload,
    getTokenExpiration,
    isTokenExpired,
    refreshToken,
    createToken,
    validateCurrentToken
  };
} 