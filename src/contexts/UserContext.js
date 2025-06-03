'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const setUserAction = (dispatch, userData) => {
  try {
    
  } catch (error) {
    console.error('Ошибка при установке пользователя:', error);
  } finally {
    dispatch({
      type: 'SET_USER',
      payload: {
        ...userData,
        user: userData,
        isAuthenticated: true,
        loading: false
      }
    });
  }
};



const logoutAction = (dispatch) => {
  try {
    
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  } finally {
    dispatch({
      type: 'LOGOUT',
      payload: {
        user: null,
        isAuthenticated: false,
        isGuest: false,
        loading: false
      }
    });
  }
};

const setLoadingAction = (dispatch, loadingState) => {
  try {
    
  } catch (error) {
    console.error('Ошибка при установке состояния загрузки:', error);
  } finally {
    dispatch({
      type: 'SET_LOADING',
      payload: {
        loading: loadingState
      }
    });
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading
      };
    case 'LOGOUT':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: action.payload.loading
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

const validateTokenAndGetUser = (token) => {
  try {
    if (!token || token === 'guest') return null;
    
    const tokenData = JSON.parse(atob(token.split('.')[1] || ''));
    
    if (tokenData.exp && tokenData.exp < Date.now() / 1000) {
      return null;
    }
    
    return {
      id: tokenData.userId || tokenData.id,
      username: tokenData.username,
      email: tokenData.email
    };
  } catch (error) {
    console.error('Ошибка при парсинге токена:', error);
    return null;
  }
};

const generateToken = (userData) => {
  try {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: userData.id,
      username: userData.username,
      email: userData.email,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  } catch (error) {
    console.error('Ошибка при создании токена:', error);
    return null;
  }
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const userData = validateTokenAndGetUser(token);
        if (userData) {
          setUserAction(dispatch, userData);
        } else {
          localStorage.removeItem('authToken');
          setLoadingAction(dispatch, false);
        }
      } catch (error) {
        console.error('Ошибка при валидации токена:', error);
        localStorage.removeItem('authToken');
        setLoadingAction(dispatch, false);
      }
    } else {
      setLoadingAction(dispatch, false);
    }
  }, []);



  const login = async (credentials) => {
    setLoadingAction(dispatch, true);
    
    try {
      const user = {
        id: Date.now(),
        username: credentials.username,
        email: credentials.email
      };
      
      const token = generateToken(user);
      if (!token) {
        throw new Error('Не удалось создать токен авторизации');
      }
      
      localStorage.setItem('authToken', token);
      setUserAction(dispatch, user);
      
      return { success: true, token };
    } catch (error) {
      setLoadingAction(dispatch, false);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    setLoadingAction(dispatch, true);
    
    try {
      const user = {
        id: Date.now(),
        username: userData.username,
        email: userData.email
      };
      
      const token = generateToken(user);
      if (!token) {
        throw new Error('Не удалось создать токен авторизации');
      }
      
      localStorage.setItem('authToken', token);
      setUserAction(dispatch, user);
      
      return { success: true, token };
    } catch (error) {
      setLoadingAction(dispatch, false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Ошибка при очистке localStorage:', error);
    } finally {
      logoutAction(dispatch);
    }
  };

  const getToken = () => {
    try {
      return localStorage.getItem('authToken');
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return null;
    }
  };

  const validateCurrentToken = () => {
    try {
      const token = getToken();
      return token ? validateTokenAndGetUser(token) : null;
    } catch (error) {
      console.error('Ошибка при валидации текущего токена:', error);
      return null;
    }
  };

  const refreshUserFromToken = () => {
    try {
      const userData = validateCurrentToken();
      if (userData) {
        setUserAction(dispatch, userData);
        return { success: true, user: userData };
      } else {
        logout();
        return { success: false, error: 'Токен недействителен' };
      }
    } catch (error) {
      console.error('Ошибка при обновлении пользователя из токена:', error);
      logout();
      return { success: false, error: error.message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    getToken,
    validateCurrentToken,
    refreshUserFromToken,
    actions: {
      setUserAction: (userData) => setUserAction(dispatch, userData),
      logoutAction: () => logoutAction(dispatch),
      setLoadingAction: (loadingState) => setLoadingAction(dispatch, loadingState)
    }
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser должен использоваться внутри UserProvider');
  }
  return context;
}

export function useUserActions() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserActions должен использоваться внутри UserProvider');
  }
  return context.actions;
}

export {
  setUserAction,
  logoutAction,
  setLoadingAction,
  validateTokenAndGetUser,
  generateToken
}; 