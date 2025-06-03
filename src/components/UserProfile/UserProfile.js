'use client';

import { useUser } from '../../contexts/UserContext';
import { useAuthModal } from '../../hooks/useAuthModal';
import { useToken } from '../../hooks/useToken';
import { LoginModal, RegisterModal } from '../Auth';
import './UserProfile.css';

export default function UserProfile() {
  const { user, isAuthenticated, logout, loading } = useUser();
  const { isTokenValid, getTokenExpiration, isTokenExpired } = useToken();
  const {
    isLoginModalOpen,
    isRegisterModalOpen,
    openLoginModal,
    openRegisterModal,
    closeModal,
    switchToRegister,
    switchToLogin
  } = useAuthModal();

  if (loading) {
    return (
      <div className="user-profile">
        <div className="user-profile__loading">Загрузка...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    const tokenExpiration = getTokenExpiration();
    const expired = isTokenExpired();
    
    return (
      <div className="user-profile">
        <div className="user-profile__info">
          <div className="user-profile__avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-profile__details">
            <span className="user-profile__name">{user.username}</span>
            {user.email && (
              <span className="user-profile__email">{user.email}</span>
            )}
            {tokenExpiration && (
              <span className={`user-profile__token-status ${expired ? 'expired' : 'valid'}`}>
                Токен: {expired ? 'истёк' : 'действителен до ' + tokenExpiration.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <button onClick={logout} className="user-profile__logout">
          Выйти
        </button>
      </div>
    );
  }



  return (
    <div className="user-profile">
      <div className="user-profile__actions">
        <button onClick={openLoginModal} className="user-profile__btn user-profile__btn--login">
          Войти
        </button>
        <button onClick={openRegisterModal} className="user-profile__btn user-profile__btn--register">
          Регистрация
        </button>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeModal}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={closeModal}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
} 