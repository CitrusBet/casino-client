'use client';

import { useUser } from '../../contexts/UserContext';
import './HeroSection.css';

const HeroSection = () => {
  const { user, isAuthenticated, isGuest } = useUser();

  const getGreeting = () => {
    if (isAuthenticated && user) {
      return `Добро пожаловать, ${user.username}!`;
    } else if (isGuest) {
      return 'Добро пожаловать, Гость!';
    }
    return 'Присоединяйтесь к нашему казино!';
  };

  return (
    <div className="main__text">
      <h4 className="pre__title">{getGreeting()}</h4>
      <div className="title-block">
        <h1 className="title__main">Лучшие игры казино</h1>
        <p className="title__description">
          <span className="title_text_color">уже ждут</span> вас для большого выигрыша
        </p>
      </div>
      <div className="main__button">
        <button>Случайная игра 🎰</button>
        <a href="#">Подробнее 🃏</a>
      </div>
    </div>
  );
};

export default HeroSection; 