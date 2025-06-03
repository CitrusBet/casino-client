'use client';

import { useReducer } from 'react';
import { 
  setUserAction, 
  logoutAction, 
  setLoadingAction,
  useUserActions 
} from '../contexts/UserContext';
import { useUserHelpers } from '../hooks/useUserHelpers';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

const exampleReducer = (state, action) => {
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

export default function ExampleUserActions() {
  const [state, dispatch] = useReducer(exampleReducer, initialState);
  const actions = useUserActions();
  const helpers = useUserHelpers(dispatch);

  const handleDirectImport = () => {
    try {
      setUserAction(dispatch, {
        id: 1,
        username: 'Тестовый пользователь',
        email: 'test@example.com'
      });
    } catch (error) {
      console.error('Ошибка при использовании прямого импорта:', error);
    } finally {
      console.log('Действие завершено через прямой импорт');
    }
  };

  const handleContextActions = () => {
    try {
      actions.setUserAction({
        id: 2,
        username: 'Пользователь из контекста',
        email: 'context@example.com'
      });
    } catch (error) {
      console.error('Ошибка при использовании действий из контекста:', error);
    } finally {
      console.log('Действие завершено через контекст');
    }
  };

  const handleHelperFunctions = () => {
    try {
      helpers.handleSetUser({
        id: 3,
        username: 'Пользователь через хелпер',
        email: 'helper@example.com'
      });
    } catch (error) {
      console.error('Ошибка при использовании хелпер функций:', error);
    } finally {
      console.log('Действие завершено через хелпер');
    }
  };

  return (
    <div style={{ padding: '1rem', background: '#f0f0f0', margin: '1rem' }}>
      <h3>Пример использования функций действий</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <h4>Текущее состояние:</h4>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={handleDirectImport}>
          Прямой импорт функции
        </button>
        
        <button onClick={handleContextActions}>
          Через действия контекста
        </button>
        
        <button onClick={handleHelperFunctions}>
          Через хелпер функции
        </button>
        

        
        <button onClick={() => helpers.handleLogout()}>
          Выйти
        </button>
        
        <button onClick={() => helpers.handleSetLoading(true)}>
          Включить загрузку
        </button>
        
        <button onClick={() => helpers.handleSetLoading(false)}>
          Выключить загрузку
        </button>
      </div>
    </div>
  );
} 