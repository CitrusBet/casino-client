'use client';

import { useToken } from '../hooks/useToken';
import { useUser } from '../contexts/UserContext';

export default function TokenExample() {
  const { user, isAuthenticated } = useUser();
  const {
    getToken,
    isTokenValid,
    getTokenPayload,
    getTokenExpiration,
    isTokenExpired,
    refreshToken,
    createToken
  } = useToken();

  const handleCreateTestToken = () => {
    try {
      const testUser = {
        id: 999,
        username: 'TestUser',
        email: 'test@example.com'
      };
      
      const token = createToken(testUser);
      console.log('Создан токен:', token);
      
      const payload = getTokenPayload();
      console.log('Данные из токена:', payload);
    } catch (error) {
      console.error('Ошибка при создании тестового токена:', error);
    }
  };

  const handleRefreshToken = () => {
    try {
      const result = refreshToken();
      console.log('Результат обновления токена:', result);
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
    }
  };

  const currentToken = getToken();
  const tokenPayload = getTokenPayload();
  const tokenExpiration = getTokenExpiration();
  const tokenValid = isTokenValid();
  const tokenExpired = isTokenExpired();

  return (
    <div style={{ 
      padding: '1rem', 
      background: 'rgba(255, 255, 255, 0.1)', 
      margin: '1rem',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <h3>Информация о токене</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <h4>Состояние авторизации:</h4>
        <p>Авторизован: {isAuthenticated ? 'Да' : 'Нет'}</p>
        {user && (
          <p>Пользователь: {user.username} ({user.email})</p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4>Данные токена:</h4>
        <p>Токен существует: {currentToken ? 'Да' : 'Нет'}</p>
        <p>Токен валидный: {tokenValid ? 'Да' : 'Нет'}</p>
        <p>Токен истёк: {tokenExpired ? 'Да' : 'Нет'}</p>
        
        {tokenExpiration && (
          <p>Срок действия: {tokenExpiration.toLocaleString()}</p>
        )}
        
        {tokenPayload && (
          <div>
            <p>Данные из токена:</p>
            <pre style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {JSON.stringify(tokenPayload, null, 2)}
            </pre>
          </div>
        )}
        
        {currentToken && (
          <div>
            <p>Токен (первые 50 символов):</p>
            <p style={{ 
              background: 'rgba(0, 0, 0, 0.3)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              fontSize: '0.8rem',
              wordBreak: 'break-all'
            }}>
              {currentToken.substring(0, 50)}...
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={handleCreateTestToken}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(79, 70, 229, 0.8)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Создать тестовый токен
        </button>
        
        <button 
          onClick={handleRefreshToken}
          disabled={!currentToken}
          style={{
            padding: '0.5rem 1rem',
            background: currentToken ? 'rgba(16, 185, 129, 0.8)' : 'rgba(156, 163, 175, 0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentToken ? 'pointer' : 'not-allowed'
          }}
        >
          Обновить токен
        </button>
        
        <button 
          onClick={() => console.log('Полный токен:', currentToken)}
          disabled={!currentToken}
          style={{
            padding: '0.5rem 1rem',
            background: currentToken ? 'rgba(245, 158, 11, 0.8)' : 'rgba(156, 163, 175, 0.5)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentToken ? 'pointer' : 'not-allowed'
          }}
        >
          Показать полный токен в консоли
        </button>
      </div>
    </div>
  );
} 