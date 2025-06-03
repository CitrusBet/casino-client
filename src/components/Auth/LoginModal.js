'use client';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import './AuthModal.css';

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      onClose();
      setFormData({ email: '', password: '' });
    } catch (err) {
      setError(err.message || 'Ошибка авторизации');
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          
          <button 
            type="submit" 
            className="auth-form__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
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