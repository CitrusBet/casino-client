'use client';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import './AuthModal.css';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email
    });

    if (result.success) {
      onClose();
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } else {
      setError(result.error || 'Ошибка регистрации');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>×</button>
        
        <h2 className="auth-modal__title">Регистрация</h2>
        
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
          
          <div className="auth-form__group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-form__input"
            />
          </div>
          
          {error && <div className="auth-form__error">{error}</div>}
          
          <button type="submit" className="auth-form__submit">
            Зарегистрироваться
          </button>
        </form>
        
        <div className="auth-modal__footer">
          <p>Уже есть аккаунт? 
            <button 
              type="button" 
              onClick={onSwitchToLogin}
              className="auth-modal__link"
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 