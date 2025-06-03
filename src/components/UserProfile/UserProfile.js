'use client';

import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useAuthModal } from '../../hooks/useAuthModal';
import { LoginModal, RegisterModal } from '../Auth';
import './UserProfile.css';

export default function UserProfile() {
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const { profile, isAuthenticated, logout, isLoading } = useUser();
  const {
    isLoginModalOpen,
    isRegisterModalOpen,
    openLoginModal,
    openRegisterModal,
    closeModal,
    switchToRegister,
    switchToLogin
  } = useAuthModal();

  const toggleWalletDropdown = () => {
    setIsWalletDropdownOpen(!isWalletDropdownOpen);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="user-profile">
        <div className="user-profile__loading">Загрузка...</div>
      </div>
    );
  }

  if (isAuthenticated && profile) {
    return (
      <div className="user-profile">
        <div className="user-profile__info" onClick={toggleWalletDropdown}>
          <div className="user-profile__avatar">
            <img style={{height: '100%', width: '100%', borderRadius: '50%'}} src={profile.avatar} alt={profile.username} />
          </div>
          <div className="user-profile__details">
            <span className="user-profile__name">{profile.username}</span>
            {profile.email && (
              <span className="user-profile__email">{profile.email}</span>
            )}
          </div>
          <div className={`user-profile__dropdown-arrow ${isWalletDropdownOpen ? 'open' : ''}`}>
            ▼
          </div>
        </div>

        {isWalletDropdownOpen && (
          <div className="user-profile__wallets-dropdown">
            <div className="wallets-dropdown__header">
              <h3>Wallets</h3>
              <button className="wallets-dropdown__close" onClick={toggleWalletDropdown}>×</button>
            </div>
            <div className="wallets-dropdown__list">
              {profile.wallets.map((wallet, index) => (
                <div key={index} className="wallet-item">
                  <div className="wallet-item__network">
                    <span className={`wallet-item__network-icon ${wallet.network.toLowerCase()}`}>
                      {wallet.network}
                    </span>
                    <span className="wallet-item__network-name">{wallet.network}</span>
                  </div>
                  <div className="wallet-item__address" onClick={() => copyToClipboard(wallet.address)}>
                    <span className="wallet-item__address-text">{wallet.address}</span>
                    <button className="wallet-item__copy-btn" title="Копировать адрес">
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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