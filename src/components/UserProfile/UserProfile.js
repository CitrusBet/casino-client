'use client';

import { useUser } from '../../contexts/UserContext';
import { useAuthModal } from '../../hooks/useAuthModal';
import { LoginModal, RegisterModal } from '../Auth';
import './UserProfile.css';

export default function UserProfile() {
  const { user, isAuthenticated, isGuest, loginAsGuest, logout, loading } = useUser();
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
          </div>
        </div>
        <button onClick={logout} className="user-profile__logout">
          Выйти
        </button>
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="user-profile">
        <div className="user-profile__guest">
          <span className="user-profile__guest-label">Гость</span>
          <div className="user-profile__guest-actions">
            <button onClick={openLoginModal} className="user-profile__btn user-profile__btn--login">
              Войти
            </button>
            <button onClick={openRegisterModal} className="user-profile__btn user-profile__btn--register">
              Регистрация
            </button>
          </div>
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

  return (
    <div className="user-profile">
      <div className="user-profile__actions">
        <button onClick={loginAsGuest} className="user-profile__btn user-profile__btn--guest">
          Играть как гость
        </button>
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