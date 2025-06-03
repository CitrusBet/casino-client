'use client';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import './AuthModal.css';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    const result = await login({
      username: formData.username,
      email: `${formData.username}@example.com`
    });

    if (result.success) {
      onClose();
      setFormData({ username: '', password: '' });
    } else {
      setError(result.error || 'Ошибка авторизации');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>×</button>
        
        <h2 className="auth-modal__title">Вход</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__group">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              className="auth-form__input"
            />
          </div>
          
          <div className="auth-form__group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              className="auth-form__input"
            />
          </div>
          
          {error && <div className="auth-form__error">{error}</div>}
          
          <button type="submit" className="auth-form__submit">
            Войти
          </button>
        </form>
        
        <div className="auth-modal__footer">
          <p>Нет аккаунта? 
            <button 
              type="button" 
              onClick={onSwitchToRegister}
              className="auth-modal__link"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 