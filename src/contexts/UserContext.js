'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_GUEST: 'SET_GUEST',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING'
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isGuest: false,
        loading: false
      };
    case USER_ACTIONS.SET_GUEST:
      return {
        ...state,
        user: { 
          id: 'guest',
          username: 'Гость',
          isGuest: true 
        },
        isAuthenticated: false,
        isGuest: true,
        loading: false
      };
    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isGuest: false,
        loading: false
      };
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isGuest: false,
  loading: true
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const isGuestMode = localStorage.getItem('isGuest');
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: USER_ACTIONS.SET_USER, payload: user });
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
      }
    } else if (isGuestMode === 'true') {
      dispatch({ type: USER_ACTIONS.SET_GUEST });
    } else {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const loginAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    dispatch({ type: USER_ACTIONS.SET_GUEST });
  };

  const login = async (credentials) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const user = {
        id: Date.now(),
        username: credentials.username,
        email: credentials.email,
        isGuest: false
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('isGuest');
      dispatch({ type: USER_ACTIONS.SET_USER, payload: user });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const user = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        isGuest: false
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('isGuest');
      dispatch({ type: USER_ACTIONS.SET_USER, payload: user });
      
      return { success: true };
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    dispatch({ type: USER_ACTIONS.LOGOUT });
  };

  const value = {
    ...state,
    loginAsGuest,
    login,
    register,
    logout
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