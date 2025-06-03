'use client';

import { 
  setUserAction, 
  logoutAction, 
  setLoadingAction 
} from '../contexts/UserContext';

export function useUserHelpers(dispatch) {
  const handleSetUser = (userData) => {
    try {
      setUserAction(dispatch, userData);
    } catch (error) {
      console.error('Ошибка в handleSetUser:', error);
    }
  };



  const handleLogout = () => {
    try {
      logoutAction(dispatch);
    } catch (error) {
      console.error('Ошибка в handleLogout:', error);
    }
  };

  const handleSetLoading = (loadingState) => {
    try {
      setLoadingAction(dispatch, loadingState);
    } catch (error) {
      console.error('Ошибка в handleSetLoading:', error);
    }
  };

  return {
    handleSetUser,
    handleLogout,
    handleSetLoading
  };
} 